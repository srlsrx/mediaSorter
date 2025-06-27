import { Button, Input } from "../components";
import { useState, useEffect } from "react";
import { Info, CircleCheckBig, ChevronLeft, Check } from "lucide-react";
import { useSourceFolderStore } from "../stores"
import { classifyFiles } from "../utils/parseFiles";
import { detectCommonShowNames } from "../utils/groupShows";
import { buildDestination } from "../utils/buildDestination";

const PreviewPage = ({ changeView, setMovedFiles }) => {
    const { sourceFolder } = useSourceFolderStore();
    const [files, setFiles] = useState([])
    const [needsAtention, setNeedsAttention] = useState(false);
    const [loading, setLoading] = useState(true);
    const invalidCount = files.filter(file => !file.detected).length;
    const showInvalidCount = invalidCount > 99 ? '99+' : invalidCount;

    const handleInputChange = (index, field, value) => {
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const currentFile = updatedFiles[index];
            const currentValue = currentFile[field];

            if (currentValue === value) {
                return prevFiles;
            }

            const updatedFile = { ...currentFile, [field]: value, lastModified: Date.now() };

            if (["show", "season"].includes(field)) {
                updatedFile.destination = buildDestination(updatedFile.show, updatedFile.season);
            }

            if (updatedFile.show && updatedFile.season > 0 && updatedFile.episode > 0) {
                updatedFile.detected = true;
                updatedFile.modified = true;
            } else {
                updatedFile.detected = false;
                updatedFile.modified = false;
            }

            
            updatedFiles[index] = updatedFile;
            return updatedFiles;
        });
    };

    const handleMoveFiles = async () => {
        try {
            const basePath = sourceFolder;
            const movedFiles = await window.electronAPI.moveFiles(files, basePath);
            console.log("Files moved successfully:", movedFiles);
            setFiles(movedFiles);
            setMovedFiles(movedFiles);
            changeView("ResultPage");
        } catch (error) {
            console.error("Error moving files:", error);
        }
    };

    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            try {
                const rawFiles = await window.electronAPI.readFolder(sourceFolder);
                const classifiedFiles = classifyFiles(rawFiles);
                const commonNames = detectCommonShowNames(classifiedFiles);
                console.log("Common show names detected:", commonNames); // Debugging line
                commonNames.sort((a, b) => {
                    if (!a.show) return 1;
                    if (!b.show) return -1;
                    const showCompare = a.show.localeCompare(b.show);
                    if (showCompare !== 0) return showCompare;

                    const seasonCompare = (Number(a.season) || 0) - (Number(b.season) || 0);
                    if (seasonCompare !== 0) return seasonCompare;

                    return (Number(a.episode) || 0) - (Number(b.episode) || 0);
                });
                setFiles(commonNames);
                setTimeout(() => setLoading(false), 500);
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
                    <thead className="bg-gray-100 border-b border-t-1 border-gray-400">
                        <tr className="border-b border-gray-300 text-gray-700">
                            <th className="p-2 text-start w-[25%]">Filename</th>
                            <th className="p-2 text-start w-[16.666%]">Show</th>
                            <th className="p-2 text-start w-[10%]">Season</th>
                            <th className="p-2 text-start w-[10%]">Episode</th>
                            <th className="p-2 text-start w-[25%]">Destination</th>
                            <th className="p-2 text-start w-[16.666%]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={file.name} className="border-b-1 border-gray-300 bg-gray-100 odd:bg-white text-sm">
                                <td className="px-2 py-4 max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis" title={file.name}>
                                    {file.name}
                                </td>
                                <td className="px-2 py-4"><Input type="text" defaultValue={file.show} onChange={(e) => handleInputChange(index, "show", e.target.value)}/></td>
                                <td className="px-2 py-4"><Input type="number" defaultValue={Number(file.season)} min={0} step={1} onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }} onChange={(e) => handleInputChange(index, "season", Number(e.target.value))}/></td>
                                <td className="px-2 py-4"><Input type="number" defaultValue={Number(file.episode)} min={0} step={1} onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }} onChange={(e) => handleInputChange(index, "episode", Number(e.target.value))}/></td>
                                <td className="px-2 py-4">{file.destination || 'Not set'}</td>
                                <td className="px-2 py-4">
                                    {file.modified ? (
                                        <span className="text-yellow-600 flex gap-1">{<Info />}Modified</span>
                                    ) : file.detected ? (
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
                    <p className="flex gap-2 flex-[200%] text-red-700">{<Info />}{`${showInvalidCount} file(s) need manual input`}</p>
                ) : (
                    <p className="flex gap-2 flex-[200%] text-green-600">{<Check/>}All files are ready to be organized.</p>
                )}
                <Button
                    className="text-white bg-green-600"
                    label="Confirm and Move Files"
                    onClick={() => handleMoveFiles()}
                />
            </div>
        </div>
    )
}

export default PreviewPage