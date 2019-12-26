<template>
	<view class="details">
		<view class="bgimg">
			<image :src="detailslist2[movieId].images.large"></image>
		</view>
		<view class="bgop">
			
		</view>
		<view class="main">
			<view class="mainimg">
				<image :src="detailslist2[movieId].images.large"></image>
			</view>
			<view class="maininfo">
				<view class="info">
					<span class="title">{{detailslist2[movieId].title}}（{{detailslist2[movieId].year}}）</span>
					<span class="city">上映时间：<span>{{detailslist2[movieId].pubdates[0]}}</span></span>
					<span class="type">类型：<span v-for="(value,key) in detailslist2[movieId].genres" :key="key">{{value}}</span></span>
					<span class="time">总片长：<span>{{detailslist2[movieId].durations[0]}}</span></span>
					</view>
					<view class="info-more">
						<p>简介：</p>
						<view id="info-text" style="text-indent: 2em;">
							{{detailslist[0].text}}
						</view>
					</view>
					<view class="person">
						<p>导演：</p>
						<view class="person-main">
							<scroll-view
							:scroll-x="true"
							style="white-space: nowrap;"
							scroll-left="120"
							>
								<view class="body">
									<view class="img">
										<image :src="detailslist2[movieId].directors[0].avatars.large" mode="aspectFill"></image>
									</view>
									<view class="name">{{detailslist2[movieId].directors[0].name}}</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="person">
						<p>主演：</p>
						<view class="person-main">
							<scroll-view
							:scroll-x="true"
							style="white-space: nowrap;"
							scroll-left="120"
							>
								<view class="body" v-for="(item,index) in detailslist2[movieId].casts" :key="index">
									<view class="img">
										<image :src="item.avatars.large" mode="aspectFill"></image>
									</view>
									<view class="name">{{item.name}}</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.movieId = option.id;
			if(option.name !=="好剧预告"){
				this.detailslist2 = this.$store.state.demolist;
			}
			else{
				this.detailslist2 = this.$store.state.demolist2;
			}
			
		},
		data(){
			return{
				movieId:"",
				detailslist2:"",
				detailslist:[
					{
						title:"大圣归来",
						image:"../../static/details2.jpg",
						year:"2017",
						city:"中国大陆",
						type:"动漫 热血 冒险",
						time:"117",
					text:"大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来大圣归来"}
				],
			}
		},
		methods:{
			toWeb(url){
				uni.navigateTo({
					url:`../view/view?url=${url}`
				})
			},
		}
	}
</script>
<style>
	/* 全局样式 */
	*{
		margin: 0;
		padding: 0;
	}
	image{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	/* 全局样式 */
	
	
	/* details页面样式 */
	.details{
		width: 100%;
		height: 100%;
	}
	.details .bgop{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(85,90,90,0.6);
	}
	.details .bgimg{
		position: fixed;
		width: 100%;
		height: 100%;
	}
	.details .main{
		width: 80%;
		height: 100%;
		margin: 0 auto;
	}
	.details .mainimg{
		position: relative;
		width: 85%;
		height: 450px;
		margin: 0 auto;
	}
	.details .maininfo{
		position: relative;
		width: 100%;
		height: 300px;
		background: rgba(85,90,90,0.1);
	}
	.details .maininfo .info{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.details .maininfo .info span{
		margin: 5px 0;
	}
	.details .maininfo .info .title{
		font-size: 24px;
		margin: 15px auto;
	}
	/* details页面样式 */
	
	
	/* 撒大大 */
	.details .maininfo .person{
		margin: 10px 0;
		position: relative;
		width: 100%;
		height: 200px;
}
	.details .maininfo .person .person-main{
		position: absolute;
		width: 100%;
		height: 80%;
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
		top: 10%;
	}
	.main scroll-view .person-main .img image{
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	.main scroll-view .body .name{
		position: absolute;
		bottom: 10%;
		width: 100%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
</style>
