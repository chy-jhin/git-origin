<template>
	<view>
		<scroll-view :scroll-y="true" class="scroll-view">
			<view class="box" v-for="(item,index) in morelist" :key="index">
				<view class="content">
					<view class="left" @click="details(index)">
						<image :src="item.images.large"></image>
					</view>
					<view class="right" @click="details(index)">
						<span>{{item.title}}</span>
						<span><span v-for="(value,key) in item.genres" :key="key">{{value}}</span></span>
						<span>国漫之光,大圣脚踏祥云,披荆斩棘归来</span>
						<span class="score">{{item.rating.average}}</span>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.title = option.title;
			if(option.title =="好剧预告"){
				this.morelist = this.$store.state.demolist2;
			}
			else{
				this.morelist = this.$store.state.demolist;
			}
		},
		data() {
			return {
				morelist:"",
				title:"",
			}
		},
		methods: {
			details(index){
				uni.navigateTo({
					url:"../../pages/details/details"+"?id="+index+"&name="+this.title,
				})
			}
		}
	}
</script>

<style>
	.scroll-view{
		width: 100%;
		height: 800px;
		margin: 0 auto;
	}
	.scroll-view .box{
		position: relative;
		width: 100%;
		height: 160px;
		border-bottom: 1px solid gray;
	}
	.scroll-view .content{
		position: absolute;
		width: 100%;
		height: 120px;
		top: 20px;
		left: 20px;
		margin: 0px 0 10px;
	}
	.scroll-view .content .left{
		position: absolute;
		height: 100%;
		width: 20%;
	}
	.scroll-view .content .left image{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.scroll-view .content .right{
		position: absolute;
		width: 60%;
		height: 100%;
		left: 30%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.scroll-view .content .right span{
		margin-top: 10px;
	}
	.scroll-view .content .right .score{
		position: absolute;
		top: 0%;
		right: 10%;
		background-color: yellowgreen;
		border-radius: 10px;
		color: white;
		font-size: 12px;
		width: 25px;
		height: 15px;
		text-align: center;
;
	}
</style>
