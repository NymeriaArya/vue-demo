<template>
	<div class="tmpl">
		<!--  组件名navBar -->
		<nav-bar title="图片详情"></nav-bar>
		<!-- 组件名:navbar -->
		<!--  使用：navbar-->
		<div class="photo-title">
			<p v-text="imgInfo.title"></p>
			<span>发起日期：{{imgInfo.add_time | convertDate}}</span>
			<span>{{imgInfo.click}}次浏览</span>
			<span>分类：民生经济</span>
		</div>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<!-- <img :src="img.src"> -->
				<!-- <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)"> -->
				<vue-preview :slides="imgs" @close="handleClose" ></vue-preview>
			</li>
		</ul>
		<div class="photo-desc">
			<p v-html="imgInfo.content"></p>
		</div>
		<!-- 评论内容开始 -->
		

		<!-- 评论内容结束 -->

		<!-- 使用评论子组件 -->
		<comment></comment>
	</div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[],//存放缩率图
                imgInfo:{},//详情数据对象
                pid:this.$route.params.id, //记录当前图片id
            }
        },
        created(){
            //1:获取路由参数
            let pid = this.$route.params.id;
            //2:发起请求2个
            //图片详情
            this.$axios.get('getimageinfo?id='+pid)//这里要加id
                .then(res=>{
                    //一个id对应一个详情对象
                    this.imgInfo = res.data[0];
                })
                .catch(err=>{
                    console.log(err)
                }),
			this.$axios.get('getthumimages?id='+pid)
				.then(res=>{
					this.imgs=res.data[0].img_url;
					this.imgs.forEach(function(img,index){
						img.w=400;
						img.h=260; //缩略图的宽高
						img.msrc=img.src;
					})
				},err=>{
					console.log(err);
				})
		},
		methods:{
			handleClose () {
				console.log('close event')
			},
			
			
	},
}

</script>
<style scoped>
	li {
		list-style: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	.photo-title {
		overflow: hidden;
	}

	.photo-title,
	.photo-desc {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding-bottom: 5px;
		margin-bottom: 5px;
		padding-left: 5px;
	}

	.photo-title p {
		color: #13c2f7;
		font-size: 20px;
		font-weight: bold;
	}

	.photo-title span {
		margin-right: 20px;
	}

	.mui-table-view.mui-grid-view.mui-grid-9 {
		background-color: white;
		border: 0;
	}

	.photo-desc p {
		font-size: 18px;
	}

	.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
		padding: 2px 2px;
		width: 100%;
	}
	
	.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 figure{
		height: 100px;
	}
	.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 figure img{
		height: 100px !important;
	}


	/*评论样式 开始*/
	

	/*评论样式 结束*/


</style>
