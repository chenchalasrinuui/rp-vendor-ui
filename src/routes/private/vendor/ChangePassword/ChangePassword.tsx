"use client"
import React, { useState } from 'react'
import styles from './ChangePassword.module.css'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input'
import { CHANGE_PWD_GQ } from '@/services/graphql/chagePwdGQ'
import { formLevelValidation, fieldLevelValidation, clearFormData } from '@/services/validations'
import { useMutation } from '@apollo/client'
import { AppCookie } from '@/services/cookies'
import { useAppContext } from '@/statemanagement/appContext'

export const ChangePassword = () => {
    const [formControls, setFormControls] = useState(config)
    const [fnChangePwd] = useMutation(CHANGE_PWD_GQ);
    const { dispatch }: any = useAppContext()
    const handleClick = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            dispatch({
                type: "LOADER",
                payload: true
            })
            const id = await AppCookie.getCookie("id")
            const res = await fnChangePwd({
                variables: {
                    "currPwd": dataObj?.currPassword,
                    "newPwd": dataObj?.password,
                    "changePasswordId": id
                }
            })
            const { acknowledged, modifiedCount } = res?.data?.changePassword
            const isSuccess = acknowledged && modifiedCount
            if (isSuccess) {
                clearFormData(formControls, setFormControls)
            }
            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: isSuccess ? 'Successfully Saved' : "Not Saved",
                    toasterBG: isSuccess ? 'green' : 'red'
                }
            })

        } catch (ex) {
            console.error("Login.tsx", ex)
        } finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }

    const handleChange = (eve: any) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-4'>Change Password</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <div className='text-center'>
                <button onClick={handleClick} className='btn btn-primary'>Change Password</button>
            </div>
        </div>
    )
}
