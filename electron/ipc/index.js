const registerSelectFolder = require('./selectFolder.js');

function registerIpcHandlers() {
    registerSelectFolder();
}

module.exports = registerIpcHandlers;