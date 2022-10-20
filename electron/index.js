const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

app.on('ready', () => {
	createWindow()
	app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

const createWindow = () => {
	fs.readFile(path.join(__dirname, '../assets/mainGameConfig.json'), (error, mainGameConfig) => {
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				//nodeIntegration: true
			}
		})
		win.webContents.send("read-file", mainGameConfig.toString());
		win.loadFile(path.join(__dirname, '../index.html'))
	})
}


ipcMain.on('save', (event, data) => console.log('save: ', data) )