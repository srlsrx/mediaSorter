/**
 * Central export and registration file for Electron IPC handlers.
 *
 * Registers all IPC handlers for folder selection, reading, moving files,
 * opening folders, and window controls.
 *
 * @module electron/ipc/index
 * @param {BrowserWindow} mainWindow - The main Electron BrowserWindow instance.
 * @author Nico
 */

const registerSelectFolder = require('./selectFolder.js');
const registerReadFolder = require('./readFolder.js');
const registerMoveFiles = require('./moveFiles.js');
const registerOpenFolder = require('./openFolder.js');
const { registerWindowControlHandler } = require('./windowControl.js');

function registerIpcHandlers(mainWindow) {
    registerSelectFolder();
    registerReadFolder();
    registerMoveFiles();
    registerOpenFolder();
    registerWindowControlHandler(mainWindow);
}

module.exports = registerIpcHandlers;