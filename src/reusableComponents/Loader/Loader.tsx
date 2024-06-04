import styles from './Loader.module.css'
import React from 'react'
import Image from 'next/image'
export const Loader = () => {
    return (<>
        <div className={styles.loader}>

        </div>
        <Image src="/loader.gif" alt="" width={200} height={200} />
    </>
    )
}
