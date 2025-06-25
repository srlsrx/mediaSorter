import React from 'react'

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