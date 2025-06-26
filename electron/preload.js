const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
    moveFiles: (files, basePath) => ipcRenderer.invoke('move-files', files, basePath),
});