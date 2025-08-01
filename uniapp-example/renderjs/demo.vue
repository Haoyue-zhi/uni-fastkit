<template>
  <page-meta
    :page-style="'overflow:' + (show ? 'hidden' : 'visible')"
  ></page-meta>
  <view style="position: relative">
    <!-- 搜索框 -->
    <view>
      <tui-searchbar
        @search="handelSearch"
        @clear="handelCancel"
      ></tui-searchbar>
    </view>
    <!-- 定位图标 -->
    <view class="location" @click="getLocation">
      <tui-icon name="position" color="#ffffff" size="25"></tui-icon>
    </view>
    <!-- 弹出层 -->
    <uv-popup
      ref="popRef"
      mode="bottom"
      bg-color="null"
      :round="true"
      z-index="99"
      @maskClick="cancel"
    >
      <view class="bottom-popup">
        <view class="bottom-title">
          <view>{{ state.mapDetail.deviceName }}</view>
          <view @click="cancel">
            <tui-icon name="shut" color="#ffffff" size="30"></tui-icon>
          </view>
        </view>
        <view class="bottom-content">
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>上报时间</view>
            <view>{{ state.mapDetail.lastReportTime }}</view>
            <view class="btns" @click="openRepairPage()"> 详情 </view>
          </view>
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>设备状态</view>
            <view>{{ state.mapDetail.online ? "在线" : "离线" }}</view>
          </view>
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>电池电压</view>
            <view>{{ state.mapDetail.charge || 0 }}V</view>
          </view>
          <!-- 					<view class="bottom-item">
						<view>
							<uv-icon name="photo" size="20"></uv-icon>
						</view>
						<view>开阀状态</view>
						<view>{{state.mapDetail.controlSwitchState?'开':'关'}}</view>
					</view> -->
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>是否积水</view>
            <view>{{ state.mapDetail.pond == "T" ? "积水" : "未积水" }}</view>
          </view>
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>是否倾倒</view>
            <view>{{ state.mapDetail.tpOv == "T" ? "倾倒" : "未倾倒" }}</view>
          </view>
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>倾倒角度</view>
            <view>{{ state.mapDetail.angle || 0 }}°</view>
          </view>
          <view class="bottom-item">
            <view>
              <!-- <uv-icon name="photo" size="20"></uv-icon> -->
            </view>
            <view>水压</view>
            <view>{{ state.mapDetail.waterPressure || 0 }}MPa</view>
            <view class="btns" @click="chooseLocations"> 导航 </view>
          </view>
        </view>
      </view>
    </uv-popup>
    <!-- #ifdef MP-WEIXIN -->
    <map
      id="map"
      :latitude="state.latitude"
      :longitude="state.longitude"
      :markers="state.markers"
      :style="{ width: '100%', height: windowHeight + 'px' }"
      :scale="7"
      @markertap="markTap"
    ></map>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view
      id="amap"
      :markerList="markerList"
      :change:markerList="amap.updateEcharts"
      :latlon="state.latlon"
      :change:latlon="amap.getLatlon"
      :style="{ width: '100%', height: windowHeight + 'px' }"
    >
    </view>
    <!-- #endif -->
    <!-- 错误提示 -->
    <uv-toast ref="toast"></uv-toast>
  </view>
</template>

