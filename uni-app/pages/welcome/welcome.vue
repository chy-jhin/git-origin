<template>
	<view class="welcome">
		<swiper :indicator-dots="true" indicator-active-color="#147ECB" :autoplay="false" :duration="1500">
			<swiper-item >
				<image src="http://pic1.win4000.com/mobile/2019-12-23/5e001b5b04995.jpg"></image>
			</swiper-item>
			<swiper-item >
				<image  src="http://pic1.win4000.com/mobile/2019-12-23/5e001b5b04995.jpg"></image>
				<button id="go" @click="go">立即体验</button>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.request({
				url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data: {
					name:"name1"
				},
				success: res => {
					this.movielist = res.data.subjects;
					console.log(res);
				},
				fail: Error => {
					alert("Error!")
				},
			});
			uni.request({
				url: 'https://douban-api.uieee.com/v2/movie/coming_soon',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data: {
					name:"name2"
				},
				success: res => {
					this.movielist2 = res.data.subjects;
					console.log(res);
					this.flag="true"
				},
				fail: Error => {
					alert("Error!")
				},
			});
			this.$store.state.demolist = this.movielist;
			this.$store.state.demolist2 = this.movielist2;
		},
		data() {
			return {
				movielist:"",
				movielist2:"",
				flag:"false",
			}
		},
		methods: {
			go(){
				setTimeout(() => {
					this.$store.state.demolist = this.movielist;
					this.$store.state.demolist2 = this.movielist2;
					uni.switchTab({
						url:"../index/index"
					})
				},1000)
			}
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	.welcome{
		width: 100%;
		height: 790px;
	}
	.welcome swiper{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.welcome swiper image{
		width: 100%;
		height: 100%;
	}
	#go{
		z-index: 99;
		position: absolute;
		width: 150px;
		height: 50px;
		top: 80%;
		left: 30%;
		border-radius: 10px;
		font-size: 20px;
		opacity: 0.6;
		transition: all 0.3s;
	}
</style>
