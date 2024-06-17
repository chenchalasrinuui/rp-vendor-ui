import React from 'react'
import styles from './Button.module.css'
type buttonProps = {
    text: string,
    handleClick: () => void,
    bgColor: any,
    color?: string,
    align: string
}
const Button = ({ text, handleClick, bgColor, color, align }: buttonProps) => {
    return (
        <div className='row'>
            <div className={align}>
                <button style={{ background: bgColor, color: color }} className={`btn px-3  ${styles.button}`} onClick={handleClick}>{text}</button>
            </div>
        </div>
    )
}

export default Button
