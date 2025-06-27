const { ipcMain } = require('electron');
const { shell } = require('electron');
const path = require('path');

function registerOpenFolder() {
    ipcMain.handle('open-folder', async (event, folderPath) => {
        try {
            await shell.openPath(path.resolve(folderPath));
        } catch (err) {
            console.error('Failed to open folder:', err);
        }
    });
}

module.exports = registerOpenFolder;