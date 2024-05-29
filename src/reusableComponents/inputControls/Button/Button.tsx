import React from 'react'
import styles from './Button.module.css'
type buttonProps = {
    text: String,
    handleClick: () => void,
    bgColor: any
}
const Button = ({ text, handleClick, bgColor }: buttonProps) => {
    return (
        <div className='row'>
            <div className="offset-5 col-7">
                <button style={{ background: bgColor }} className={`btn ${styles.button}`} onClick={handleClick}>{text}</button>

            </div>
        </div>
    )
}

export default Button
