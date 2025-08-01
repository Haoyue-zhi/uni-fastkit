<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeRepeat">切换背景图片平铺方式</button>
    <button type="default" @tap="switchImage">显示/隐藏背景图片</button>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="showGradient">显示背景渐变色</button>
    <button type="default" @tap="changeGradient">切换背景渐变色</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏上背景图',
        title2: '设置标题栏背景渐变色',
        repeat: 0,
        repeatValues: ['no-repeat','repeat-x','repeat-y','repeat'],
        image: '/static/bg.png',
        gradient: 0,
        gradientValue: [
          'linear-gradient(to top, #a80077, #66ff00)',
          'linear-gradient(to bottom, #a80077, #66ff00)',
          'linear-gradient(to right, #a80077, #66ff00)',
          'linear-gradient(to left, #a80077, #66ff00)',
          'linear-gradient(to bottom right, #a80077, #66ff00)',
          'linear-gradient(to top left, #a80077, #66ff00)',
        ]
      }
    },
    onLoad() {

    },
    methods: {
      changeRepeat(){
        this.repeat++;
        if(this.repeat>=this.repeatValues.length){
          this.repeat=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backgroundRepeat:this.repeatValues[this.repeat]
        }});
      },
      switchImage(){
        this.image = (''===this.image)?'/static/bg.png':'';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backgroundImage:this.image
        }});
      },
      showGradient(){
        this.gradient = 0;
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backgroundImage:this.gradientValue[this.gradient]
        }});
      },
      changeGradient(){
        this.gradient++;
        if(this.gradient>=this.gradientValue.length){
          this.gradient=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backgroundImage:this.gradientValue[this.gradient]
        }});
      }
    }
  }
</script>

<style>

</style>
