import { useState } from "react";

/**
 * Custom React hook to manage the current view/state of the application.
 *
 * @param {string} [initial="SelectFolder"] - The initial view to set.
 * @returns {{ view: string, changeView: function(string): void }} An object containing the current view and a function to change the view.
 *
 * @example
 * const { view, changeView } = useViewManager("Home");
 * changeView("PreviewPage");
 * 
 * @author Nico
 */
function useViewManager(initial = "SelectFolder") {
    const [view, setView] = useState(initial);

    /**
     * Changes the current view.
     * @param {string} newView - The new view to set.
     */
    const changeView = (newView) => {
        setView(newView);
    };

    return {
        view,
        changeView,
    };
}
export default useViewManager;