import React from 'react'
type propsType = {
    lbl: String,
    isRequired: boolean,
    type: any,
    name: any,
    placeholder: any
    handleChange: () => void,
    error: String
}
const Input = ({ lbl, isRequired, type, name, placeholder, handleChange, error }: propsType) => {
    return (
        <div className="row mb-3">
            <div className='col-5 text-end'>
                <b>{lbl} {isRequired && <span className='text-danger'>*</span>}</b>
            </div>
            <div className='col-3'>
                <input onChange={handleChange} className='form-control' type={type} name={name} placeholder={placeholder} />
            </div>
            <div className='col-4'>
                {error && <b className="text-danger">Please Enter value</b>}
            </div>
        </div>
    )
}

export default Input
