<template>
	<view class="map-box">
		<vue3-map @commitCheck="commitCheck" :mapKey='mapKey' :Radius='Radius' :showResetting='showResetting' :listIco='listIco' :orientationIco='orientationIco' :resettingIco='resettingIco'></vue3-map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mapKey:'737965f92c797efb5447a4d658328513',
			address: '',
			latitude: '39.994257',
			longitude: '116.471354',
			listIco:'/uni_modules/vue3-map/static/item-inx.png',
			orientationIco:'/uni_modules/vue3-map/static/map-inx.png',
			resettingIco:"/uni_modules/vue3-map/static/position.png",
			showResetting:true,
			Radius:'',
		};
	},
	methods: {
		commitCheck(e) {
			console.log(e, 565);
			uni.$emit('commitCheck', e);
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.map-box {
	height: 100vh;
	width: 100vw;
}
</style>
