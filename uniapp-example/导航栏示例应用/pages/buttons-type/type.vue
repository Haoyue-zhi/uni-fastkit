<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeType">修改按钮类型</button>
    <button type="default" @tap="changeColor()">修改颜色</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题栏按钮内置样式',
        type: 0,
        typeValue: ['menu','forward','back','share','favorite','home','close','none'],
        color: ''
      }
    },
    onLoad() {

    },
    onNavigationBarButtonTap(e) {
      var index = e.index;
      uni.showToast({
        title:'点击了按钮'
      })
    },
    methods: {
      changeType(){
        this.type++;
        if(this.type>=this.typeValue.length){
          this.type=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          type:this.typeValue[this.type]
        });
      },
      changeColor(){
        this.color = (''===this.color)?'#FF0000':'';
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(0, {
          color:this.color
        });
      },
    }
  }
</script>

<style>

</style>
