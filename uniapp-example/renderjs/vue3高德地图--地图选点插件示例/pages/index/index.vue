<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area" @click="mapopen">
			<text class="title">打开地图选点</text>
		</view>
		<view v-if="address">
			{{address.province}}
		</view>
		<view v-if="address">
			{{address.city}}
		</view>
		<view v-if="address">
			{{address.district}}
		</view>
		<view v-if="address">
			{{address.name}}
		</view>
		<view v-if="address">
			{{address.address}}
		</view>
		<view v-if="address">
			{{address.location}}
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			address: ''
		};
	},
	onLoad() {},
	beforeDestroy () {
		console.log('移除')
	    uni.$off();
	},
	onShow() {
		let _this = this;
		uni.$once('commitCheck', (data) => {
			console.log(data,'地址+++1')
			this.address=data
		});
	},
	methods: {
		mapopen() {
			uni.navigateTo({
				url: '/pages/map/index'
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
