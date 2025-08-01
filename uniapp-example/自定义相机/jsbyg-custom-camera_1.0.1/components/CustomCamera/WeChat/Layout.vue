<!-- 公共布局组件 -->
<template>
	<view class="custom-camera">
		<view class="camera-wrap" :style="{height:cameraHeight+'px'}">
			<slot></slot>
		</view>
		<view class="camera-options" :style="[{height:optionsHeight+'px'}]">
			<view class="camera-options-left camera-item">
				<image src="/static/images/back.png" mode="scaleToFill" @click="handleClikFn('back')"></image>
			</view>
			<view class="camera-options-center camera-item">
				<image src="/static/images/shutter.png" mode="scaleToFill" @click="handleClikFn('shutter')"></image>
			</view>
			<!-- <view class="camera-options-ritht camera-item" @click="handleClikFn('reversal')">
				<image src="/static/images/reversal.png" mode="scaleToFill"></image>
			</view> -->
			<view class="camera-options-ritht camera-item">
				<image src="/static/images/album.png" mode="scaleToFill" @click="handleClikFn('album')"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// 提供一个相机的插槽位置
	// 底部可以自定义最右侧按钮（相册/反转）
	export default {
		data() {
			return {
				cameraHeight: '', //相机画面宽度
				optionsHeight: '', //操作区域
			}
		},
		methods: {
			handleClikFn(instruct) {
				this.$emit('instruct', instruct)
			}
		},
		mounted() {
			this.cameraHeight = uni.getSystemInfoSync().screenHeight * 0.8
			this.optionsHeight = uni.getSystemInfoSync().screenHeight * 0.2
		},
	}
</script>

<style lang="scss">
	.custom-camera {
		height: 100vh;
		background-color: #000;

		.camera-wrap {
			// background-color: #f90;
		}

		.camera-options {
			// background-color: #900;
			flex-direction: row;

			.camera-item {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				flex: 1;
				height: 100%;

				>image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.camera-options-center {
				>image {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}
	}
</style>
