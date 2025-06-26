import { Button, Input } from "../components";
import { useState, useEffect } from "react";
import { Info, CircleCheckBig, ChevronLeft } from "lucide-react";
import { useSourceFolderStore } from "../stores"
import { classifyFiles } from "../utils/parseFiles";
import { detectCommonShowNames } from "../utils/groupShows";
import { buildDestination } from "../utils/buildDestination";

const PreviewPage = ({ changeView }) => {
    const { sourceFolder } = useSourceFolderStore();
    const [files, setFiles] = useState([])
    const [needsAtention, setNeedsAttention] = useState(false);
    const [loading, setLoading] = useState(true);
    const invalidCount = files.filter(file => !file.detected).length;
    const showInvalidCount = invalidCount > 99 ? '99+' : invalidCount;
    const sortedFiles = [...files].sort((a, b) => {
        if (!a.show) return 1;
        if (!b.show) return -1;
        return a.show.localeCompare(b.show);
    });

    const handleInputChange = (index, field, value) => {
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const updatedFile = { ...updatedFiles[index], [field]: value };

            if (["show", "season"].includes(field)) {
                updatedFile.destination = buildDestination(updatedFile.show, updatedFile.season);
            }

            updatedFile.detected = false;
            updatedFiles[index] = updatedFile;
            return updatedFiles;
        });
    };

    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            try {
                const rawFiles = await window.electronAPI.readFolder(sourceFolder);
                const classifiedFiles = classifyFiles(rawFiles);
                const commonNames = detectCommonShowNames(classifiedFiles);
                console.log("Common show names detected:", commonNames); // Debugging line
                setFiles(commonNames);
                setLoading(false);
            } catch (error) {
                console.error("Error loading files:", error);
            }
        }
        if (sourceFolder) {
            loadFiles();
        } else {
            console.warn("No source folder selected");
        }
    }, [sourceFolder]);

    useEffect(() => {
        const anyInvalid = files.some(file => file.detected === false);
        setNeedsAttention(anyInvalid);
    }, [files]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <p className="text-lg mb-4">Scanning folder...</p>
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <button className="flex gap-3 cursor-pointer" onClick={() => { changeView("SelectFolderPage") }}>{<ChevronLeft />}Back</button>
                <h1 className="text-2xl font-bold">Classification Preview</h1>
                <p className="text-sm">{files.length} file(s) found • {files.length - invalidCount} ready to process</p>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-100 border-b-1 border-t-1 border-gray-300">
                        <tr>
                            <th className="p-2 text-start w-1/4">Filename</th>
                            <th className="p-2 text-start w-1/6">Show</th>
                            <th className="p-2 text-start w-1/10">Season</th>
                            <th className="p-2 text-start w-1/10">Episode</th>
                            <th className="p-2 text-start w-1/4">Destination</th>
                            <th className="p-2 text-start w-1/6">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFiles.map((file, index) => (
                            <tr key={index} className="border-b-1 border-gray-300 text-sm">
                                <td className="px-2 py-4 max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis" title={file.name}>
                                    {file.name}
                                </td>
                                <td className="px-2 py-4"><Input type="text" onChange={(e) => handleInputChange(index, "show", e.target.value)} value={file.show} /></td>
                                <td className="px-2 py-4"><Input type="number" onChange={(e) => handleInputChange(index, "season", Number(e.target.value))} value={file.season} /></td>
                                <td className="px-2 py-4"><Input type="number" onChange={(e) => handleInputChange(index, "episode", Number(e.target.value))} value={file.episode} /></td>
                                <td className="px-2 py-4">{file.destination || 'Not set'}</td>
                                <td className="px-2 py-4">
                                    {file.detected ? (
                                        <span className="text-green-600 flex gap-1">{<CircleCheckBig />}Auto-Detected</span>
                                    ) : (
                                        <span className="text-red-600 flex gap-1">{<Info />}Not Detected</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-around items-center">
                {needsAtention ? (
                    <p className="flex gap-2 flex-4/2 text-red-700">{<Info />}{`${showInvalidCount} file(s) need manual input`}</p>
                ) : (
                    <p className="text-md">All files are ready to be organized.</p>
                )}
                <Button
                    className="text-white bg-green-600"
                    label="Confirm and Move Files"
                    onClick={() => console.log("Organizing files...")}
                />
            </div>
        </div>
    )
}

export default PreviewPage