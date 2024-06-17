import React, { useEffect, useState } from 'react'
import styles from './Popup.module.css'
export const Popup = ({ closePopup, handleFormSubmit, children }: any) => {
    const [right, setRight] = useState(-400)
    useEffect(() => {
        setRight(0)
    }, [])
    return <>
        <div className={styles.popup}></div>
        <div style={{ right }} className='py-2 container-fluid'>
            <b onClick={closePopup}>X</b>
            <div>
                {children}
            </div>

            <button onClick={handleFormSubmit}>Submit</button>
        </div>
    </>
}
