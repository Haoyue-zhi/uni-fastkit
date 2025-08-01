<template>
	<view>
		<view id="amap" :style="mapStyle" class="amap-style" :markers="markers" :change:markers="amap.updateMarker">
		</view>
	</view>
</template>

<!-- 高德地图 renderjs视图层 -->
<script module="amap" lang="renderjs">
	let map = undefined,
		cluster = undefined;
	export default {
		data() {
			return {
				isMapLoadSuccess: false
			}
		},
		mounted() {
			console.log('renderjs mounted');
			// 清除地图数据
			this.reset();
			// 注意：异步回调函数的声明应该在 JSAPI 引入之前，函数名与callback=onLoad中对应
			if (!window.isOnRady) {
				window.isOnRady = () => {
					this.init();
				};
			} else {
				this.init();
			}
			// 异步加载高德地图 JSAPI 
			if (!window.AMap) {
				this.loadAMap();
			}
		},
		methods: {
			// 异步加载高德地图 JSAPI 
			loadAMap() {
				// 动态异步引入较大类库避免影响页面展示
				const myKey = '187ace5f030c2fb236437d3c80afedf1';
				const myCode = "ac38c58f0fe7f87bbd19ffdc4ed3198d";
				const url = `https://webapi.amap.com/maps?v=2.0&key=${myKey}&callback=isOnRady`;
				const jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = url;
				document.head.appendChild(jsapi);
				// 安全密钥
				window._AMapSecurityConfig = {
					securityJsCode: myCode,
				};
				console.log('加载高德地图插件');
			},
			// 初始化
			init() {
				map = new AMap.Map('amap', this.mapDefaultOptions);

				map.on('complete', () => {
					console.log('地图加载完成');
					this.isMapLoadSuccess = true;
					this.initMarkers();
				})
			},
			// 地图相关数据初始化
			reset() {
				map && (map = undefined);
				// 如果有之前的数据,先清除
				if (cluster) {
					console.log('清除点聚合');
					cluster.setMap(null);
					cluster = undefined;
				}
			},
			// 生成点聚合点位
			initMarkers() {
				// 添加判断，防止地图没有加载完成就渲染
				if (!(this.isMapLoadSuccess && this.markers.length)) {
					return
				}
				// 根据官方示例数据形式
				const point = this.markers;
				// 先调整地图中心点
				const center = point[0].lnglat || this.mapDefaultOptions.center;
				map.setCenter(center);
				// 加载点聚合插件
				map.plugin(["AMap.MarkerCluster"], () => {
					cluster = new AMap.MarkerCluster(map, point, {
						gridSize: 80, // 聚合网格像素大小
						renderClusterMarker: (context) => { // 对聚合点位的渲染
							// console.log('context：', context);  // 入参中有四个数据 count data indexs marker
							// 修改聚合点位样式
							this.createClusterMarker(context);
							// 设置聚合点位点击事件
							const marker = context.marker;
							marker.on('click', (e) => {
								let mapZoom = map.getZoom();
								if (mapZoom < 20) {
									mapZoom += 2;
								}
								map.setZoomAndCenter(mapZoom, e.lnglat);
							})
						},
						renderMarker: ({
							data,
							marker
						}) => { // 对非聚合点位的渲染
							// console.log(context);  // 入参中有四个数据 count data indexs marker
							// 获取自己设置的name
							if(data[0].extData) {
								console.log(data[0].extData.name);
							}
							marker.setIcon(this.creatAMapIcon());
							marker.setAnchor('bottom-center');
							// 设置非聚合点位点击事件
							marker.on('click', (e) => {
								map.setCenter(e.lnglat);
								this.tapMarker();
							})
						}
					});
				});
			},
			// 更新数据
			updateMarker(newVal) {
				console.log('renderjs 更新:', newVal.length);
				this.initMarkers();
			},
			// 生成高德地图Icon
			creatAMapIcon(type) {
				const iconOptions = {
					image: 'https://hellouniapp.dcloud.net.cn/static/location.png',
					imageSize: new AMap.Size(35, 35)
				}
				return new AMap.Icon(iconOptions);
			},
			// 聚合点位样式(采用高德地图)
			createClusterMarker(context) {
				const count = this.markers.length + 1000;
				const factor = Math.pow(context.count / count, 1 / 18);
				const div = document.createElement('div');
				const Hue = 180 - factor * 180;
				const bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
				const fontColor = 'hsla(' + Hue + ',100%,90%,1)';
				const borderColor = 'hsla(' + Hue + ',100%,40%,1)';
				const shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
				div.style.backgroundColor = bgColor;
				const size = Math.round(20 + Math.pow(context.count / count, 1 / 5) * 20);
				div.style.width = div.style.height = size + 'px';
				div.style.border = 'solid 1px ' + borderColor;
				div.style.borderRadius = size / 2 + 'px';
				div.style.boxShadow = '0 0 5px ' + shadowColor;
				div.innerHTML = context.count;
				div.style.lineHeight = size + 'px';
				div.style.color = fontColor;
				div.style.fontSize = '14px';
				div.style.textAlign = 'center';
				context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
				context.marker.setContent(div);
			},
			// 非聚合marker点击事件
			tapMarker(marker) {

			}
		},
	}
</script>

<script>
	export default {
		name: 'DetailsMap',
		data() {
			return {
				windowHeight: 0,
				windowWidth: 0,
				markers: [],
				mapDefaultOptions: {
					center: [108.939621, 34.343147],
					zoom: 16,
					resizeEnable: true, //窗口大小调整
				}
			}
		},
		computed: {
			mapStyle() {
				return {
					'height': this.windowHeight + 'px'
				}
			}
		},
		onLoad(option) {
			console.log('service onLoad');
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			uni.onWindowResize(res => { // 监听屏幕尺寸变化
				this.windowHeight = res.size.windowHeight;
				this.windowWidth = res.size.windowWidth;
			})
			this.getDataApi();
		},
		methods: {
			// 模拟接口请求数据
			getDataApi() {
				setTimeout(() => {
					this.markers = [{
							weight: 8,
							lnglat: ["108.939621", "34.343147"],
							extData: {  // 自定义携带的其他数据
								name: '123'
							}
						},
						{
							weight: 1,
							lnglat: ["113.370643", "22.938827"]
						},
						{
							weight: 1,
							lnglat: ["112.985037", "23.15046"]
						},
						{
							weight: 1,
							lnglat: ["110.361899", "20.026695"]
						},
						{
							weight: 1,
							lnglat: ["121.434529", "31.215641"]
						},
					]
				}, 1000)
			},
		}
	}
</script>

<style lang='scss' scoped>

</style>
