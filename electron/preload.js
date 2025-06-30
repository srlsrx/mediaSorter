/**
 * Preload script for Electron.
 * Exposes a secure API to the renderer process using contextBridge.
 *
 * Provides methods for folder selection, reading, moving files, opening folders,
 * and window management by communicating with the main process via IPC.
 *
 * @module electron/preload
 * @author Nico
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    /**
     * Opens a dialog to select a folder.
     * @returns {Promise<string>} The selected folder path.
     */
    selectFolder: () => ipcRenderer.invoke('select-folder'),

    /**
     * Reads the contents of a folder.
     * @param {string} folderPath - The path of the folder to read.
     * @returns {Promise<Array>} The contents of the folder.
     */
    readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),

    /**
     * Moves files to a destination.
     * @param {Array} files - The files to move.
     * @param {string} basePath - The base path for moving files.
     * @returns {Promise<any>} The result of the move operation.
     */
    moveFiles: (files, basePath) => ipcRenderer.invoke('move-files', files, basePath),

    /**
     * Opens a folder in the system file explorer.
     * @param {string} folderPath - The path of the folder to open.
     * @returns {Promise<void>}
     */
    openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),

    /**
     * Maximizes the application window.
     * @returns {Promise<void>}
     */
    maximizeWindow: () => ipcRenderer.invoke('maximize-window'),

    /**
     * Sets the minimum window size.
     * @param {number} widht - The minimum width.
     * @param {number} height - The minimum height.
     * @returns {Promise<void>}
     */
    setMinWindow: (widht, height) => ipcRenderer.invoke('set-min-window', widht, height),
});