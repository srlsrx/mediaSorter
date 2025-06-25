import { Button, Input } from "../components";
import { useState, useEffect, useMemo } from "react";
import { Info, CircleCheckBig, ChevronLeft } from "lucide-react";

const PreviewPage = ({ changeView }) => {
    const [needsAtention, setNeedsAttention] = useState(false);
    const [loading, setLoading] = useState(true);
    const files = useMemo(() => [
        { name: 'S01E01 - Pilot.mkv', show: 'Breaking Bad', season: 1, episode: 1, destionation: "/Series/Braking Bad/Season 1", detected: true },
        { name: 'S01E02 - Cat’s in the Bag.mkv', show: 'Breaking Bad', season: 1, episode: 2, destionation: "/Series/Braking Bad/Season 1", detected: true },
        { name: 'S01E03 - ...And the Bag’s in the River.mkv', show: 'Breaking Bad', season: 1, episode: 3, destionation: "/Series/Braking Bad/Season 1", detected: true },
        { name: 'S02E01 - Seven Thirty-Seven.mkv', show: 'Breaking Bad', season: 2, episode: 1, destionation: "/Series/Braking Bad/Season 2", detected: true },
        { name: 'S02E02 - Grilled.mkv', show: 'Breaking Bad', season: 2, episode: 2, destionation: "/Series/Braking Bad/Season 2", detected: true },
        { name: 'S02E03 - Bit by a Dead Bee.mkv', show: 'Breaking Bad', season: 2, episode: 3, destionation: "/Series/Braking Bad/Season 2", detected: true },
        { name: 'unknown_file.mp4', show: '', season: '', episode: '', destionation: "", detected: false }
    ], []);
    const invalidCount = files.filter(file => !file.detected).length;
    const showInvalidCount = invalidCount > 99 ? '99+' : invalidCount;

    useEffect(() => {
        const anyInvalid = files.some(file => file.detected === false);
        setNeedsAttention(anyInvalid);
    }, [files]);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5 segundos

        return () => clearTimeout(timer);
    }, []);

    const handleScan = async () => {
        setLoading(true);
        try {
            // tu lógica para escanear carpeta
        } finally {
            setLoading(false);
        }
    };
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
                        {files.map((file, index) => (
                            <tr key={index} className="border-b-1 border-gray-300 text-sm">
                                <td className="px-2 py-4">{file.name}</td>
                                <td className="px-2 py-4"><Input type="text" value={file.show} /></td>
                                <td className="px-2 py-4"><Input type="number" value={file.season} /></td>
                                <td className="px-2 py-4"><Input type="number" value={file.episode} /></td>
                                <td className="px-2 py-4">{file.destionation || 'Not set'}</td>
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