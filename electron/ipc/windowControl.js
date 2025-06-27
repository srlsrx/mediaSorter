const { ipcMain } = require('electron');

function registerWindowControlHandler(mainWindow) {
    ipcMain.handle('set-min-window', () => {
        if (mainWindow) {
            mainWindow.setSize(900, 620);
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