<template>
	<view class="main">
		<view class="top">
			<span class="left">{{movietitle}}</span><span class="right" @click="more(movietitle)">想要更多></span>
		</view>
		<view class="bottom">
			<scroll-view 
			:scroll-x="true"
			style="white-space: nowrap;"
			scroll-left="120"
			>
				<view class="body" v-for="(item,index) in movielist" :key="index" @click="detail(index,movietitle)">
					<view class="img">
						<image :src="item.images.large" mode="aspectFill"></image>
					</view>
					<view class="name">{{item.title}}</view>
					<view v-show="(item.rating.average)" >
						<uni-rate class="star" :value="item.rating.average/2" size="12" disabled="true"></uni-rate>
						<span style="font-size: 12px;">{{item.rating.average}}</span>
					</view>
					<span v-show="(!item.rating.average)" style="font-size: 12px;">尚未上映</span>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			
		},
		props:["movielist","movietitle"],
		components:{
			uniRate,
		},
		methods:{
			detail(index,movietitle){
				uni.navigateTo({
					url:"../../pages/details/details"+"?id="+index+"&name="+movietitle,
				});
			},
			more(movietitle){
				uni.navigateTo({
					url:"../../pages/more/more"+"?title="+movietitle,
				});
			}
		}
	}
</script>

<style>
	/* 主体内容部分 */
/* 	.main{
		position: relative;
		width: 100%;
		height: 300px;
		border: 1px solid red;
	} */
	.main .top{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.main .top .left{
		font-weight: 800;
	}
	.main .top .right{
		color: #007AFF;
	}
	.main scroll-view .body{
		position: relative;
		display: inline-block;
		width: 100px;
		height: 200px;
		margin-right: 5%;
	}
	.main scroll-view .body .img{
		position: absolute;
		top: 0%;
		width: 100%;
		height: 70%;
	}
	.main scroll-view .body .img image{
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	.main scroll-view .body .name{
		position: absolute;
		top: 75%;
		width: 100%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.main scroll-view .body .star{
		position: absolute;
		left: 5%;
		bottom: 12px;
	}
	.main scroll-view .body span{
		position: absolute;
		height: 20px;
		bottom: 5px;
		right: 10px;
	}
	/* 主体内容部分 */
</style>
