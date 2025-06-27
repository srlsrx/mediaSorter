const registerSelectFolder = require('./selectFolder.js');
const registerReadFolder = require('./readFolder.js');
const registerMoveFiles = require('./moveFiles.js');
const registerOpenFolder = require('./openFolder.js');

function registerIpcHandlers() {
    registerSelectFolder();
    registerReadFolder();
    registerMoveFiles();
    registerOpenFolder();
}

module.exports = registerIpcHandlers;