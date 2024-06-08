import React from 'react'
import styles from './Popup.module.css'
export const Popup = ({ closePopup, handleFormSubmit, children }: any) => {
    return <>
        <div className={styles.popup}></div>
        <div className='py-2 container-fluid'>
            <b onClick={closePopup}>X</b>
            <div>
                {children}
            </div>

            <button onClick={handleFormSubmit}>Submit</button>
        </div>
    </>
}
