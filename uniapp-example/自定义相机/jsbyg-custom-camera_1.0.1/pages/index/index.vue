<template>
	<view class="page">
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index" @click="handleDetail(item.link,item.type)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					title: '身份证正面相框',
					type: 'front',
				}, {
					title: '身份证反面相框',
					type: 'side',
				}, {
					title: '人像框',
					type: 'portrait',
				}]
			}
		},
		methods: {
			handleDetail(link, type) {
				uni.navigateTo({
					url: `/pages/camera/index?coverImageType=${type}`
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		padding: 0 30rpx;
	}

	.item {
		font-size: 30rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		align-items: center;
		border-bottom: 2rpx solid #ebebeb;
	}
</style>
