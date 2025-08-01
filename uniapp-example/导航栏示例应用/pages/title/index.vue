<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeTitle()">修改标题</button>
    <button type="default" @tap="changeAlign()">修改对齐方式</button>
    <button type="default" @tap="changeColor()">修改颜色</button>
    <button type="default" @tap="changeOverflow()">修改标题超出模式</button>
    <button type="default" @tap="changeSize()">修改大小</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题',
        titleText: '长内容主标题文本主标题文本主标题文本主标题文本',
        align: 0,
        alignValues: ['center','left','auto'],
        color: '#FF0000',
        overflow: 'ellipsis',
        size: '17px'
      }
    },
    onLoad() {

    },
    methods: {
      changeTitle(){
        this.titleText = ('主标题'===this.titleText)?'长内容主标题文本主标题文本主标题文本主标题文本':'主标题';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleText:this.titleText
        }});
      },
      changeAlign(){
        this.align++;
        if(this.align>=this.alignValues.length){
          this.align=0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleAlign:this.alignValues[this.align]
        }});
      },
      changeColor(){
        this.color = ('#FF0000'===this.color)?'#00FF00':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleColor:this.color
        }});
      },
      changeOverflow(){
        this.overflow = ('ellipsis'===this.overflow)?'clip':'ellipsis';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleOverflow:this.overflow
        }});
      },
      changeSize(){
        this.size = ('17px'===this.size)?'24px':'17px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleSize:this.size
        }});
      }
    }
  }
</script>

<style>

</style>
