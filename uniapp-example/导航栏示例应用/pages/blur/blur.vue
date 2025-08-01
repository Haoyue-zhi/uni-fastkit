<template>
  <view class="content">
    <image class="logo" style="margin-top: 200rpx;" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeBlur">切换毛玻璃效果</button>
    <view class="text-area">
      <text class="tip">Android平台暂不支持</text>
    </view>
    <view style="width:100%;height:1000px"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏毛玻璃效果',
        blur: 0,
        blurValues: ['light','extralight','dark','none']
      }
    },
    onLoad() {

    },
    methods: {
      changeBlur(){
        this.blur++;
        if(this.blur>=this.blurValues.length){
          this.blur=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          blurEffect:this.blurValues[this.blur]
        }});
      }
    }
  }
</script>

<style>

</style>
