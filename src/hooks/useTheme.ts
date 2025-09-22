import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { dark, light } from '@/theme.json'

/**
 * 主题色选项接口
 */
export interface ThemeColorOption {
  name: string
  value: string
  primary: string
}

/**
 * 主题类型
 */
export type ThemeMode = 'light' | 'dark'

/**
 * 预定义的主题色选项
 */
const themeColorOptions: ThemeColorOption[] = [
  { name: '默认蓝', value: 'blue', primary: '#4D7FFF' },
  { name: '活力橙', value: 'orange', primary: '#FF7D00' },
  { name: '薄荷绿', value: 'green', primary: '#07C160' },
  { name: '樱花粉', value: 'pink', primary: '#FF69B4' },
  { name: '紫罗兰', value: 'purple', primary: '#8A2BE2' },
  { name: '朱砂红', value: 'red', primary: '#FF4757' },
]

const theme = ref<'light' | 'dark'>('light')
const followSystem = ref(true)// 是否跟随系统主题
const hasUserSet = ref(true) // 用户是否手动设置过主题
const currentThemeColor = ref(themeColorOptions[0])
const themeVars = ref<ConfigProviderThemeVars>({
  darkBackground: '#0f0f0f',
  darkBackground2: '#1a1a1a',
  darkBackground3: '#242424',
  darkBackground4: '#2f2f2f',
  darkBackground5: '#3d3d3d',
  darkBackground6: '#4a4a4a',
  darkBackground7: '#606060',
  darkColor: '#ffffff',
  darkColor2: '#e0e0e0',
  darkColor3: '#a0a0a0',
  colorTheme: themeColorOptions[0]!.primary,
})

const isDark = computed(() => theme.value === 'dark')

function transformColor(color: string) {
  if (color === 'black') {
    return '#000000'
  }
  if (color === 'white') {
    return '#ffffff'
  }
}

export function useTheme(vars?: ConfigProviderThemeVars) {
  // 主题色选择器
  const showThemeColorSheet = ref(false)

  vars && (themeVars.value = vars)

  /**
   * 打开主题色选择器
   */
  function openThemeColorPicker() {
    showThemeColorSheet.value = true
  }

  /**
   * 关闭主题色选择器
   */
  function closeThemeColorPicker() {
    showThemeColorSheet.value = false
  }

  /**
   * 选择主题色
   * @param option 主题色选项
   */
  function selectThemeColor(option: ThemeColorOption) {
    setCurrentThemeColor(option)
    closeThemeColorPicker()
  }

  /**
   * 设置主题色
   * @param color 主题色选项
   */
  function setCurrentThemeColor(color: ThemeColorOption) {
    currentThemeColor.value = color
    themeVars.value.colorTheme = color.primary
  }

  /**
   * 设置导航栏颜色
   */
  function setNavigationBarColor() {
    uni.setNavigationBarColor({
      frontColor: theme.value === 'light' ? transformColor(light.navTxtStyle) : transformColor(dark.navTxtStyle),
      backgroundColor: theme.value === 'light' ? light.navBgColor : dark.navBgColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn',
      },
    })
  }

  /**
   * 设置底部导航栏颜色
   */
  function setTabBarStyle() {
    uni.setTabBarStyle({
      backgroundColor: theme.value === 'light' ? light.tabBgColor : dark.tabBgColor,
    })
  }

  /**
   * 手动切换主题
   * @param mode 指定主题模式，不传则自动切换
   */
  function toggleTheme(mode?: ThemeMode) {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
    hasUserSet.value = true // 标记用户已手动设置
    followSystem.value = false // 不再跟随系统
    setNavigationBarColor()
    setTabBarStyle()
    const systemTheme = getSystemTheme()
    console.log('🚀 -------- systemTheme:', systemTheme)
  }

  /**
   * 设置是否跟随系统主题
   * @param follow 是否跟随系统
   */
  function setFollowSystem(follow: boolean) {
    followSystem.value = follow
    if (follow) {
      hasUserSet.value = false
      initTheme() // 重新获取系统主题
    }
  }

  /**
   * 获取系统主题
   * @returns 系统主题模式
   */
  function getSystemTheme(): ThemeMode {
    try {
      // #ifdef MP-WEIXIN
      // 微信小程序使用 getAppBaseInfo
      const appBaseInfo = uni.getAppBaseInfo()
      if (appBaseInfo && appBaseInfo.theme) {
        return appBaseInfo.theme as ThemeMode
      }
      // #endif

      // #ifndef MP-WEIXIN
      // 其他平台使用 getSystemInfoSync
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo && systemInfo.theme) {
        return systemInfo.theme as ThemeMode
      }
      // #endif
    }
    catch (error) {
      console.warn('获取系统主题失败:', error)
    }
    return 'light' // 默认返回 light
  }

  /**
   * 初始化主题
   */
  function initTheme() {
    // 如果用户已手动设置且不跟随系统，保持当前主题
    if (hasUserSet.value && !followSystem.value) {
      console.log('使用用户设置的主题:', theme)
      setNavigationBarColor()
      setTabBarStyle()
      return
    }

    // 获取系统主题
    const systemTheme = getSystemTheme()

    // 如果是首次启动或跟随系统，使用系统主题
    if (!hasUserSet.value || followSystem.value) {
      theme.value = systemTheme
      if (!hasUserSet.value) {
        followSystem.value = true
        console.log('首次启动，使用系统主题:', theme.value)
      }
      else {
        console.log('跟随系统主题:', theme.value)
      }
    }

    setNavigationBarColor()
    setTabBarStyle()
  }

  function themeChangeCallBack(res: { theme: ThemeMode }) {
    if (followSystem.value) {
      toggleTheme(res.theme as ThemeMode)
    }
  }

  // 组件挂载前初始化主题
  onBeforeMount(() => {
    initTheme()
    // 监听系统主题变化
    if (typeof uni !== 'undefined' && uni.onThemeChange) {
      uni.onThemeChange(themeChangeCallBack)
    }
  })

  // 页面显示时更新导航栏颜色，确保每次切换页面时导航栏颜色都是正确的
  onShow(() => {
    setNavigationBarColor()
    setTabBarStyle()
  })

  // 组件卸载时清理监听
  onUnmounted(() => {
    if (typeof uni !== 'undefined' && uni.offThemeChange) {
      uni.offThemeChange(themeChangeCallBack)
    }
  })

  return {
    theme,
    followSystem,
    hasUserSet,
    currentThemeColor,
    themeVars,
    isDark,
    showThemeColorSheet,

    toggleTheme,
    openThemeColorPicker,
    selectThemeColor,
    setCurrentThemeColor,
    setFollowSystem,
  }
}
