const {
    contextBridge,
    ipcRenderer,
    dialog
} = require('electron')
const fs = require('fs')

contextBridge.exposeInMainWorld('Electron', {
    desktop: true,
    hello: true,
    file: function () {
        console.log(fs);
    },
    /*-------------窗口事件--------------- */
    // 关闭该窗口
    closeALL() {
        ipcRenderer.send('window-close');
    },
    //最小化窗口
    minimize() {
        ipcRenderer.send('window-minimize');
    },
    //使程序一直在顶部
    changeAlwaysOnTop() {
        ipcRenderer.send('window-changeAlwaysOnTop');
    },
    /*---------------------------------- */
    /*-------------弹框事件--------------- */
    dialog: () => dialog
})