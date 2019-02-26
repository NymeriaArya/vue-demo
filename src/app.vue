<template>
	<div>
		<!-- 头部固定内容 -->
		<mt-header title="信息管理系统"></mt-header>
		<transition name="router" model="out-in">
			<router-view></router-view>
		</transition>
		
		<!-- 底部固定内容 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link id="defaultTab" class="mui-tab-item" :to="{name:'home'}">
				<span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'menber'}">
				<span class="mui-icon icon-huiyuan1"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'shopcart'}">
				<span class="mui-icon icon-gouwuche"><span class="mui-badge">{{pickNum}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'search'}">
				<span class="mui-icon icon-chazhao"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	import connect from './components/common/connect.js';
	import prodTools from './components/common/prod.js';
	export default {
		data() {
			return {
				pickNum:prodTools.getTotalCount(),
			};
		},
		created(){
			//这里的this在vuecomponent里
// 			connect.$on('addshopcart',function(num){
// 				// 这里的this是component
// 				this.pickNum=this.pickNum+num;
// 			})

			// 用箭头函数解决
			connect.$on('addshopcart',num=>{
				this.pickNum=this.pickNum+num;
			})
		}
	}
</script>

<style scoped>
.router-enter-active,.router-leave-active{
	transition: opacity .5s;
}
.router-enter,.router-leave-to{
	opacity: 0;
}
</style>
