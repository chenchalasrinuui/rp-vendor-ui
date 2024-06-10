import React from 'react'
type propsType = {
    lbl: String,
    isRequired: boolean,
    name: any,
    placeholder?: any
    handleChange: (e: any) => void,
    error: String,
    options?: any,
    values?: any,
    lblColumns: any,
    errorMsgColumns: any,
    inputCtrlColumns: any,
    value: string
}
const Textarea = ({ value, lblColumns, errorMsgColumns, inputCtrlColumns, lbl, isRequired, name, placeholder, handleChange, error, options, values }: propsType) => {

    return (
        <div className="row mb-3">
            <div className={`col-${lblColumns} text-end`}>
                <b>{lbl} {isRequired && <span className='text-danger'>*</span>}</b>
            </div>
            <div className={`col-${inputCtrlColumns}`}>
                <textarea value={value} onChange={handleChange} name={name} placeholder={placeholder} className='form-control' ></textarea>
            </div>
            <div className={`col-${errorMsgColumns}`}>
                {error && <b className="text-danger">{error}</b>}
            </div>
        </div>
    )
}

export default Textarea