<script>
import { nextTick, reactive, ref, getCurrentInstance } from "vue";
import { userLoginUnreadMessagePage } from "@/api/sys/userCenterApi";
import { getMapList, getFilterList, getBoltDetail } from "@/api/map/index.js";
import {
  onLoad,
  onShow,
  onReady,
  onPullDownRefresh,
  onReachBottom,
} from "@dcloudio/uni-app";
import moment from "moment";
const start = "/static/device_normal.png";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    onReady(() => {
      uni.getSystemInfo({
        //获取高度
        success: (res) => {
          windowHeight.value = res.windowHeight;
        },
      });
    });
    onShow(() => {
      nextTick(() => {
        console.log("地图页面加载");
        getList();
      });
    });
    const toast = ref(null); //获取提示dom
    const markerList = ref([]);
    const originMarkerList = ref([]);
    const dataIndex = ref("");

    const show = ref(false);
    const state = ref({
      markers: [],
      _mapContext: null,
      query: {
        capCode: "",
        current: 1,
        orgId: uni.getStorageSync("storage_data").userInfo.orgId,
        size: 100000,
      },
      dataList: [],
      originDataList: [],
      latitude: 31.52853, //纬度
      longitude: 120.28429, //经度
      mapDetail: {},
      latlon: {
        latitude: "",
        longitude: "",
      },
    });

    const openRepairPage = () => {
      let id = state.value.mapDetail.deviceId;
      uni.navigateTo({
        url: `/pages/device/detail?id=${id}`,
      });
    };
    //地图搜索
    const handelSearch = (e) => {
      console.log("地图点击了搜索");
      console.log(e.value);
      console.log("地图点击了搜索");
      if (e.value == "") {
        toast.value.show({
          type: "error",
          icon: false,
          duration: 3000,
          message: "搜索不能为空",
        });
        return false;
      }
      //微信小程序
      // #ifdef MP-WEIXIN
      state.value.dataList = [];
      state.value.originDataList.forEach((item) => {
        if (item.deviceName && item.deviceName.includes(e.value)) {
          state.value.dataList.push(item);
        }
      });
      addMarkers();
      // #endif
      //APP
      // #ifdef APP-PLUS
      markerList.value = [];
      originMarkerList.value.forEach((item) => {
        if (item.deviceName && item.deviceName.includes(e.value)) {
          markerList.value.push(item);
        }
      });
      // #endif
    };

    //取消地图搜索
    const handelCancel = (e) => {
      console.log("点击了清空");
      // #ifdef MP-WEIXIN
      state.value.dataList = [];
      state.value.dataList = state.value.originDataList;
      addMarkers();
      // #endif

      // #ifdef APP-PLUS
      markerList.value = [];
      markerList.value = originMarkerList.value;
      // #endif
    };
    // 弹出
    const popRef = ref();
    const windowHeight = ref(0);
    const latitude = ref(23.09); //纬度
    const longitude = ref(113.32); //经度
    //点击marker
    const markTap = (e) => {
      console.log(e);
      show.value = true;
      // #ifdef APP-PLUS
      let deviceId = markerList.value[e].deviceId;
      // #endif
      // #ifdef MP-WEIXIN
      let deviceId = state.value.dataList[e.detail.markerId].deviceId;
      // #endif
      getBoltDetail(deviceId).then((res) => {
        state.value.mapDetail = res.data;
        //弹出弹框
        popRef.value.open();
      });
    };
    // 取消弹框
    const cancel = () => {
      show.value = false;
      popRef.value.close();
    };
    //导航
    const chooseLocations = () => {
      uni.openLocation({
        latitude: Number(state.value.mapDetail.latitude),
        longitude: Number(state.value.mapDetail.longitude),
        scale: 15,
      });
    };

    /*获取定位*/
    const getLocation = () => {
      uni.showLoading({
        title: "定位中",
      });
      uni.getLocation({
        type: "gcj02",
        altitude: true,
        success: function (res) {
          console.log(res);
          state.value.latitude = res.latitude;
          state.value.longitude = res.longitude;
          state.value.latlon.latitude = res.latitude;
          state.value.latlon.longitude = res.longitude;
          uni.hideLoading();
        },
        fail: function () {
          console.log("获取位置信息失败");
          uni.hideLoading();
        },
      });
      // #ifdef MP-WEIXIN
      let mapObjs = uni.createMapContext("map", this);
      mapObjs.moveToLocation(
        {
          latitude: state.value.latitude,
          longitude: state.value.longitude,
        },
        {
          complete: (res) => {
            console.log("移动完成:", res);
          },
        }
      );
      // #endif
    };
    //增加markers
    const addMarkers = () => {
      const positions = state.value.dataList.map((item, index) => {
        return {
          latitude: item.latitude || 31.61505,
          longitude: item.longitude || 120.34179,
          id: index,
          online: item.online,
        };
      });
      const markers = [];
      positions.forEach((p, i) => {
        markers.push(
          Object.assign(
            {},
            {
              id: p.id,
              iconPath:
                p.online == true
                  ? "/static/device_normal.png"
                  : "/static/device_offline.png",
              width: 35,
              height: 34,
              joinCluster: false, // 指定了该参数才会参与聚合
              // callout: {
              // 	bgColor: "#5AC2EB",
              // 	color: "#fff",
              // 	content: `消防栓${p.id}`,
              // 	display: "ALWAYS",
              // 	fontSize: "14",
              // 	fontWeight: "bold",
              // 	padding: 8,
              // 	textAlign: "center"
              // },
            },
            p
          )
        );
      });
      state.value.markers = markers;
      // state._mapContext.addMarkers({
      // 	markers,
      // 	clear: false,
      // 	complete(res) {
      // 		// console.log('addMarkers', res)
      // 	}
      // })
    };
    /*获取列表数据*/
    const getList = () => {
      getMapList(uni.getStorageSync("storage_data").userInfo.orgId).then(
        (res) => {
          // #ifdef APP-PLUS
          markerList.value = res.data.devices || [];
          originMarkerList.value = res.data.devices || [];
          // #endif

          // #ifdef MP-WEIXIN
          state.value.dataList = res.data.devices || [];
          state.value.originDataList = res.data.devices || [];
          if (state.value.dataList.length > 0) {
            //将数据渲染到地图
            addMarkers();
          }
          // #endif
        }
      );
    };
    // 下拉刷新
    onPullDownRefresh(() => {
      // loadData(true)
    });
    // 上拉加载
    onReachBottom(() => {
      // loadData()
    });
    const clickMsg = (item) => {
      uni.navigateTo({
        url: `/pages/msg/detail?id=${item.id}&createTime=${item.createTime}`,
      });
    };
    //renderjs点击地图回调
    const onViewClick = (val) => {
      markTap(val);
    };
    return {
      markerList,
      getList,
      onViewClick,
      windowHeight,
      markTap,
      state,
      popRef,
      cancel,
      chooseLocations,
      openRepairPage,
      show,
      getLocation,
      addMarkers,
      handelSearch,
      toast,
      originMarkerList,
      handelCancel,
    };
  },
};
</script>

