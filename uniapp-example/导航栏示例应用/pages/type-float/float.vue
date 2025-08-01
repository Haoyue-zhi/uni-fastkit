<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeScrollbar">隐藏/显示滚动条</button>
    <view style="width:100%;height:1000px"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '悬浮时导航栏盖住页面，页面滚动条会通顶',
        scroll: 'all'
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
      changeScrollbar(){
        this.scroll = ('all'===this.scroll)?'none':'all';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({
          scrollIndicator:this.scroll,
        });
      }
    }
  }
</script>

<style>

</style>
