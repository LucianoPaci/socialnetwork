import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
         <div className="form-group">
                  <input 
                    type={type} 
                    className={error ? 'form-control form-control-lg is-invalid':'form-control form-control-lg'} 
                    placeholder={placeholder}
                    name={name}
                    value = {value}
                    onChange = {onChange}
                    disabled = {disabled}
                    label = {label}
                     />
                     {info && <small className = "form-text text-muted">{info}</small>}
                    {error && <div className = "invalid-feedback">{error}</div>}
                </div>
  )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup