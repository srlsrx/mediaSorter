const registerSelectFolder = require('./selectFolder.js');
const registerReadFolder = require('./readFolder.js');

function registerIpcHandlers() {
    registerSelectFolder();
    registerReadFolder();
}

module.exports = registerIpcHandlers;