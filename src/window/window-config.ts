import { BrowserWindowConstructorOptions} from 'electron'
import path from 'path'

// Login窗口配置
export const LoginConfig: BrowserWindowConstructorOptions = {
  // width: 260,
  // height: 320,
  width: 400,
  height: 300,
  frame: false,
  // titleBarStyle: 'hidden',
  webPreferences:  {
    // 开启node环境
    nodeIntegration: true,
    // 开启在渲染进程中能够使用 remote模块
    enableRemoteModule: true,
    // 透明边框，可拖拽区域设置
    preload: path.resolve(__dirname, './preload.js')
  },
}

// layout窗口配置
export const LayoutConfig: BrowserWindowConstructorOptions = {
  minWidth: 800,
  minHeight: 600,
  // fullscreen: true,
  webPreferences:  {
    // 开启node环境
    nodeIntegration: true,
    // 开启在渲染进程中能够使用 remote模块
    enableRemoteModule: true
  },
}
