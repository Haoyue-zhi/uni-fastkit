#!/usr/bin/env node

/**
 * Uni-FastKit 依赖更新脚本
 * 自动更新项目的核心依赖包到最新版本
 */

import { spawn } from 'node:child_process'
import process from 'node:process'

const filtList = [
  '@dcloudio/*',
  '@vue/runtime-core',
  'vue',
  'sass',
  'unocss',
]

/**
 * 创建命令执行子进程
 */
function createProcess(instruct = [], stdio = 'inherit') {
  try {
    const child = spawn(
      'pnpm',
      ['exec', ...instruct],
      {
        cwd: process.cwd(),
        stdio,
      },
    )

    return new Promise((resolve, reject) => {
      child.on('error', reject)
      child.on('close', resolve)
    })
  }
  catch (error) {
    console.error(`\x1B[31m[ERROR] 创建子进程失败: ${error.message}\x1B[0m`)
    process.exit(1)
  }
}

async function createNormalUpdateProcess() {
  try {
    const code = await createProcess(['ncu', '-i', '--format', 'group', '-x', filtList.join(' ')])
    if (code !== 0) {
      console.error(`\x1B[31m[ERROR] 依赖更新失败，退出码: ${code}\x1B[0m`)
    }
    else {
      console.log(`\x1B[32m[SUCCESS] 依赖更新成功！\x1B[0m`)
    }
  }
  catch (error) {
    console.log(`\x1B[31m[ERROR] 子进程执行错误: ${error.message}\x1B[0m`)
  }
}

async function createCoreUpdateProcess() {
  console.log(`\x1B[36m[INFO] 开始更新@dcloudio依赖...\x1B[0m`)
  try {
    const code = await createProcess(['uni-fastkit-uvm'])
    if (code !== 0) {
      console.error(`\x1B[31m[ERROR] 依赖更新失败，退出码: ${code}\x1B[0m`)
    }
    else {
      console.log(`\x1B[32m[SUCCESS] @dcloudio依赖更新成功！\x1B[0m`)
    }
  }
  catch (error) {
    console.log(`\x1B[31m[ERROR] 子进程执行错误: ${error.message}\x1B[0m`)
  }
}

/**
 * 初始化并启动更新流程
 */
async function initUpdateProcess() {
  await createNormalUpdateProcess()
  await createCoreUpdateProcess()

  // 处理SIGINT信号（Ctrl+C）
  process.on('SIGINT', () => {
    console.log('\x1B[33m\n更新过程被用户中断...\x1B[0m')
    process.exit(0)
  })
}

// 启动更新流程
initUpdateProcess()
