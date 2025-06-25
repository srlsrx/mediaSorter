import React from 'react'

const Button = ({ icon, label, onClick, className, disabled }) => {
    return (
        <button className={`flex gap-4 px-6 py-3 w-full justify-center items-center rounded-md font-bold
        ${disabled
                ? 'bg-gray-400 text-white cursor-not-allowed pointer-events-none'
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}
        ${className}`} disabled={disabled} onClick={onClick}>{icon}{label}</button>
    )
}

export default Button