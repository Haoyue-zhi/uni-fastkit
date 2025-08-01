<template>
	<view>
		<view @click="bmap.onClick" :prop="markerList" :change:prop="bmap.updateEcharts" id="bmap"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markerList: [],
				dataIndex: 0
			}
		},
		created() {
			this.$nextTick(() => {
				this.getMapData()
			})
		},
		methods: {
			// 地图数据获取
			getMapData() {
				this.markerList = [
				{
					lng: 116.32715,
					lat: 39.923099
				},
				{
					lng: 116.436959,
					lat: 39.886347
				},
				{
					lng: 116.420861,
					lat: 39.95972
				}]
			},
			//图表点击回调事件
			onViewClick(params) {
				this.dataIndex = params.dataIndex
			}
		}
	}
</script>

<script module="bmap" lang="renderjs">
	import config from '@/components/ITkoala-amap/config.js'
	const start = 'static/ITkoala-amap/start.png'
	const selectedStart = 'static/ITkoala-amap/selectedStart.png' //选中的图片
	
	export default {
		data() {
			return {
				map: null,
				ownerInstanceObj: null //service层对象
			}
		},
		mounted() {
			if (typeof window.BMap === 'function') {
				this.initAmap()
			} else {
				// 百度地图异步加载回调处理
				window.onBMapCallback = () => {
					this.initAmap()
				}
					  
				const script = document.createElement('script')
				script.src = 'https://api.map.baidu.com/api?v=2.0&ak=' + config.BMAP_JSAPIAK + '&s=1&callback=onBMapCallback'
				document.head.appendChild(script)
			}
		},
		methods: {
			initAmap() {
				this.map = new BMap.Map("bmap",{mapType:BMAP_HYBRID_MAP})
				let point = new BMap.Point(116.404188,39.916458)
				this.map.centerAndZoom(point, 10)
				this.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
				this.map.setMaxZoom(16)
				this.map.setMinZoom(10)
				
				this.initMarkers()
			},
			//初始化标记点
			initMarkers() {
				if(this.map){
					this.map.clearOverlays()
				}
				if(!this.map || !this.markerList || !this.markerList.length){
					return
				}
				
				let prevMarker = null
				let prevIcon = null
				this.markerList.forEach((item, index) => {
					
					let icon = start
					if(icon){
						let point = new BMap.Point(item.lng, item.lat) //将标注点转化成地图上的点
						let marker = new BMap.Marker(point)//将点转化成标注点
						
						let lightMyIcon = new BMap.Icon(
							icon,
							new BMap.Size(25, 25), {
								imageSize: new BMap.Size(25, 25)
							})
						marker.setIcon(lightMyIcon)
						
						
						marker.addEventListener('click', (e) => {
							if(prevMarker){
								let prevIconObj = new BMap.Icon(
									prevIcon,
									new BMap.Size(25, 25), {
										imageSize: new BMap.Size(25, 25)
									})
								prevMarker.setIcon(prevIconObj)
							}
							prevIcon = icon
							prevMarker = marker
							
							let selectedIcon = new BMap.Icon(
								selectedStart,
								new BMap.Size(25, 25), {
									imageSize: new BMap.Size(25, 25)
								})
							marker.setIcon(selectedIcon)
							
							this.dataIndex = index
							this.onClick(null,this.ownerInstanceObj)
						})
						
						this.map.addOverlay(marker) //将标注点添加到地图上
					}

				})

			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				this.initMarkers()
				
				// 监听 service 层数据变更
				this.ownerInstanceObj = ownerInstance
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					dataIndex: this.dataIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
#bmap {
	width: 100%;
	height: 900rpx;
}
</style>
