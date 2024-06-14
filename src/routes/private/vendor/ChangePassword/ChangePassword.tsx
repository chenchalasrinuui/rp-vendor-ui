"use client"
import React, { useState } from 'react'
import styles from './ChangePassword.module.css'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input'
import Button from '@/reusableComponents/inputControls/Button'
import { formLevelValidation, fieldLevelValidation } from '@/services/validations'
export const ChangePassword = () => {
    const [formControls, setFormControls] = useState(config)
    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;

        } catch (ex) {
            console.error("Login.tsx", ex)
        } finally {

        }
    }

    const handleChange = (eve: any) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }
    return (
        <div>
            <h3 className='text-center my-4'>Change Password</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <Button text="Change Password" handleClick={handleClick} bgColor="white" />
        </div>
    )
}
