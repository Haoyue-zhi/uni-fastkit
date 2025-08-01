# 使用方法
在 components-》ITkoala-amap-》config.js 文件中:
	WEBAK: 填写自己的Web服务高德地图key值
	JSAPIAK: 填写自己的Web端(JS API)高德地图key值
	
待优化部分：
onClick(ownerInstance) {
	// 调用 service 层的方法
	ownerInstance.callMethod('onViewClick', {
		dataIndex: this.dataIndex
	})
}
