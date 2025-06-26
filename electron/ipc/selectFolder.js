const { ipcMain, dialog } = require('electron');

function registerSelectFolder() {
    ipcMain.handle('select-folder', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        return result.canceled ? null : result.filePaths[0];
    });
}

module.exports = registerSelectFolder;