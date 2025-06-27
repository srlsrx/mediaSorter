import { FolderHeart, Folder, Search } from "lucide-react"
import { Button } from "../components"
import { useSourceFolderStore } from "../stores"
import { useEffect } from "react";

const SelectFolder = ({changeView}) => {
    const {sourceFolder, setSourceFolder} = useSourceFolderStore();

    const handleFolderSelection = async () => {
        const selected = await window.electronAPI.selectFolder();
        if(selected) {
            setSourceFolder(selected);
            console.log("Folder selected:", selected);
        };
    }
    const handleScanEpisodes = () => {
        changeView('PreviewPage');
    }

    useEffect(()=>{
        window.electronAPI.setMinWindow(900, 620)
    })

    return (
        <div className="flex flex-col text-center justify-center items-center w-151 h-screen gap-4">
            <FolderHeart size={70} className="mb-3 text-blue-500" />
            <h1 className="text-4xl">MediaSorter</h1>
            <p className="text-lg mb-4">Automatically organize your TV Series episodes into their proper folders</p>

            <Button icon={<Folder />}
                className="text-white bg-blue-500"
                label="Select Source Folder"
                onClick={handleFolderSelection}
            />
            {sourceFolder && (
                <div className="w-full justify-start text-start ring ring-gray-300 bg-gray-200 rounded-md p-4">
                <p className="text-md">Selected Source Folder:</p>
                <p className="text-md font-bold italic">{sourceFolder}</p>
                </div>
            )}
            <Button
                icon={<Search />}
                className="text-white bg-green-600"
                label="Scan for Episodes"
                disabled={!sourceFolder}
                onClick={handleScanEpisodes}
            />
        </div>
    )
}

export default SelectFolder