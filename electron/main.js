// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = app.isPackaged ? false : true;
const registerIpcHandlers = require('./ipc/index.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        minWidth: 900,
        height: 800,
        minHeight: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    const startURL = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
    createWindow();
    registerIpcHandlers(mainWindow);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});