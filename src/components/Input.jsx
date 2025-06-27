import React from 'react'

const Input = ({value, type, onChange}) => {
  return (
    <input type={type} value={value} onChange={onChange} className='ring-1 ring-gray-300 p-2 rounded-md w-full' />
  )
}

export default Input