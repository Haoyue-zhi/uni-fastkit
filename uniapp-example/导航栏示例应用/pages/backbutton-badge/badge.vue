<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeText">修改返回按钮角标文本</button>
    <button type="default" @tap="changeSize">修改返回按钮角标文本大小</button>
    <button type="default" @tap="changeColor">修改返回按钮角标文本颜色</button>
    <button type="default" @tap="changeBackground">修改返回按钮图标角标背景色</button>
    <button type="default" @tap="hideBadge">隐藏返回按钮角标</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏上返回按钮角标',
        text: '99',
        size: '16px',
        color: '#FF0000',
        background: '#00FF00'
      }
    },
    onLoad() {

    },
    methods: {
      changeText(){
        this.text = ('99'===this.text)?'1':'99';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            badgeText:this.text
          }
        }});
      },
      hideBadge(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            badgeText:''
          }
        }});
      },
      changeSize(){
        this.size = ('16px'===this.size)?'24px':'16px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            badgeSize:this.size
          }
        }});
      },
      changeColor(){
        this.color = ('#FF0000'===this.color)?'#0000FF':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            badgeColor:this.color
          }
        }});
      },
      changeBackground(){
        this.background = ('#00FF00'===this.background)?'#CCCCCC':'#00FF00';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            badgeBackground:this.background
          }
        }});
      }
    }
  }
</script>

<style>

</style>
