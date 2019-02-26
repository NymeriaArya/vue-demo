<template>
	<div class="tmpl">
		<nav-bar title="新闻详情"></nav-bar>
		<div class="news-title">
			<p v-text="newsDetail.title"></p>
			<div>
				<span>{{newsDetail.click}}次点击</span>
				<span>分类:民生经济</span>
				<span>添加时间:{{newsDetail.add_time|convertDate}}</span>
			</div>
		</div>
		<div class="news-content" v-html="newsDetail.content"></div>
	</div>
</template>
<script>
	export default {
	    data(){
          return{
				newsDetail:{},
			}
		},
		created(){
			let id=this.$route.query.id;
			this.$axios.get('getnewsdetail?id='+id)
			.then(res=>{
				this.newsDetail=res.data[0];
			},err=>{
				console.log(err)
			})
		},
	}
</script>
<style scoped>
	.news-title p {
		color: #0a87f8;
		font-size: 20px;
		font-weight: bold;
	}

	.news-title span {
		margin-right: 30px;
	}

	.news-title {
		margin-top: 5px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}


	/*主体文章的左右距离*/

	.news-content {
		padding: 10px 5px;
	}
</style>
