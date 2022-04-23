const { app, BrowserWindow } = require('electron');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

class Main {
  constructor() {
    this.mainWindow = null;
    this.addEventListners();
    this.setHotReload();
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
  
    // and load the index.html of the app.
    this.mainWindow.loadFile('index.html');
  
    // Open the DevTools.
    this.mainWindow.webContents.openDevTools();
  }

  addEventListners() {
    app.on('ready', this.createWindow);

		// Quit when all windows are closed.
		app.on('window-all-closed', function () {
			// On OS X it is common for applications and their menu bar
			// to stay active until the user quits explicitly with Cmd + Q
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		app.on('activate', function () {
			// On OS X it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (this.mainWindow === null) {
				this.createWindow();
			}
		});
  }

  setHotReload() {
    if (env === 'development') {
      require('electron-reload') (__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
      }); 
    }
  }
}

new Main();
