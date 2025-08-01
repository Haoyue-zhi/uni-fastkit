<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <view class="text-sub">
      <text class="value">{{searchText}}</text>
    </view>
    <button type="default" @tap="resetSearchText()">清空搜索内容</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '搜索框自动获取焦点并弹出软键盘',
        searchText: ''
      }
    },
    onLoad() {
      var webview = this.$mp.page.$getAppWebview();
      webview.setTitleNViewSearchInputText('默认搜索内容');
    },
    onNavigationBarButtonTap(e) {
      uni.showToast({
        title:'点击搜索按钮'
      });
    },
    onNavigationBarSearchInputChanged(e){
      this.searchText = e.text;
    },
    onNavigationBarSearchInputConfirmed(){
      uni.showToast({
        title:'点击搜索按钮'
      });
    },
    methods: {
      resetSearchText(){
        var webview = this.$mp.page.$getAppWebview();
        webview.setTitleNViewSearchInputText('');
      }
    }
  }
</script>

<style>

</style>
