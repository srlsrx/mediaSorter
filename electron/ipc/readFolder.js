const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function registerReadFolder() {
    ipcMain.handle('read-folder', async (event, folderPath) => {
        try {
            const files = await fs.promises.readdir(folderPath);
            const filesData = files.map(file => {
                const ext = path.extname(file);
                return {
                    name: file,
                    extension: ext,
                    path: path.join(folderPath, file),
                };
            });
            return filesData;
        } catch (error) {
            console.error('Error reading folder:', error);
            return [];
        }
    })
};

module.exports = registerReadFolder;