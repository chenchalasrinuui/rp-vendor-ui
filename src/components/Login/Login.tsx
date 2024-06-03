import React, { useState } from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button'
import {fieldLevelValidation,formLevelValidation} from '@/services/validations'
import { LOGIN_GQ } from '@/services/graphql/logingq'
import {useLazyQuery} from '@apollo/client'
import { AppCookie } from '@/services/cookies'
import { useAppContext } from '@/statemanagement/appContext'
const Login =  () => {
    const [formControls, setFormControls] = useState(config)
    const {dispatch}:any=useAppContext();
    const [fnLogin]=useLazyQuery(LOGIN_GQ)
    const handleClick = async () => {
    try{
        const [isFormValid,dataObj]=formLevelValidation(formControls,setFormControls)
      if(!isFormValid)return;
      const res=await fnLogin({
        variables:{data:dataObj},
      })
      const {login} =res?.data
      if(login){
         const {role,token,uid}=login
         AppCookie.setCookies("token",token)
         AppCookie.setCookies("role",role)
         AppCookie.setCookies("uid",uid)
         dispatch({
            type:"LOGIN",
            payload:true
         })
      }else{
        alert("check ented uid and pwd")
      }

    }catch(ex){
        console.error("Login.tsx", ex)
    }
    }

    const handleChange = (eve: any) => {
       fieldLevelValidation(eve,formControls,setFormControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                formControls.map((obj, ind) => {
                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                })
            }
            <Button text="Login" handleClick={handleClick} bgColor="white" />
        </div>
    )
}

export default Login
