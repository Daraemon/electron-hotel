'use strict'

import { app, protocol, BrowserWindow, ipcMain, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { LoginConfig, LayoutConfig } from './window/window-config'
const isDevelopment = process.env.NODE_ENV !== 'production'
const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`;
let win: BrowserWindow;

// 自定义菜单的配置
const templateCustom: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
  {
    label: 'app', // macOS下第一个标签是应用程序名字，此处设置无效
    submenu: [
      {label: '关于', role: 'about'},
      {
        label: '退出当前账号',
        click: () => {
          createWindow()
        }
      },
      {label: '退出APP', role: 'quit'},
    ]
  },
  {
    label: '编辑',
    submenu: [
      {label: '撤销', role: 'undo'},
      {label: '恢复', role: 'redo'},
      {type: 'separator'},
      {label: '剪切', role: 'cut'},
      {label: '复制', role: 'copy'},
      {label: '粘贴', role: 'paste'},
      {type: 'separator'},
      {label: '全选', role: 'selectAll'}
    ]
  }
]
const customMenu = Menu.buildFromTemplate(templateCustom)
Menu.setApplicationMenu(customMenu)

// 监听同步消息
ipcMain.on('login-message', (event, arg) => {
  createLayoutWindow()
})

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建主窗口
async function createLayoutWindow() {
  win && win.destroy()
  win = new BrowserWindow(LayoutConfig)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(baseURL+'/#/layout')
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // Load the index.html when not in development
    win.loadURL(baseURL+'/#/layout')
  }
  // 防止白屏闪烁
  win.once('ready-to-show', () => {
    win.show()
  })

  // 显示退出账号
  const menu = Menu.getApplicationMenu()
  Menu.getApplicationMenu().items[0].submenu.items[1].visible = true;
}

async function createWindow() {
  win && win.destroy()
  // Create the browser window.
  win = new BrowserWindow(LoginConfig)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(baseURL+'/#/login')
  }
  // 防止白屏闪烁
  win.once('ready-to-show', () => {
    win.show()
  })
  // 隐藏退出账号
  const menu = Menu.getApplicationMenu()
  Menu.getApplicationMenu().items[0].submenu.items[1].visible = false;
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createLayoutWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
