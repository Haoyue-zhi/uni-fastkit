#! /bin/bash
BASE_URL=$(pwd)

src_dir="$BASE_URL/src"

if [ ! -e "$src_dir/pages.json" ]; then
  touch "$src_dir/pages.json"
  cat >"$src_dir/pages.json" <<EOF
{
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8",
    "bounce": "none"
  },
  "tabBar": {
    "backgroundColor": "#ffffff",
    "borderStyle": "white",
    "color": "#ffffff",
    "selectedColor": "#ffffff",
    "list": []
  },
  "pages": [
    {
      "path": "pages/index/index",
      "type": "home",
      "style": { "navigationStyle": "custom", "navigationBarTitleText": "首页" }
    },
    {
      "path": "pages/about/index",
      "type": "page",
      "style": { "navigationBarTitleText": "关于" }
    }
  ],
  "subPackages": []
}
EOF
fi

if [ ! -e "$src_dir/manifest.json" ]; then
  touch "$src_dir/manifest.json"
  cat >"$src_dir/manifest.json" <<EOF
{
  "name": "",
  "appid": "",
  "description": "",
  "versionName": "1.0.0",
  "versionCode": "100",
  "transformPx": false,
  "app-plus": {
    "usingComponents": true,
    "nvueStyleCompiler": "uni-app",
    "compilerVersion": 3,
    "splashscreen": {
      "alwaysShowBeforeRender": true,
      "waiting": true,
      "autoclose": true,
      "delay": 0
    },
    "modules": { "Canvas": "nvue canvas" },
    "distribute": {
      "android": {
        "permissions": [
          "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
          "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
          "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CAMERA\"/>",
          "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
          "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
          "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
        ]
      },
      "ios": {},
      "sdkConfigs": {}
    }
  },
  "quickapp": {},
  "mp-weixin": {
    "appid": "",
    "setting": {
      "urlCheck": false,
      "es6": true,
      "minified": true,
      "postcss": true,
      "ignoreDevUnusedFiles": false,
      "ignoreUploadUnusedFiles": false
    },
    "usingComponents": true,
    "lazyCodeLoading": "requiredComponents",
    "darkmode": true,
    "themeLocation": "theme.json",
    "libVersion": "3.4.3"
  },
  "mp-alipay": { "usingComponents": true },
  "mp-baidu": { "usingComponents": true },
  "mp-toutiao": { "usingComponents": true },
  "uniStatistics": { "enable": false },
  "vueVersion": "3",
  "h5": { "darkmode": true, "themeLocation": "theme.json" }
}
EOF
fi

pnpm i
