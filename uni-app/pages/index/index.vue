<template>
	<view class="content">
		<!-- Search -->
		<view class="search">
			<input class="btn-search" type="text" placeholder="搜索" @click="get">
		</view>
		<!-- Search -->

		<!-- Swiper -->
		<view class="swiper">
			<swiper :swiperimg="swiperimg"></swiper>
		</view>
		<!-- Swiper -->

		<!-- Main -->
		<view class="main">
			<movie :movielist="data" :movietitle="title1"></movie>
		</view>
		<!-- Main -->
		
		<!-- Main -->
		<view class="main">
			<movie :movielist="data2" :movietitle="title2"></movie>
		</view>
		<!-- Main -->
	</view>
</template>

<script>
	import movie from '../../components/chy-com/movie.vue'
	import swiper from "../../components/chy-com/swiper.vue"
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return{
				data:"",
				data2:"",
				title1:"院线大片",
				title2:"好剧预告",
				swiperimg:[
					{title:"photo1",src:this.$store.state.demolist[0].images.small},
					{title:"photo2",src:this.$store.state.demolist[1].images.small},
					{title:"photo3",src:this.$store.state.demolist[2].images.small},
					{title:"photo4",src:this.$store.state.demolist[3].images.small},
				],
				// movielist:[
				// 	{title:"movie1",src:"../../static/index.jpeg",name:"V字仇杀队1",star:"3",score:"7.6"},
				// 	{title:"movie2",src:"../../static/index.jpeg",name:"V字仇杀队2",star:"4",score:"7.6"},
				// 	{title:"movie3",src:"../../static/index.jpeg",name:"V字仇杀队3",star:"3",score:"7.6"},
				// 	{title:"movie4",src:"../../static/index.jpeg",name:"V字仇杀队4",star:"5",score:"7.6"},
				// 	{title:"movie5",src:"../../static/index.jpeg",name:"V字仇杀队5",star:"1",score:"7.6"},
				// ],
			}
		},
		onLoad() {
			if(!this.$store.state.demolist2){
				alert("等一下等一下！");
			}
			this.data = this.$store.state.demolist;
			this.data2 = this.$store.state.demolist2;
		},
		methods: {
			get(){
				console.log(this.data)
				console.log(this.data2) 
			}
		},
		components: {
			uniRate,
			swiper,
			movie,
		}
	}
</script>

<style>
	/* 全局样式控制 */
	*{
		padding: 0;
		margin: 0;
	}
	.content{
		width: 90%;
		margin: 0 auto;
	}
	/* 全局样式控制 */
	
	
	
	
	/* 搜索框部分 */
	.search{
		position: relative;
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.btn-search{
		position: absolute;
		width: 100%;
		border: #007AFF 1px solid;
		border-radius: 4px;
		font-size: 12px;
	}
	/* 搜索框部分 */
	
	
	
	
	/* 轮播图部分 */
	.swiper{
		position: relative;
		width: 100%;
		height: 200px;
		margin-bottom: 30px;
	}
	/* 轮播图部分 */
	
	
	
	
	
	/* 主体内容部分 */
	.main{
		position: relative;
		width: 100%;
	}
	/* 主体内容部分 */
</style>
