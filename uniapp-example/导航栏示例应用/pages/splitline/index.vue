<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeColor()">修改颜色</button>
    <button type="default" @tap="changeHeight()">修改高度</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置底部分割线',
        color: '#FF0000',
        height: '1px'
      }
    },
    onLoad() {

    },
    methods: {
      changeColor(){
        this.color = ('#FF0000'===this.color)?'#00FF00':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          splitLine:{
            color:this.color
          }
        }});
      },
      changeHeight(){
        this.height = ('1px'===this.height)?'3px':'1px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          splitLine:{
            height:this.height
          }
        }});
      }
    }
  }
</script>

<style>

</style>
