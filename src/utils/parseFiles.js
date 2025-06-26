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
        };
    });
}

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