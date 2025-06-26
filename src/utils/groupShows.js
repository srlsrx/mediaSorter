export function detectCommonShowNames(files) {
    // Agrupa por primer token del nombre
    const groups = {};

    files.forEach(file => {
        const tokens = file.show.split(/\s+/).filter(Boolean);
        const key = tokens[0]?.toLowerCase() || 'desconocido';
        if (!groups[key]) groups[key] = [];
        groups[key].push(file);
    });

    Object.values(groups).forEach(group => {
        if (group.length < 2) return;

        // Recogemos los tokens de todos los títulos
        const tokenLists = group.map(f => f.show.split(/\s+/).filter(Boolean));

        // Buscamos el mayor número de tokens comunes al principio
        let common = [];
        for (let i = 0; ; i++) {
            const tokenSet = new Set(tokenLists.map(tokens => tokens[i]));
            if (tokenSet.size === 1 && !tokenSet.has(undefined)) {
                common.push([...tokenSet][0]);
            } else break;
        }

        // Fallback: si no hay tokens comunes, usar el primer token como nombre
        const niceName = common.length ? common.join(' ') : group[0].show.split(/\s+/)[0];
        group.forEach(f => {
            f.show = niceName.trim()
            f.destination = `/Shows/${f.show}/Season ${f.season}`;
        });
    });

    return files;
}