<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="changeTitle()">修改主标题</button>
    <button type="default" @tap="changeAlign()">修改对齐方式</button>
    <button type="default" @tap="changeSubtitle()">修改副标题</button>
    <button type="default" @tap="changeColor()">修改副标题颜色</button>
    <button type="default" @tap="changeOverflow()">修改副标题超出模式</button>
    <button type="default" @tap="changeSize()">修改副标题大小</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题&副标题',
        titleText: '主标题',
        subText: '副标题内容',
        align: 'center',
        color: '#000000',
        overflow: 'ellipsis',
        size: '12px'
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
        this.align = ('center'===this.align)?'left':'center';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleAlign:this.align
        }});
      },
      changeSubtitle(){
        this.subText = ('副标题内容'===this.subText)?'长内容副标文字副标文字副标文字副标文字副标文字副标文字副标文字':'副标题内容';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          subtitleText:this.subText
        }});
      },
      changeColor(){
        this.color = ('#FF0000'===this.color)?'#00FF00':'#FF0000';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          subtitleColor:this.color
        }});
      },
      changeOverflow(){
        this.overflow = ('ellipsis'===this.overflow)?'clip':'ellipsis';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          subtitleOverflow:this.overflow
        }});
      },
      changeSize(){
        this.size = ('12px'===this.size)?'17px':'12px';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          subtitleSize:this.size
        }});
      }
    }
  }
</script>

<style>

</style>
