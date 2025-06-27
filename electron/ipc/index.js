const registerSelectFolder = require('./selectFolder.js');
const registerReadFolder = require('./readFolder.js');
const registerMoveFiles = require('./moveFiles.js');
const registerOpenFolder = require('./openFolder.js');
const {registerWindowControlHandler} = require('./windowControl.js');

function registerIpcHandlers(mainWindow) {
    registerSelectFolder();
    registerReadFolder();
    registerMoveFiles();
    registerOpenFolder();
    registerWindowControlHandler(mainWindow);
}

module.exports = registerIpcHandlers;