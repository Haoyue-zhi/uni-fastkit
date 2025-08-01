<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <button type="default" @tap="setIconNetwork()">网络图标</button>
    <button type="default" @tap="setIconBase64()">base64图标</button>
    <button type="default" @tap="setIconGif()">gif图标</button>
    <button type="default" @tap="hideIcon()">隐藏图标</button>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="changeAlign()">修改对齐方式</button>
    <button type="default" @tap="changeSubtitle()">修改副标题</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '设置标题图标',
        title2: '设置标题',
        align: 'center',
        subtitle: ''
      }
    },
    onLoad() {

    },
    methods: {
      setIconNetwork(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleIcon: 'https://demo.dcloud.net.cn/helloh5/img/ui.png'
        }});
      },
      setIconBase64(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleIcon: 'data:image/png;base64,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'
        }});
      },
      setIconGif(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleIcon: '/static/loading.gif'
        }});
      },
      hideIcon(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleIcon: '',
          titleIconRadius: '',
        }});
      },
      changeAlign(){
        this.align = ('center'===this.align)?'left':'center';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          titleAlign: this.align
        }});
      },
      changeSubtitle(){
        this.subtitle = (''===this.subtitle)?'副标题':'';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          subtitleText: this.subtitle
        }});
      }
    }
  }
</script>

<style>

</style>
