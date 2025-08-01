<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <view class="text-sub">
      <text class="value">{{searchText}}</text>
    </view>
    <view class="text-area">
      <text class="title">{{title2}}</text>
    </view>
    <button type="default" @tap="changePlaceholder()">修改提示文本</button>
    <button type="default" @tap="changeAlign()">修改提示文本对齐方式</button>
    <button type="default" @tap="changeColor()">修改提示文本颜色</button>
    <button type="default" @tap="changeBackgroundColor()">修改背景颜色</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '监听输入的搜索内容',
        searchText: '',
        title2: '设置搜索框样式',
        visible: true,
        bakcgroundColor: '',
        align: 0,
        alignValues: ["center","left"],
        color: ''
      }
    },
    onLoad() {

    },
    onNavigationBarButtonTap(e) {
      var index = e.index;
      uni.showToast({
        title:'点击搜索按钮'
      });
    },
    onNavigationBarSearchInputChanged(e){
      this.searchText = e.text;
    },
    onNavigationBarSearchInputConfirmed(){
      uni.showToast({
        icon:(''===this.searchText)?'none':'success',
        title:(''===this.searchText)?'搜索内容为空':'点击键盘搜索'
      });
    },
    methods: {
      changeButtonVisible(){
        this.visible = !this.visible;
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewButtonStyle(1, {
          width:this.visible?'auto':'0px'
        })
        webview.setStyle({titleNView:{
          backButton:{
            fontSize:this.size
          }
        }});
      },
      changePlaceholder() {
      	var t = this.holder?'点击搜索':'修改后的提示文本';
      	this.holder = !this.holder;
        var webview = this.$mp.page.$getAppWebview();
      	webview.setStyle({titleNView:{
          searchInput:{
            placeholder: t
          },
        }});
      },
      changeAlign() {
        this.align++;
        if(this.align>=this.alignValues.length){
          this.align = 0;
        }
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          searchInput:{
            align: this.alignValues[this.align]
          },
        }});
      },
      changeColor() {
        this.color = (''===this.color)?'#FF0000':'';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          searchInput:{
            placeholderColor: this.color
          },
        }});
      },
      changeBackgroundColor() {
        this.bakcgroundColor = (''===this.bakcgroundColor)?'#666666':'';
        var webview = this.$mp.page.$getAppWebview();
        webview.setStyle({titleNView:{
          searchInput:{
            backgroundColor: this.bakcgroundColor
          },
        }});
      }
    }
  }
</script>

<style>

</style>
