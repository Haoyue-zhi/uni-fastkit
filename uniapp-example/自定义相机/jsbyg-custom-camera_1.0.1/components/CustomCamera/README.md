使用：

<template>
	<view>
		<CustomCamera ref="CustomCamera" coverImageType="side" @back="back" @getImage="getImage" />
	</view>
</template>

<script>
	// #ifdef APP
	import CustomCamera from "@/components/CustomCamera/APP/index.nvue"
	// #endif
	// #ifdef MP-WEIXIN
	import CustomCamera from "@/components/CustomCamera/WeChat/index.vue"
	// #endif
	export default {
		components: {
			CustomCamera
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			getImage(res) {
				console.log(res)
			}
		}
	}
</script>

记录：
1.因为uniapp的camera组件只支持微信小程序，所以APP只能采用live-pusher组件来解决这个问题，当然live-pusher组件没有camera的性能好，而且必须是nvue文件（这些官方也有介绍[](https://uniapp.dcloud.net.cn/component/live-pusher.html)）
2.难点就是适配页面以及页面的布局,采用百分比布局更能适配各个手机端
3.common 为公共布局组件 (app和小程序布局样式基本一致，只有相机那块是替换组件 所以布局可以抽离为一个公共的layout组件)


遇到的问题：
nvue组件下的“live-pusher”不能嵌套在“slot”插槽内，具体没深度研究。总之我把APP的组件单独写了一份！！！



贴图自己可以放任意的遮罩图片

我这边就放了三张（身份证人像面，身份证国徽面，人像框）
