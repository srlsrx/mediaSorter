export function buildDestination(show, season) {
    if (!show || !season) return '';
    return `/Shows/${show}/Season ${season}`;
}