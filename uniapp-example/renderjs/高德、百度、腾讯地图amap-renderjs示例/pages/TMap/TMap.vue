<template>
	<view><view @click="tmap.onClick" :prop="markerList" :change:prop="tmap.updateEcharts" id="tmap"></view></view>
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
					lng: 116.388771,
					lat: 39.928242
				},
				{
					lng: 116.392157,
					lat: 39.930482
				},
				{
					lng: 116.389219,
					lat: 39.925809
				}
			]
		},
		//图表点击回调事件
		onViewClick(params) {
			this.dataIndex = params.dataIndex
		}
	}
}
</script>

<script module="tmap" lang="renderjs">
import config from '@/components/ITkoala-amap/config.js'

export default {
	data() {
		return {
			map: null,
			ownerInstanceObj: null, //service层对象
			markerLayer: null,
			dataIndex: null
		}
	},
	mounted() {
		if (typeof window.AMap === 'function') {
			this.initAmap()
		} else {
			const script = document.createElement('script')
			
			script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=' + config.TMAP_JSAPIAK
			script.onload = this.initAmap.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initAmap() {
			//定义地图中心点坐标
			//定义map变量，调用 TMap.Map() 构造函数创建地图
			this.map = new TMap.Map('tmap', {
				center: new TMap.LatLng(39.90923, 116.397428),//设置地图中心点坐标
				zoom: 12,   //设置地图缩放级别
				maxZoom: 16, //设置地图级别范围
				// pitch: 43.5,  //设置俯仰角
				// rotation: 45,    //设置地图旋转角度
				baseMap: {  // 设置卫星地图
				  type: 'satellite'
				}
			});

			this.initMarkers()
		},
		//初始化标记点
		initMarkers() {
			if (this.markerLayer) {
				this.markerLayer.setMap(null)
				this.markerLayer = null
			}

			if(!this.map){
				return
			}

			//初始化marker图层
			this.markerLayer = new TMap.MultiMarker({
				id: 'marker-layer',
				map: this.map,
				styles: {
					start: new TMap.MarkerStyle({
						width: 35,
						height: 30,
						anchor: { x: 16, y: 16 },
						src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
					}),
					selected: new TMap.MarkerStyle({
						width: 35,
						height: 35,
						anchor: { x: 16, y: 32 },
						src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerNew.png'
					})
				}
			})

			this.markerLayer.on('click', (evt) => {
				this.dataIndex = evt.geometry.id
				this.onClick(null,this.ownerInstanceObj)

				this.initMarkers()
			})

			this.markerList.forEach((item, index) => {

				let icon = 'start'
				if(index === this.dataIndex){
					icon = 'selected'
				}

				this.markerLayer.add({
					id: index,
					position: new TMap.LatLng(item.lat, item.lng),
					styleId: icon
				})

			})

		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			this.ownerInstanceObj = ownerInstance
			this.initMarkers()
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
#tmap {
	width: 100%;
	height: 900rpx;
}
</style>
