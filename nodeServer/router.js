let express=require('express');
let vueMysql=require('./mysql.js');

let router=express.Router();

//获取轮播图
router.get('/api/getlunbo',function(req,res){
	vueMysql.query("select * from lunbo",function(data){
		res.json(data);
	})
})


//获取新闻列表
router.get('/api/getnewslist',function(req,res){
	vueMysql.query("select * from news",function(data){
		res.json(data);
	})
})

//获取新闻详情
router.get('/api/getnewsdetail',function(req,res){
	let id=req.query.id;
	// console.log(id);
	vueMysql.query("select * from news where id = "+id+" limit 1",function(data){
		res.json(data);
	})
})

//获取图文分享的分类信息
router.get('/api/getimgcategory',function(req,res){
	vueMysql.query('select * from pscategory',function(data){
		res.json(data);
	})
})

//获取图文分享内容，带ID参数
router.get('/api/getimages',function(req,res){
	let id=req.query.id;
	// console.log(id);
	if(id===0){
		vueMysql.query("select * from pscontent",function(data){
			res.json(data);
		})
	}else{
		vueMysql.query("select * from pscontent where category_id = "+id, function(data){
			res.json(data);
		})
	}
})

//获取图片合集，根据ID
router.get('/api/getthumimages',function(req,res){
	let id=req.query.id;
	vueMysql.query("select img_url from imginfo where id="+id,function(data){
		// console.log(data);
		let imgArray=data[0].img_url.split('|');
		data[0].img_url=new Array();
		imgArray.forEach(function(item,index){
			data[0].img_url.push({
				src:item
			})
		});
		// console.log(data);
		res.json(data);
	})
})

//获取图片详情
router.get('/api/getimageinfo',function(req,res){
	let id=req.query.id;
	// console.log(id);
	vueMysql.query("select id,title,add_time,content,click from pscontent where id="+id + " limit 1",function(data){
		// console.log(data);
		
		res.json(data);
	})
})

//获取评论
router.get('/api/getcomments/',function(req,res){
	let pageindex=req.query.pageindex;
	let pagesize=10;
	vueMysql.query("select * from ( select * from comments order by id DESC) comments limit " + (pageindex-1)*pagesize + ","+ pagesize,function(data){
		res.json(data);
	})
})

//发表评论
router.post('/api/postcomment/',function(req,res){
	
	let content=req.body.content;
	console.log(content)
	vueMysql.query("insert into comments values (null,'娜梅莉亚', CURRENT_TIMESTAMP(), '"+content+"')",function(data){
		res.json({
			message:"评论提交成功"
		});
	})
});

//获取商品信息
router.get('/api/getgoods',function(req,res){
	let pageindex=req.query.pageindex;
	let pagesize=6;
	vueMysql.query("select * from  goods limit " + (pageindex-1)*pagesize + ","+ pagesize,function(data){
		res.json(data);
	})
})

//获取商品图片
router.get('/api/getgoodsimages',function(req,res){
	let id=req.query.id;
	// console.log(id);
	vueMysql.query("select img from  goods where id = "+id+" limit 1",function(data){
		res.json(data);
	})
})

router.get('/api/getinfo',function(req,res){
	let id=req.query.id
	vueMysql.query("select * from  goods where id="+id+" limit 1",function(data){
		res.json(data);
	})
})

router.get('/api/goods/getshopcartlist',function(req,res){
	let id=req.query.id;
	vueMysql.query("select * from  goods where id in ("+id+")",function(data){
		res.json(data);
	})
})

module.exports=router;