<template>
	<view>
		<web-view :scr="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.url= option.url
			console.log(option.url)
		},
		data() {
			return {
				url:""
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
