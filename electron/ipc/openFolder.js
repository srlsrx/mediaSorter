/**
 * Registers the IPC handler for opening a folder in the system file explorer.
 *
 * Handles the 'open-folder' IPC event, opening the specified folder path using Electron's shell module.
 *
 * @module electron/ipc/openFolder
 * @returns {void}
 * @author Nico
 */
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