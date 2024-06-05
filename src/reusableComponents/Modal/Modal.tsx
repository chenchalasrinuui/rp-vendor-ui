import React from 'react'
import styles from './Modal.module.css'
export const Modal = ({ modalActions }: any) => {
    return (<>
        <div className={styles.modalMask}>

        </div>
        <div>
            <h4 className='mt-5 text-start'>Are you sure ?</h4>
            <div className='text-end mt-4'>
                <button onClick={() => modalActions("C")} className="btn btn-dark me-3">Close</button>
                <button onClick={() => modalActions("O")} className="btn btn-dark">OK</button>
            </div>
        </div>
    </>
    )
}
