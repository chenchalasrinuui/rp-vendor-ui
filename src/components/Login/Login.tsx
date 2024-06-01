import React, { useState } from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button'
import {fieldLevelValidation,formLevelValidation} from '@/services/validations'
import { LOGIN_GQ } from '@/services/graphql/logingq'
import {useLazyQuery} from '@apollo/client'

const Login =  () => {
    const [formControls, setFormControls] = useState(config)
    const [fnLogin]=useLazyQuery(LOGIN_GQ)
    const handleClick = async () => {
        const [isFormValid,dataObj]=formLevelValidation(formControls,setFormControls)
      if(!isFormValid)return;
      const res=await fnLogin({
        variables:{data:dataObj},
      })
      console.log(res)
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
