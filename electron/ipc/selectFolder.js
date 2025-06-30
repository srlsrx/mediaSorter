/**
 * Registers the IPC handler for selecting a folder using a system dialog.
 *
 * Handles the 'select-folder' IPC event, opening a dialog for the user to select a directory
 * and returning the selected folder path or null if canceled.
 *
 * @module electron/ipc/selectFolder
 * @returns {void}
 * @author Nico
 */
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