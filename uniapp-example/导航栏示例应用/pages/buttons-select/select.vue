<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeText">修改按钮文本</button>
    <button type="default" @tap="changeWidth">修改按钮宽度</button>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="showLeft">显示按钮</button>
    <button type="default" @tap="changeLeftText">修改按钮文本</button>
    <button type="default" @tap="hideLeft">隐藏按钮</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置右侧按钮',
        title2: '设置左侧按钮',
        text: 0,
        textValues: [
          '北京市',
          '石家庄市',
          '呼和浩特市'
        ],
        width: 'auto',
        float: 'right'
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
      changeWidth(){
        this.width = ('auto'===this.width)?'48px':'auto';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          width:this.width
        });
      },
      changeLeftText(){
        this.text++;
        if(this.text>=this.textValues.length){
          this.text=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(1, {
          text:this.textValues[this.text]
        });
      },
      showLeft(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(1, {
          width:'auto' //'64px'
        });
      },
      hideLeft(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(1, {
          width:'0px'
        });
      }
    }
  }
</script>

<style>

</style>
