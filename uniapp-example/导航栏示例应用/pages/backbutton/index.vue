<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeSize">修改返回按钮图标大小</button>
    <button type="default" @tap="changeWeight">修改返回按钮图标粗细</button>
    <button type="default" @tap="changeColor">修改返回按钮图标颜色</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏上返回按钮图标',
        size: '32px',
        color: '#FF0000',
        weight: 'normal'
      }
    },
    onLoad() {

    },
    methods: {
      changeSize(){
        this.size = ('32px'===this.size)?'16px':'32px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            fontSize:this.size
          }
        }});
      },
      changeWeight(){
        this.weight = ('normal'===this.weight)?'bold':'normal';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            fontWeight:this.weight
          }
        }});
      },
      changeColor(){
        this.color = ('#FF0000'===this.color)?'#00FF00':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            color:this.color
          }
        }});
      }
    }
  }
</script>

<style>

</style>
