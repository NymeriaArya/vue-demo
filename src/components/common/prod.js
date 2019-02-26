let ProdTools={};
let store=window.localStorage;

let prods=JSON.parse(store.getItem('prods')||'{}');//没有数据就是空对象
//增加或追加
ProdTools.addOrUpdate=function(p){
	//判断是否存在
	//1.存在，就追加
	//2.不存在，就新建
	if(prods[p.id]){
		prods[p.id]+=p.num;
	}else{
		prods[p.id]=p.num;
	}
	
	this.save(prods);
}

//删除
ProdTools.delete=function(id){
	delete prods[id];
	this.save(prods);
}

//获取
ProdTools.getProds=function(){
	return JSON.parse(store.getItem('prods')||'{}');
}

//存储
ProdTools.save=function(prods){
	store.setItem('prods',JSON.stringify(prods))
}

//获取总数
ProdTools.getTotalCount=function(){
	let sum=0;
	for(let id in prods){
		sum +=prods[id];
	}
	return sum;
}

export default ProdTools;