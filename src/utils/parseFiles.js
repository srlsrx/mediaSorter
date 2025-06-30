/**
 * Classifies media files by extracting show name, season, and episode from filenames.
 * Adds detection status and destination path for each file.
 *
 * @param {Array<Object>} files - Array of file objects with at least 'name' and 'extension' properties.
 * @returns {Array<Object>} Array of classified file objects with show, season, episode, destination, detected, and modified properties.
 *
 * @author Nico
 */
export function classifyFiles(files) {
    const videoExtensions = ['.mkv', '.mp4', '.avi', '.mov'];
    files = files.filter(file => videoExtensions.includes(file.extension.toLowerCase()));

    return files.map(file => {
        const match = file.name.match(/(?:S?(\d{1,2})[xE](\d{1,2})|[^a-zA-Z](\d{1,2})[^a-zA-Z](\d{2}))/i);

        const season = match
            ? parseInt(match[1] || match[3], 10)
            : 0;
        const episode = match
            ? parseInt(match[2] || match[4], 10)
            : 0;

        let show = inferShowName(file.name);
        let detected = Boolean(match && show && !/[[(]/.test(show));
        let modified = false;
        let finalSeason = season;
        let finalEpisode = episode;

        if (!detected) {
            const fallbackMatch = file.name.match(/(?:^|\D)(\d{1,3})(?!.*\d)/);
            const episodeStr = fallbackMatch?.[1];

            const isPotentialFalsePositive = /\[.*?cap\.?\d{3,}.*?\]/i.test(file.name) || /cap\.?\d{3,}/i.test(file.name);

            if (fallbackMatch && !isPotentialFalsePositive) {
                finalSeason = 1;
                finalEpisode = parseInt(episodeStr, 10);
                detected = true;
                const episodePattern = new RegExp(`[\\s_\\-\\.]?${episodeStr}(?!\\d)`);
                show = inferShowName(file.name.replace(episodePattern, ''));
            }
        }

        return {
            ...file,
            show,
            season: finalSeason,
            episode: finalEpisode,
            destination: detected ? `/Shows/${show}/Season ${finalSeason}` : '',
            detected,
            modified,
        };
    });
}

/**
 * Infers the show name from a filename by removing extension, brackets, parentheses, and episode/season patterns.
 *
 * @param {string} filename - The name of the file.
 * @returns {string} The inferred show name.
 *
 * @author Nico
 */
function inferShowName(filename) {
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '');
    const cleanedName = nameWithoutExtension
        .replace(/\[.*?\]/g, '')
        .replace(/\(.*?\)/g, '')
        .replace(/[-_.]/g, ' ')
        .trim();
    const nameBeforeSeason = cleanedName.split(/S?\d{1,2}[xE]\d{1,2}|[^a-zA-Z](\d{1,2})[^a-zA-Z](\d{2})/i)[0];
    return nameBeforeSeason.replace(/\d{1,3}$/, '').trim();
}