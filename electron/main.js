/**
 * Main Electron process file.
 * Sets up the main application window and handles app lifecycle events.
 *
 * - Creates the main BrowserWindow with preload script and security settings.
 * - Loads the React app in development or production mode.
 * - Registers IPC handlers for communication between main and renderer processes.
 * - Handles window and application lifecycle events.
 *
 * @module electron/main
 * @author Nico
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = app.isPackaged ? false : true;
const registerIpcHandlers = require('./ipc/index.js');

let mainWindow;

/**
 * Creates the main application window.
 */
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        minWidth: 900,
        height: 620,
        minHeight: 620,
        show: false,
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

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
    });

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