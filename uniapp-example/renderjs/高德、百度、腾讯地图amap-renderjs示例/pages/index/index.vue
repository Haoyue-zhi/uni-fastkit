<template>
	<view class="content">
		<view style="margin: 15rpx;">
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toAmapPage">高德地图+renderjs 初体验</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toInfowindowPage">自定义信息窗体</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toNavigationPage">路线规划</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toGeolocationPage">定位当前位置</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toPoiSearchPage">POI搜索</button>
			</view>
			
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toTMapPage">腾讯地图</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toBMapPage">百度地图</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// 跳转高德地图+renderjs 初体验页面
			toAmapPage(){
				uni.navigateTo({
					url: '/pages/amap/amap'
				})
			},
			// 跳转自定义窗体页面
			toInfowindowPage(){
				uni.navigateTo({
					url: '/pages/infowindow/infowindow'
				})
			},
			// 跳转路线规划页面
			toNavigationPage(){
				uni.navigateTo({
					url: '/pages/navigation/navigation'
				})
			},
			// 跳转定位当前位置页面
			toGeolocationPage(){
				uni.navigateTo({
					url: '/pages/geolocation/geolocation'
				})
			},
			// 跳转POI搜索页面
			toPoiSearchPage(){
				uni.navigateTo({
					url: '/pages/poiSearch/poiSearch'
				})
			},
			
			// 跳转腾讯地图页面
			toTMapPage(){
				uni.navigateTo({
					url: '/pages/TMap/TMap'
				})
			},
			// 跳转百度地图页面
			toBMapPage(){
				uni.navigateTo({
					url: '/pages/BMap/BMap'
				})
			}
		}
	}
</script>

<style>
</style>
