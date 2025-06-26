import { create } from "zustand";

const useSourceFolderStore = create((set) => ({
    sourceFolder: null,
    setSourceFolder: (folder) => set({ sourceFolder: folder }),
    clearSourceFolder: () => set({ sourceFolder: null }),
}));

export default useSourceFolderStore;