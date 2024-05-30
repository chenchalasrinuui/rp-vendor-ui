import React, { useState } from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button'
const Login = () => {
    const [formControls, setFormControls] = useState(config)
    const handleClick = () => {
        const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
        clonedFormControl.forEach((obj: any) => {
            if (!obj.value) {
                obj.error = "Enter value"
            }
        })
        setFormControls(clonedFormControl)
    }

    const handleChange = (eve: any) => {
        const { name, value } = eve.target;
        const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
        const inputControlObj: any = clonedFormControl.find((obj: any) => {
            return obj.name === name;
        })
        inputControlObj.value = value;
        inputControlObj.error = ""
        if (!inputControlObj.value) {
            inputControlObj.error = "Enter value"
        }
        setFormControls(clonedFormControl)
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
