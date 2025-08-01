### 介绍
custom-camera是支持多端兼容，且自定义相框的组件
## 组件使用：
``` javascript
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
```
## 记录踩坑：
1.因为uniapp的camera组件只支持微信小程序，所以APP只能采用live-pusher组件来解决这个问题，live-pusher组件必须是nvue文件（这些官方也有介绍[](https://uniapp.dcloud.net.cn/component/live-pusher.html)）

2.目录分为APP和WeChat分别对应相关的组件，互不干扰，config.js为相框图片的配置文件，方便替换相框

3.希望大佬指点

## 遇到的问题：
nvue组件下的“live-pusher”不能嵌套在“slot”插槽内，具体没深度研究。总之我把APP的组件单独写了一份！！！



## 注：贴图自己可以放任意的遮罩图片

## 我这边就放了三张（身份证人像面，身份证国徽面，人像框）
