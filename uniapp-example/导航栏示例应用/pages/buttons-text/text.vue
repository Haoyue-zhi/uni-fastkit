<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeText">修改按钮文字内容</button>
    <button type="default" @tap="changeSize">修改按钮文字大小</button>
    <button type="default" @tap="changeWeight">修改按钮文字粗细</button>
    <button type="default" @tap="changeColor">修改按钮文字颜色</button>
    <button type="default" @tap="switchDisplay">隐藏/显示按钮</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏按钮',
        text: '按钮',
        size: '16px',
        color: '',
        weight: 'normal',
        display: true
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
      changeText(){
        this.text = ('按钮'===this.text)?'中国加油':'按钮';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          text:this.text
        });
      },
      changeSize(){
        this.size = ('16px'===this.size)?'24px':'16px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          fontSize:this.size
        });
      },
      changeWeight(){
        this.weight = ('normal'===this.weight)?'bold':'normal';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          fontWeight:this.weight 
        });
      },
      changeColor(){
        this.color = ('#00FF00'===this.color)?'#FF0000':'#00FF00';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          color:this.color
        });
      },
      switchDisplay(){
        this.display = !this.display;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          width:this.display?'auto':'0px'
        });
      }
    }
  }
</script>

<style>
  
</style>
