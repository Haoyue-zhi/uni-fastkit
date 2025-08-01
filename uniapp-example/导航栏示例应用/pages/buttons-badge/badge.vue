<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="hideRedDot">隐藏红点</button>
    <button type="default" @tap="showRedDot">显示红点</button>
    <button type="default" @tap="changeDotColor">修改红点颜色</button>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="switchBadge">显示/隐藏角标</button>
    <button type="default" @tap="changeBadge">修改角标</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置按钮红点',
        title2: '设置按钮角标',
        dotColor: '#FF0000',
        badge: false,
        badgeValue: '99'
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
      hideRedDot(){
        var webview = this.$mp.page.$getAppWebview();
        webview.hideTitleNViewButtonRedDot({
          index:0
        });
      },
      showRedDot(){
        var webview = this.$mp.page.$getAppWebview();
        webview.showTitleNViewButtonRedDot({
          index:0
        });
      },
      changeDotColor(){
        this.dotColor = ('#FF0000'===this.dotColor)?'#00FF00':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          redDotColor:this.dotColor
        }});
      },
      switchBadge(){
        this.badge = !this.badge;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonBadge({
          index:0,
          text:this.badge?this.badgeValue:''
        });
      },
      changeBadge(){
        this.badgeValue = ('99'===this.badgeValue)?'6':'99';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonBadge({
          index:0,
          text:this.badgeValue,
        });
      }
    }
  }
</script>

<style>

</style>
