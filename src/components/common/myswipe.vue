<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="(img,index) in imgs" :key="index">
				<a :href="img.url"><img :src="img.img" alt=""></a>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgs:[],
			};
		},
		props:['url'],
		created(){
			this.$axios.get(this.url)
			.then(res=>{
				this.imgs=res.data;
			})
			.catch(err=>{
				console.log(err);
			})
		}
	}
</script>

<style scoped>
	/* 轮播图样式 */
.mint-swipe{
	height:220px;
}
.mint-swipe img{
	height:100%;
}
</style>
