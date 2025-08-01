import { spawn } from 'node:child_process'
import process from 'node:process'

const dependencies = [
  '@alova/adapter-uniapp',
  '@alova/shared',
  '@tailwindcss/vite',
  'alova',
  'radash',
  'tailwindcss',
  'weapp-tailwindcss',
  'wot-design-uni',
  'z-paging',
  '@types/wechat-miniprogram',
  '@uni-helper/eslint-config',
  '@uni-helper/uni-app-types',
  '@uni-helper/vite-plugin-uni-components',
  '@uni-helper/vite-plugin-uni-layouts',
  '@uni-helper/vite-plugin-uni-manifest',
  '@uni-helper/vite-plugin-uni-pages',
  'uni-mini-router',
  'unplugin-auto-import',
].join(' ')

// 方向键和回车键的ANSI编码
const KEYS = {
  DOWN: '\u001B\u005B\u0042', // 下
  ENTER: '\u000D', // 回车
}

let menuHandled = false

const subprocess = spawn(`pnpm dlx @dcloudio/uvm@latest && pnpm up ${dependencies}`, { stdio: ['pipe', 'pipe', 'inherit'], shell: true, env: { ...process.env, FORCE_COLOR: '1' } })

subprocess.stdout.on('data', async (data) => {
  const output = data.toString()
  process.stdout.write(output)
  handleInteractiveMenu(output)
})

subprocess.on('close', () => {
  console.log(`\x1B[48;2;57;185;58m@dcloudio and ${dependencies} have been updated successfully!!!\x1B[0m`)
})

subprocess.on('error', (error) => {
  console.error(`\x1B[31mError: ${error}\x1B[0m`)
})

function arrange() {
  const tasks = []

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function wait(ms) {
    tasks.push(() => delay(ms))
    return this
  }

  function doSomething(action) {
    tasks.push(action)
    return this
  }

  async function execute() {
    for (const task of tasks) {
      await task()
    }
    return this
  }

  function waitFirst(ms) {
    tasks.unshift(() => delay(ms))
    return this
  }

  return {
    do: doSomething,
    wait,
    execute,
    waitFirst,
  }
}

async function handleInteractiveMenu(output) {
  if (menuHandled)
    return

  if (/select package manager/i.test(output)) {
    menuHandled = true

    // 模拟键盘选择：向下两次 + 回车
    arrange()
      .waitFirst(100)
      .do(() => subprocess.stdin.write(KEYS.DOWN))
      .wait(200)
      .do(() => subprocess.stdin.write(KEYS.DOWN))
      .wait(300)
      .do(() => subprocess.stdin.write(KEYS.ENTER))
      .execute()
  }
}
