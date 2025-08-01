<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeText">修改图标</button>
    <button type="default" @tap="changeSize">修改大小</button>
    <button type="default" @tap="changeColor">修改颜色</button>
    <button type="default" @tap="switchDisplay">隐藏/显示按钮</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '字体图标按钮',
        text: 0,
        textValues: ['\ue63c', '\ue63f', '\ue640', '\ue641', '\ue651', '\ue655'],
        color: '',
        size: '22px',
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
        this.text++;
        if(this.text>=this.textValues.length){
          this.text=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          text:this.textValues[this.text]
        });
      },
      changeColor(){
        this.color = ('#00FF00'===this.color)?'#FF0000':'#00FF00';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          color:this.color
        });
      },
      changeSize(){
        this.size = ('22px'===this.size)?'28px':'22px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          fontSize:this.size
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
