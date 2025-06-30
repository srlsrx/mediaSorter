import React from 'react'

/**
 * Custom Button component for consistent styling and behavior.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.icon] - Optional icon to display before the label.
 * @param {string} props.label - Button text label.
 * @param {function} props.onClick - Click event handler.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @returns {JSX.Element} The rendered button component.
 *
 * @author Nico
 */
const Button = ({ icon, label, onClick, className, disabled }) => {
    const baseClasses = 'flex gap-4 px-6 py-3 w-full justify-center items-center rounded-md font-bold';
    const disabledClasses = 'bg-gray-400 text-white cursor-not-allowed pointer-events-none';
    const activeClasses = `${className} cursor-pointer`;

    return (
        <button
            className={`${baseClasses} ${disabled ? disabledClasses : activeClasses}`}
            disabled={disabled}
            onClick={onClick}>
            {icon}{label}
        </button>
    )
}

export default Button