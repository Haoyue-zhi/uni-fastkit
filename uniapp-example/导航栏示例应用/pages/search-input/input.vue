<template>
  <view class="content">
    <image class="logo" src="/static/home.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '点击搜索框调用5+ API打开H5搜索页面'
      }
    },
    onLoad() {

    },
    onNavigationBarSearchInputClicked(){
      if(this.wsearch){
        return;
      }
      this.wsearch = plus.webview.create('/static/search.html', 'searchinput', {
        scrollIndicator: 'none',
        backButtonAutoControl: 'close',
        titleNView: {
          autoBackButton: false,
          'padding': '5px',
          backgroundColor: '#D74B28',
          buttons: [{
            text: '取消',
            color: '#00CCCC',
            fontSize: '16px',
            width: '50px',
            onclick: 'javascript:plus.webview.currentWebview().close("none")'
          }],
          searchInput: {
            align: 'left',
            backgroundColor: '#EEEEEE',
            borderRadius: '15px',
            placeholder: '请输入搜索内容',
            placeholderColor: '#FF0000',
            autoFocus: true
          }
        }
      });
      this.wsearch.addEventListener('close', ()=>{
        this.wsearch = null;
      }, false);
      this.wsearch.show('fade-in', 300);
    },
    methods: {

    }
  }
</script>

<style>

</style>