<script lang="renderjs" module="amap">
export default {
	data() {
		return {
			show: false,
			ownerInstanceObj: null, //service层对象
			state: {
				markers: [],
				_mapContext: null,
				query: {
					capCode: '',
					current: 1,
					orgId: 123,
					size: 100000
				},
				dataList: [],
				latitude: 31.61505, //纬度
				longitude: 120.34179, //经度
				mapDetail: {}
			},
			popRef: '',
			windowHeight: 0,
			latitude: 23.09,
			longitude: 113.32,
			map: null,
			markerList: [],
			dataIndex: 0,
			latlon: {}
		}
	},
	mounted() { //先加载逻辑层再加载数据层 在监听回调里初始化地图
		console.log('mounted~~~~~~~~~~~~~~~`')
		// this.init()
	},
	methods: {
		// 引入高德地图SDK
		init() {
			if (typeof window.AMap == 'function') {
				this.initAmap();
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script');
				script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=你的key';
				script.onload = this.initAmap.bind(this);
				document.head.appendChild(script);
			}
		},
		//初始化地图
		initAmap() {
			let lat = 120.34179
			let lon = 31.61505
			if (this.latlon && this.latlon.latitude) {
				lon = Number(this.latlon.latitude)
				lat = Number(this.latlon.longitude)
			}
			this.map = new AMap.Map('amap', {
				resizeEnable: true,
				// center: [120.34179, 31.61505],
				center: [lat, lon],
				// zooms: [14, 20], //设置地图级别范围
				zoom: 15,
			})
			this.map.on('complete', () => {
				console.log('加载完成')
				this.initMarkers()
			})
		},
		initMarkers() {
			let that = this;
			let prevMarker = null
			let prevIcon = null
			console.log('初始化markder')
			// var blueIcon = new AMap.Icon({
			// 	size: new AMap.Size(35, 34), // 设置图标大小
			// 	image: 'https://img1.baidu.com/it/u=4270144465,1604793144&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800', // 设置图标样式
			// 	imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
			// 	imageSize: new AMap.Size(35, 34) // 设置图标尺寸
			// });
			this.markerList.forEach((item, index) => {

				if (item.online == true) {
					var blueIcon = new AMap.Icon({
						size: new AMap.Size(35, 34), // 设置图标大小
						image: 'https://fh-platform-test.obs.cn-east-3.myhuaweicloud.com/2024/1/7/1743806358433562626.png', // 设置图标样式
						imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
						imageSize: new AMap.Size(35, 34) // 设置图标尺寸
					});
				} else {
					var blueIcon = new AMap.Icon({
						size: new AMap.Size(35, 34), // 设置图标大小
						image: 'https://fh-platform-test.obs.cn-east-3.myhuaweicloud.com/2024/1/7/1743806505389391873.png', // 设置图标样式
						imageOffset: new AMap.Pixel(0, 0), // 设置图标偏移
						imageSize: new AMap.Size(35, 34) // 设置图标尺寸
					});
				}
				//添加点标记
				let marker = new AMap.Marker({
					position: new AMap.LngLat(Number(item.longitude), Number(item.latitude)),
					icon: blueIcon,
					draggable: true, // 设置 marker 可拖拽
					// zooms: [2, 12], //点标记显示的层级范围，超过范围不显示
					title: item.deviceId
				})

				marker.on('click', (e) => {
					that.dataIndex = index
					that.onClick(that.ownerInstanceObj)
				})

				this.map.add(marker)


			})
		},
		//监听逻辑层传递过来消火栓的数据
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			console.log('renderjs值发生了变化')
			this.markerList = newValue
			this.ownerInstanceObj = ownerInstance
			// 监听 service 层数据变更
			// this.ownerInstanceObj = ownerInstance
			// this.initMarkers()
			// this.initAmap()
			this.init()
		},
		//监听逻辑层传递过来的经纬度
		getLatlon(newValue) {
			console.log('renderjs值发生了变化')
			this.latlon = newValue
			this.initAmap()
		},
		onClick() {
			console.log('传值给service层')
			// 调用 service 层的方法
			this.$ownerInstance.callMethod('onViewClick', this.dataIndex)
		}
	}

}
</script>

<style lang="scss" scoped>
.location {
  width: 35px;
  height: 35px;
  background: #0079fe;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  position: absolute;
  bottom: 100px;
  right: 30px;
  z-index: 55;
}

.bottom-popup {
  // height: 500px;

  z-index: 100;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;

  .bottom-title {
    width: 100%;
    background: #0079fe;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    align-items: center;
    font-size: 20px;
    height: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: hidden;
  }

  .bottom-content {
    width: 100%;
    background-color: #ffffff;

    .bottom-item {
      display: flex;
      width: 100%;
      font-size: 16px;
      align-items: center;
      padding: 10px 20px;

      > view {
        &:nth-child(1) {
          width: 0%;
        }

        &:nth-child(2) {
          width: 20%;
        }

        &:nth-child(3) {
          width: 50%;
          height: 21px;
        }
      }

      .btns {
        background: #0079fe;
        color: #ffffff;
        border-radius: 20px;
        height: 30px;
        width: 60px;
        text-align: center;
        line-height: 30px;
        margin-left: 20px;
      }
    }
  }
}
</style>
