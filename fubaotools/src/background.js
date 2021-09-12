import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron'
import path from 'path'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, {
//   VUEJS3_DEVTOOLS
// } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

async function createWindow() {
  // 主程序窗口
  const win = new BrowserWindow({
    title: "fubaoCalc",
    // width: 280,
    // height: 350,
    width: 280,
    height: 350,
    transparent: true,
    resizable: false,
    hasShadow: false,
    // useContentSize: true,
    frame: false,
    webPreferences: {
      // process.env.ELECTRON_NODE_INTEGRATION
      //预加载函数
      preload: path.join(__dirname, '../src/electron/preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })
  /*-------------------该页面在主程序自定义事件-------------------------*/
  ipcMain.removeAllListeners() //每一次创建该窗口都要remove所有的
  ipcMain.on('window-close', () => {
    win.close();
  })
  ipcMain.on('window-minimize', () => {
    win.minimize();
  })
  ipcMain.on('window-changeAlwaysOnTop', () => {
    win.setAlwaysOnTop(!win.isAlwaysOnTop());
  })
  /*---------------------------------------------------------------*/

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  app.setName('fubaoCalc')
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