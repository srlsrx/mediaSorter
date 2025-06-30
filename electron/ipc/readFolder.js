/**
 * Registers the IPC handler for reading the contents of a folder.
 *
 * Handles the 'read-folder' IPC event, returning an array of file objects
 * with name, extension, and path for each file in the specified folder.
 *
 * @module electron/ipc/readFolder
 * @returns {void}
 * @author Nico
 */
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