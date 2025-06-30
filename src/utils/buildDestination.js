/**
 * Builds the destination path for a media file based on show and season.
 *
 * @param {string} show - The name of the show.
 * @param {string|number} season - The season number.
 * @returns {string} The destination path for the file.
 *
 * @author Nico
 */
export function buildDestination(show, season) {
    if (!show || !season) return '';
    return `/Shows/${show}/Season ${season}`;
}