/**
 * Registers the IPC handler for moving files.
 *
 * Handles the 'move-files' IPC event, moving each file to its destination folder,
 * creating directories as needed, and returning the result for each file.
 *
 * @module electron/ipc/moveFiles
 * @returns {void}
 * @author Nico
 */
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');

function registerMoveFiles() {
    ipcMain.handle('move-files', async (event, files, basePath) => {
        const results = [];

        for (const file of files) {
            try {
                if (!file.destination) throw new Error('No destination defined');
                const fileDestination = path.join(basePath, file.destination);
                await fs.mkdir(fileDestination, { recursive: true });

                const targetPath = path.join(fileDestination, path.basename(file.path));
                await fs.rename(file.path, targetPath);

                results.push({ ...file, status: 'moved', targetPath });
            } catch (error) {
                results.push({ ...file, status: 'error', error: error.message });
            }
        }

        return results;
    });
}

module.exports = registerMoveFiles;