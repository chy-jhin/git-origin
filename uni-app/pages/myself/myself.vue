<template>
	<view class="content">
		<swiper></swiper>
		<movie></movie>
	</view>
</template>

<script>
	import movie from '../../components/chy-com/movie.vue'
	import swiper from "../../components/chy-com/swiper.vue"
	export default {
		data(){
			return {
			}
		},
		components:{
			movie,
			swiper
		}
	}
</script>

<style>

</style>
