import React from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button'
const Login = () => {
    const handleClick = () => { }

    const handleChange = () => {

    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            {
                config.map((obj, ind) => {
                    return <Input {...obj} handleChange={handleChange} />
                })
            }
            <Button text="Login" handleClick={handleClick} bgColor="white" />
        </div>
    )
}

export default Login
