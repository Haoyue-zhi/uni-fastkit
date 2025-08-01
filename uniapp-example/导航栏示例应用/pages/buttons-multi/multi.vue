<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="switchDisplay()">显示/隐藏按钮</button>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="switchDisplay2()">显示/隐藏按钮</button>
    <view class="text-area">
      <text class="title">{{title3}}</text>
    </view>
    <button type="default" @tap="switchDisplay3()">显示/隐藏按钮</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '菜单图标按钮',
        title2: '分享图标按钮',
        title3: '文本按钮',
        display: true,
        display2: true,
        display3: true,
        color: '',
        color2: '',
        color3: '',
        weight: 'normal'
      }
    },
    onLoad() {

    },
    onNavigationBarButtonTap(e) {
      var index = e.index;
      uni.showToast({
        title:'点击了按钮'+index
      })
    },
    methods: {
      switchDisplay(){
        this.display = !this.display;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          width:this.display?'auto':'0px'
        });
      },
      switchDisplay2(){
        this.display2 = !this.display2;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(1, {
          width:this.display2?'auto':'0px'
        });
      },
      switchDisplay3(){
        this.display3 = !this.display3;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(2, {
          width:this.display3?'auto':'0px'
        });
      }
    }
  }
</script>

<style>

</style>
