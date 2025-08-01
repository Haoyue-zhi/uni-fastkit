<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeText">修改返回按钮标题内容</button>
    <button type="default" @tap="changeSize">修改返回按钮标题大小</button>
    <button type="default" @tap="changeWeight">修改返回按钮标题粗细</button>
    <button type="default" @tap="changeColor">修改返回按钮标题颜色</button>
    <button type="default" @tap="hideBadge">隐藏返回按钮标题</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏上返回按钮标题',
        text: '返回',
        size: '16px',
        color: '#FF0000',
        weight: 'normal'
      }
    },
    onLoad() {

    },
    methods: {
      changeText(){
        this.text = ('返回'===this.text)?'首页':'返回';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            title:this.text
          }
        }});
      },
      hideBadge(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            title:''
          }
        }});
      },
      changeSize(){
        this.size = ('16px'===this.size)?'24px':'16px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            titleSize:this.size
          }
        }});
      },
      changeWeight(){
        this.weight = ('normal'===this.weight)?'bold':'normal';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          backButton:{
            titleWeight:this.weight
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
