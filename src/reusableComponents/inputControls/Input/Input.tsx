import React from 'react'
type propsType = {
    lbl: String,
    isRequired: boolean,
    type: any,
    name: any,
    placeholder?: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    options?:any,
    values?:any
}
const Input = ({ lbl, isRequired, type, name, placeholder, handleChange, error,options,values }: propsType) => {
     const fnPrepareInputControls=()=>{
        switch(type){
            case 'text':
            case 'password':
                return <input onChange={handleChange} className='form-control' type={type} name={name} placeholder={placeholder} />
            case 'radio':
                return <> 
                {
                 options.map((opt:any ,ind:any)=>{
                    return <><input onChange={handleChange} type={type} name={name} value={values[ind]}/><span className="ms-2 me-4">{opt}</span></>
                })
            }
                </>
            case 'checkbox':
                return <div></div>
            default:
                return <div></div>  
        }
     }
    return (
        <div className="row mb-3">
            <div className='col-5 text-end'>
                <b>{lbl} {isRequired && <span className='text-danger'>*</span>}</b>
            </div>
            <div className='col-3'>
                {fnPrepareInputControls()}
            </div>
            <div className='col-4'>
                {error && <b className="text-danger">{error}</b>}
            </div>
        </div>
    )
}

export default Input
