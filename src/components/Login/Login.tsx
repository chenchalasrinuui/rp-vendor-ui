import React, { useState } from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button'
import {fieldLevelValidation,formLevelValidation} from '@/services/validations'

const Login = () => {
    const [formControls, setFormControls] = useState(config)
    const handleClick = () => {
        const [isFormValid,dataObj]=formLevelValidation(formControls,setFormControls)
      if(!isFormValid)return;
      alert('sending request to server...')
      console.log(dataObj)
    }

    const handleChange = (eve: any) => {
       fieldLevelValidation(eve,formControls,setFormControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input {...obj} handleChange={handleChange} />
                })
            }
            <Button text="Login" handleClick={handleClick} bgColor="white" />
        </div>
    )
}

export default Login
