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