import React from 'react'

/**
 * Custom Input component for consistent styling and behavior.
 *
 * @param {Object} props - Component props.
 * @param {string|number} props.value - The value of the input.
 * @param {string} props.type - The input type (e.g., "text", "number").
 * @param {function} props.onChange - Change event handler.
 * @param {...any} rest - Additional props passed to the input element.
 * @returns {JSX.Element} The rendered input component.
 *
 * @author Nico
 */
const Input = ({ value, type, onChange, ...rest }) => {
  return (
    <input type={type} value={value} onChange={onChange} className='ring-1 ring-gray-300 p-2 rounded-md w-full' {...rest} />
  )
}

export default Input