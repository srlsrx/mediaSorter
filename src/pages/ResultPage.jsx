/**
 * ResultPage component displays the result after files have been organized.
 * Shows a summary, a list of processed files, and actions to view the destination folder or return to the start.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.changeView - Function to change the current view/page.
 * @param {Array<Object>} props.movedFiles - Array of moved file objects.
 * @returns {JSX.Element} The rendered result page.
 *
 * @author Nico
 */
import { useEffect } from "react"
import { CircleCheckBig, Folder, ExternalLink } from "lucide-react";
import { Button } from "../components";
import { useSourceFolderStore } from "../stores";

const ResultPage = ({ changeView, movedFiles }) => {
    const contentClass = "flex-grow px-10 pb-10 overflow-y-auto gap-10";
    const { sourceFolder } = useSourceFolderStore();

    const handleBackToStart = () => {
        changeView("SelectFolderPage");
    }
    const handleViewDestination = () => {
        window.electronAPI.openFolder(sourceFolder + "/Shows");
    }

    useEffect(() => {
        window.electronAPI.setMinWindow(900, 800);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-between overflow-hidden">
            <div className={contentClass}>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <CircleCheckBig size={90} className="text-green-600 mt-10" />
                    <h1 className="text-3xl">Files Organized Successfully</h1>
                    <p className="text-xl mb-7 mt-3">files have been moved to their proper locations.</p>
                </div>
                <hr className="mb-6" />
                <h2 className="flex gap-3 font-bold text-lg mb-4">{<Folder className="text-blue-500" />} Processed Files</h2>
                <div className="flex flex-col gap-2 bg-gray-100 rounded-md p-4 min-h-70 overflow-y-auto max-h-[40vh]">
                    <ul className="list-disc pl-5 italic">
                        {movedFiles.length > 0 ? movedFiles.map((file, index) => (
                            <li key={index} className="text-gray-800">{file.name} — T{file.season}E{file.episode} — {file.destination}</li>
                        )) : (
                            <li className="text-gray-500">No files were moved.</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-md flex justify-between items-center">
                <div className="flex justify-between items-center gap-4 w-full">
                    <Button label={"View Destination Folder"} onClick={handleViewDestination} icon={<ExternalLink />} className={"bg-blue-500 text-white min-w-90"} />
                    <Button label={"Back to Start"} onClick={handleBackToStart} className={"bg-gray-800 text-white min-w-[12rem]"} />
                </div>
            </div>
        </div>
    )
}

export default ResultPage