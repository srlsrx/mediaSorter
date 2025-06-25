import { FolderHeart, Folder, Search } from "lucide-react"
import { useState } from "react"
import { Button } from "../components"

const SelectFolder = () => {
    const [sourceFolder, setSourceFolder] = useState("");

    const handleFolderSelection = () => {
        const selected = "/path/to/folder";
        setSourceFolder("/path/to/selected/folder");
        console.log("Folder selected:", selected);
    }
    return (
        <div className="flex flex-col text-center justify-center items-center w-151 h-screen gap-4">
            <FolderHeart size={70} className="mb-3 text-blue-500" />
            <h1 className="text-4xl">MediaSorter</h1>
            <p className="text-lg mb-4">Automatically organize your TV Series episodes into their proper folders</p>

            <Button icon={<Folder />}
                className="text-white"
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
                className="text-white"
                label="Scan for Episodes"
                disabled={!sourceFolder}
                onClick={handleFolderSelection}
            />
        </div>
    )
}

export default SelectFolder