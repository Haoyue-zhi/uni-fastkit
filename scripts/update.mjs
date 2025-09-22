#!/usr/bin/env node

/**
 * Uni-FastKit 依赖更新脚本
 * 自动更新项目的核心依赖包到最新版本
 */

import { spawn } from 'node:child_process'
import process from 'node:process'

/**
 * 需要更新的核心依赖包列表
 */
// 运行时依赖
const runtimeDependencies = [
  '@alova/adapter-uniapp',
  '@alova/shared',
  'alova',
  'pinia',
  'pinia-plugin-persistedstate',
  'radash',
  'unocss-applet',
  'wot-design-uni',
  'z-paging',
]

// 开发依赖
const devDependencies = [
  '@antfu/eslint-config',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  '@douyin-microapp/typings',
  '@iconify/json',
  '@mini-types/alipay',
  '@types/wechat-miniprogram',
  '@uni-helper/eslint-config',
  '@uni-helper/uni-app-types',
  '@uni-helper/vite-plugin-uni-components',
  '@uni-helper/vite-plugin-uni-layouts',
  '@uni-helper/vite-plugin-uni-manifest',
  '@uni-helper/vite-plugin-uni-pages',
  '@uni-ku/root',
  '@vue/tsconfig',
  'czg',
  'eslint',
  'eslint-plugin-format',
  'husky',
  'lint-staged',
  'uni-mini-router',
  'unplugin-auto-import',
  'vue-tsc',
]

// 合并依赖列表用于安装命令和统计
const dependencies = [...runtimeDependencies, ...devDependencies]

/**
 * 键盘按键的ANSI编码常量
 */
const KEYS = {
  DOWN: '\u001B\u005B\u0042', // 下箭头
  ENTER: '\u000D', // 回车键
}

/**
 * 交互式菜单处理状态标志
 */
let menuHandled = false

/**
 * 创建命令执行子进程
 */
function createUpdateProcess() {
  try {
    return spawn(
      `pnpm dlx @dcloudio/uvm@latest && pnpm up -L ${dependencies.join(' ')}`,
      {
        shell: true,
        env: { ...process.env, FORCE_COLOR: '1' },
      },
    )
  }
  catch (error) {
    console.error(`\x1B[31m[ERROR] 创建子进程失败: ${error.message}\x1B[0m`)
    process.exit(1)
  }
}

/**
 * 工具函数：创建任务队列，用于串行执行异步操作
 * @returns {object} 任务队列控制对象
 */
const taskQueue = {
  create() {
    const tasks = []

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    return {
      // 添加等待任务
      wait(ms) {
        tasks.push(() => delay(ms))
        return this
      },

      // 添加动作任务
      do(action) {
        tasks.push(action)
        return this
      },

      // 插入到队列头部
      prependWait(ms) {
        tasks.unshift(() => delay(ms))
        return this
      },

      // 执行所有任务
      async execute() {
        for (const task of tasks) {
          await task()
        }
        return this
      },
    }
  },
}

/**
 * 处理uvm工具的交互式菜单
 * @param {string} output - 子进程输出内容
 * @param {ChildProcess} subprocess - 子进程对象
 */
async function handleInteractiveMenu(output, subprocess) {
  if (menuHandled) {
    return
  }

  if (/select package manager/i.test(output)) {
    menuHandled = true

    try {
      // 模拟键盘选择：向下两次 + 回车
      await taskQueue
        .create()
        .prependWait(100)
        .do(() => subprocess.stdin.write(KEYS.DOWN))
        .wait(200)
        .do(() => subprocess.stdin.write(KEYS.DOWN))
        .wait(300)
        .do(() => subprocess.stdin.write(KEYS.ENTER))
        .execute()
    }
    catch (error) {
      console.error(`\x1B[31m[ERROR] 处理交互式菜单时出错: ${error.message}\x1B[0m`)
    }
  }
}

/**
 * 初始化并启动更新流程
 */
function initUpdateProcess() {
  console.log(`\x1B[36m[INFO] 开始更新项目依赖...\x1B[0m`)
  const subprocess = createUpdateProcess()

  // 处理子进程输出
  subprocess.stdout.on('data', (data) => {
    const output = data.toString()
    process.stdout.write(output)
    handleInteractiveMenu(output, subprocess)
  })

  // 处理子进程关闭事件
  subprocess.on('close', (code) => {
    if (code === 0) {
      console.log(`\x1B[38;2;57;185;58m[SUCCESS] 依赖更新成功！已更新以下内容：\x1B[0m`)
      console.log(`\x1B[38;2;57;185;58m- @dcloudio/uvm\x1B[0m`)

      // 打印运行时依赖（带数量统计）
      console.log(`\x1B[36m
运行时依赖 (${runtimeDependencies.length}):\x1B[0m`)
      runtimeDependencies.forEach((dep) => {
        console.log(`\x1B[38;2;57;185;58m  - ${dep}\x1B[0m`)
      })

      // 打印开发依赖（带数量统计）
      console.log(`\x1B[36m
开发依赖 (${devDependencies.length}):\x1B[0m`)
      devDependencies.forEach((dep) => {
        console.log(`\x1B[38;2;57;185;58m  - ${dep}\x1B[0m`)
      })

      console.log(`\x1B[36m
[INFO] 依赖更新流程已完成，共更新 ${dependencies.length + 1} 个包\x1B[0m`)
    }
    else {
      console.error(`\x1B[31m[ERROR] 依赖更新失败，退出码: ${code}\x1B[0m`)
    }
  })

  // 处理子进程错误事件
  subprocess.on('error', (error) => {
    console.error(`\x1B[31m[ERROR] 子进程执行错误: ${error.message}\x1B[0m`)
  })

  // 处理SIGINT信号（Ctrl+C）
  process.on('SIGINT', () => {
    console.log('\x1B[33m\n更新过程被用户中断...\x1B[0m')
    subprocess.kill()
    process.exit(0)
  })
}

// 启动更新流程
initUpdateProcess()
