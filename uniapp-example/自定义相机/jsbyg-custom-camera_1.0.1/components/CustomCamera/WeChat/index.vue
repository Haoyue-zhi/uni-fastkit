<template>
	<Layout @instruct="handleInstruct">
		<camera class="camera" mode="normal" :device-position="device" @error="error"
			style="width: 100%; height: 100%;">
			<cover-image v-if="coverImage" :src="coverImage" style="width: 100%;height: 100%;"></cover-image>
		</camera>
	</Layout>
</template>

<script>
	import Layout from './Layout.vue'
	import config from '../config.js'
	export default {
		components: {
			Layout
		},
		props: {
			coverImageType: { //遮罩层的类型 （必须在config里面的定义的）
				type: String,
				default: 'portrait'
			}
		},
		data() {
			return {
				device: 'back',
				cameraContext: null,
				shutterShow: false,
				coverImage: null,
			}
		},
		mounted() {
			this.cameraContext = uni.createCameraContext();
			try {
				this.coverImage = config[this.coverImageType]
			} catch (e) {
				uni.showToast({
					title: '传入的coverImageType不存在',
					icon: 'none'
				})
			}
		},
		methods: {
			error(err) {
				console.log(err)
			},
			handleInstruct(instruct) {
				switch (instruct) {
					// 返回
					case 'back':
						this.$emit('back')
						break;
						// 快门
					case 'shutter':
						this.cameraContext.takePhoto({
							quality: 'high',
							success: (res) => {
								// console.log(res)
								this.$emit('getImage', res.tempImagePath)
							}
						})
						break;
						// 反转
					case 'reversal':
						this.device = this.device === 'back' ? 'front' : 'back'
						break;
						// 相册
					case 'album':
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: (res) => {
								this.$emit('getImage', res.tempFilePaths[0])
							}
						})
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.camera-background {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.camera {
		position: relative;
	}

	.shutter-light {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		background-color: #fff;
		opacity: 0;
		transition: opacity 0.1s ease-out;
	}

	.shutter-light-active {
		opacity: 1;
	}
</style>
