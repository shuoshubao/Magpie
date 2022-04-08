# ipcMain

- ipcMain.on(channel, listener)
- ipcMain.once(channel, listener)
- ipcMain.removeListener(channel, listener)
- ipcMain.removeAllListeners([channel])
- ipcMain.handle(channel, listener)

# ipcRenderer

- ipcRenderer.on(channel, listener)
- ipcRenderer.once(channel, listener)
- ipcRenderer.removeListener(channel, listener)
- ipcMain.removeAllListeners([channel])
- ipcRenderer.send(channel, ...args)
- ipcRenderer.invoke(channel, ...args)
- ipcRenderer.sendSync(channel, ...args)
- ipcRenderer.postMessage(channel, message, [transfer])
- ipcRenderer.sendTo(webContentsId, channel, ...args)
- ipcRenderer.sendToHost(channel, ...args)
