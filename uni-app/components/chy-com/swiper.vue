<template>
	<view class="swiper">
		<swiper :indicator-dots="true" indicator-active-color="#147ECB" :autoplay="true" :interval="4000" :duration="1500">
			<swiper-item v-for="(item,index) in swiperimg" :key="index" @click="detail(index)">
				<image :src="item.src" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:["swiperimg"],
		methods:{
			detail(index){
				uni.navigateTo({
					url:"../../pages/details/details"+"?id="+index,
				});
			}
		}
	}
</script>

<style>
	/* 轮播图部分 */
/* 	.swiper{
		position: relative;
		width: 100%;
		height: 200px;
		margin-bottom: 30px;
	} */
	.swiper swiper{
		width: 100%;
		height: 100%;
		border-radius: 4px;
		overflow: hidden;
	}
	.swiper swiper-item image{
		width: 100%;
		height: 100%;
	}
	/* 轮播图部分 */
</style>
