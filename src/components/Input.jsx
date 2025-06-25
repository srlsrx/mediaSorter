import React from 'react'

const Input = ({value, type}) => {
  return (
    <input type={type} value={value} className='border-1 border-gray-300 p-2 rounded-md w-full' />
  )
}

export default Input