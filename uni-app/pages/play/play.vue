<template>
	<view class="content">
		<button @click="getdatas">get</button>
		<view>
			图片：{{movielist[0].images.large}}
			上映日期：{{movielist[0].pubdates[1]}}
			电影名字：{{movielist[0].title}}
			年份：{{movielist[0].year}}
			评分：{{movielist[0].rating.average}}
			电影时长：{{movielist[0].durations[0]}}
			电影类型：{{movielist[0].genres[0]}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movielist:"",
				movielist2:"",
			};
		},
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
					console.log(res)
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
					
				},
			});
			this.$store.state.demolist = this.movielist;
			this.$store.state.demolist2 = this.movielist2;
		},
		methods:{
			getdatas(){
				setTimeout(() => {
					this.$store.state.demolist = this.movielist;
					this.$store.state.demolist2 = this.movielist2;
					uni.switchTab({
						url:"../index/index"
					})
				},2000)
			},

			getdatas3(){
				uni.request({
					url: 'https://douban-api.uieee.com/v2/movie/new_movies',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data: {
						name:"name3"
					},
					success: res => {
						console.log(res)
					},
				});
			},
			
		},
			
	}
</script>

<style>
	
</style>
