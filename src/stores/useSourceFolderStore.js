/**
 * Zustand store for managing the selected source folder in the application.
 *
 * @module stores/useSourceFolderStore
 * @returns {Object} Store object with state and actions.
 * @property {string|null} sourceFolder - The currently selected source folder path.
 * @property {function(string):void} setSourceFolder - Sets the source folder path.
 * @property {function():void} clearSourceFolder - Clears the selected source folder.
 *
 * @author Nico
 */
import { create } from "zustand";

const useSourceFolderStore = create((set) => ({
    sourceFolder: null,
    setSourceFolder: (folder) => set({ sourceFolder: folder }),
    clearSourceFolder: () => set({ sourceFolder: null }),
}));

export default useSourceFolderStore;