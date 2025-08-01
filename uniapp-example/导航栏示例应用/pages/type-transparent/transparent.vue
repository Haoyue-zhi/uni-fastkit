<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeCoverage">修改导航栏透明变化的滚动距离</button>
    <view style="width:100%;height:1000px"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '上下滚动页面查看导航栏状态变化',
        coverage: '132px'
      }
    },
    onLoad() {

    },
    onNavigationBarButtonTap(e) {
      var index = e.index;
      uni.showToast({
        title:'点击了按钮'
      })
    },
    methods: {
      changeCoverage(){
        this.coverage = ('132px'===this.coverage)?'50%':'132px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          coverage:this.coverage
        }})
      }
    }
  }
</script>

<style>

</style>
