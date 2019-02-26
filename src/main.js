import Vue from 'vue';
//路由
import VueRouter from 'vue-router';

//mint-ui  mui
// import MintUI from 'mint-ui';
import './static/vendor/mint-ui/lib/style.css';
import './static/vendor/mui-master/dist/css/mui.css';
import './static/css/global.css';

//axios
import Axios from 'axios';
//moment
import Moment from 'moment';
//vue-preview
import vuePreview from 'vue-preview';

//安装路由
Vue.use(VueRouter);
//安装mint-ui
// Vue.use(MintUI);
//安装axios
Vue.prototype.$axios=Axios;
Axios.defaults.baseURL='http://127.0.0.1:4848/api/';
//安装vue-preview
Vue.use(vuePreview,{
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
});

//AXIOS:拦截器操作loading
Axios.interceptors.request.use(function(config){
	//显示图标
	Indicator.open({
		text: "加载中",
		spinnerType: 'fading-circle'
	});
	return config;
});
Axios.interceptors.response.use(function(config){
	 
	Indicator.close();
	//获取到config中data，进行加工
	return config;
});
//引入全局组件
import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
import Myswipe from './components/common/myswipe.vue';
//时间格式化  全局过滤器
Vue.filter('convertDate',function(value){
	return Moment(value).format('YYYY-MM-DD');
})
//全局title组件
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);
Vue.component('mySwipe',Myswipe);

// mint-ui 按需引入 开始
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// mint-ui 按需引入 结束

//自己的vue文件==========================
import App from './app.vue';
import HomePage from './components/home/home.vue';
import MenberPage from './components/menber/menber.vue';
import ShopcartPage from './components/shopcart/shopcart.vue';
import SearchPage from './components/search/search.vue';
import NewsListPage from './components/news/newslist.vue';
import NewsDetailPage from './components/news/newsdetail.vue';
import PhotoSharePage from './components/photo/photoShare.vue';
import PhotoDetailPage from './components/photo/photodetail.vue';
import GoodsListPage from './components/goods/goodslist.vue';
import GoodsDetailPage from './components/goods/goodsdetail.vue';
import GoodsCommentPage from './components/goods/goodscomment.vue';

//创建路由规则
let router = new VueRouter({
	routes: [
		{path: '/', redirect: {name:'home'}},
		{name: 'home', path: '/home', component: HomePage},
		{name: 'menber', path: '/menber', component: MenberPage},
		{name: 'shopcart', path: '/shopcart', component: ShopcartPage},
		{name: 'search', path: '/search', component: SearchPage},
		{name: 'news.list', path: '/news/list', component: NewsListPage},
		{name: 'news.detail', path: '/news/detail', component: NewsDetailPage},
		{name: 'photo.share', path: '/photo/share', component: PhotoSharePage},
		{name: 'photo.detail', path: '/photo/detail/:id', component: PhotoDetailPage},
		{name: 'goods.list', path: '/goods/list/', component: GoodsListPage},
		{name: 'goods.detail', path: '/goods/detail/', component: GoodsDetailPage},
		{name: 'goods.comment', path: '/goods/comment/', component: GoodsCommentPage},
		{name: 'goods.picInfo', path: '/goods/picInfo/', component: NewsDetailPage},
	],
	linkActiveClass:'mui-active',
})

new Vue({
	el:"#app",
	router: router,
	render: function(create){
		return create(App);
	}
})