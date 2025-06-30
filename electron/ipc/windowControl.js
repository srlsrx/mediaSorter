/**
 * Registers IPC handlers for window control actions.
 *
 * Handles 'set-min-window' and 'maximize-window' IPC events to control the Electron window size and state.
 *
 * @module electron/ipc/windowControl
 * @param {BrowserWindow} mainWindow - The main Electron BrowserWindow instance.
 * @returns {void}
 * @author Nico
 */
const { ipcMain } = require('electron');

function registerWindowControlHandler(mainWindow) {
    ipcMain.handle('set-min-window', (event, widht, height) => {
        if (mainWindow) {
            mainWindow.setSize(widht, height);
            mainWindow.center();
        }
    });
    ipcMain.handle('maximize-window', () => {
        if (mainWindow) {
            mainWindow.maximize();
        }
    });
}

module.exports = { registerWindowControlHandler };