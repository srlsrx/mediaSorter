import { useState } from "react"
import { CircleCheckBig, Folder, TriangleAlert, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "../components";

const ResultPage = ({changeView}) => {
    const [loading, setLoading] = useState(true);
    const contentClass = "flex-grow px-10 pb-10 overflow-y-auto gap-10";

    return (
        <div className="w-screen h-screen flex flex-col justify-between overflow-hidden">
            <div className={contentClass}>
                <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <CircleCheckBig size={90} className="text-green-600 mt-10" />
                    <h1 className="text-3xl">Files Organized Successfully</h1>
                    <p className="text-xl mb-7 mt-3">files have been moved to their proper locations.</p>
                </div>
                <hr className="mb-6"/>
                <h2 className="flex gap-3 font-bold text-lg mb-4">{<Folder className="text-blue-500"/>} Processed Files</h2>
                <div className="flex flex-col gap-2 bg-gray-100 rounded-md p-4 min-h-70 overflow-y-auto max-h-[40vh]">
                    <ul className="list-disc pl-5 italic">
                        <li>Breaking Bad - S01E01 - Pilot.mkv</li>
                        <li>Breaking Bad - S01E02 - Cat’s in the Bag.mkv</li>
                        <li>Breaking Bad - S01E03 - ...And the Bag’s in the River.mkv</li>
                        <li>Breaking Bad - S02E01 - Seven Thirty-Seven.mkv</li>
                        <li>Breaking Bad - S02E02 - Grilled.mkv</li>
                        <li>Breaking Bad - S02E03 - Bit by a Dead Bee.mkv</li>
                        <li>Unknown File - unknown_file.mp4</li>
                        <li>Breaking Bad - S01E01 - Pilot.mkv</li>
                        <li>Breaking Bad - S01E02 - Cat’s in the Bag.mkv</li>
                        <li>Breaking Bad - S01E03 - ...And the Bag’s in the River.mkv</li>
                        <li>Breaking Bad - S02E01 - Seven Thirty-Seven.mkv</li>
                        <li>Breaking Bad - S02E02 - Grilled.mkv</li>
                        <li>Breaking Bad - S02E03 - Bit by a Dead Bee.mkv</li>
                        <li>Unknown File - unknown_file.mp4</li>
                    </ul>
                </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-md flex justify-between items-center">
                <button className="flex gap-3 flex-grow min-w-sm items-center cursor-pointer" onClick={() => changeView("PreviewPage")}>
                    <ChevronLeft />Back to preview
                </button>
                <div className="flex gap-4">
                    <Button label={"View Destination Folder"} icon={<ExternalLink />} className={"bg-blue-500 text-white min-w-90"} />
                    <Button label={"Back to Start"} className={"bg-gray-800 text-white min-w-[12rem]"} />
                </div>
            </div>
        </div>
    )
}

export default ResultPage