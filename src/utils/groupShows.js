/**
 * Detects common show names among a list of files and normalizes them.
 * Groups files by the first token of the show name, finds the longest common prefix,
 * and updates each file's show and destination properties accordingly.
 *
 * @param {Array<Object>} files - Array of file objects with at least 'show' and 'season' properties.
 * @returns {Array<Object>} The updated array of file objects with normalized show names and destinations.
 *
 * @author Nico
 */
export function detectCommonShowNames(files) {
    const groups = {};

    files.forEach(file => {
        const tokens = file.show.split(/\s+/).filter(Boolean);
        const key = tokens[0]?.toLowerCase() || 'desconocido';
        if (!groups[key]) groups[key] = [];
        groups[key].push(file);
    });

    Object.values(groups).forEach(group => {
        if (group.length < 2) return;

        const tokenLists = group.map(f => f.show.split(/\s+/).filter(Boolean));

        let common = [];
        for (let i = 0; ; i++) {
            const tokenSet = new Set(tokenLists.map(tokens => tokens[i]));
            if (tokenSet.size === 1 && !tokenSet.has(undefined)) {
                common.push([...tokenSet][0]);
            } else break;
        }

        const niceName = common.length ? common.join(' ') : group[0].show.split(/\s+/)[0];
        group.forEach(f => {
            f.show = niceName.trim()
            f.destination = `/Shows/${f.show}/Season ${f.season}`;
        });
    });

    return files;
}