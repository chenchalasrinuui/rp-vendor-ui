import React from 'react'
import styles from './Button.module.css'
type buttonProps = {
    text: string,
    handleClick: () => void,
    bgColor: any,
    color?: string
}
const Button = ({ text, handleClick, bgColor, color }: buttonProps) => {
    return (
        <div className='row'>
            <div className="offset-5 col-7">
                <button style={{ background: bgColor, color: color }} className={`btn px-3  ${styles.button}`} onClick={handleClick}>{text}</button>
            </div>
        </div>
    )
}

export default Button
