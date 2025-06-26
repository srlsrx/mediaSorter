const registerSelectFolder = require('./selectFolder.js');
const registerReadFolder = require('./readFolder.js');
const registerMoveFiles = require('./moveFiles.js');

function registerIpcHandlers() {
    registerSelectFolder();
    registerReadFolder();
    registerMoveFiles();
}

module.exports = registerIpcHandlers;