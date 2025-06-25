import { useState } from "react";

function useViewManager(initial="SelectFolder") {
    const [view, setView] = useState(initial);

    const changeView = (newView) => {
        setView(newView);
    };

    return {
        view,
        changeView,
    };
}
export default useViewManager;