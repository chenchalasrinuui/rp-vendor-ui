"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { VENDORS_LIST_GQ } from '@/services/graphql/vendorlistgq'
import { useAppContext } from '@/statemanagement/appContext'
import AppTable from '@/reusableComponents/AppTable/AppTable'
import Button from '@/reusableComponents/inputControls/Button'
import styles from './Vendros.module.css'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input'

export const Vendors = () => {
    const [formControls, setFormControls] = useState(config)
    const { loading, error, data } = useQuery(VENDORS_LIST_GQ)
    const [showPopup, setShowPopup] = useState(false)

    const { dispatch }: any = useAppContext()

    useEffect(() => {
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])
    const handleClick = () => {
        setShowPopup(true)
    }
    const closePopup = () => {
        setShowPopup(false)
    }
    const handleChange = () => {

    }
    return (
        <div>
            <h3 className='my-3 text-center'>Vendors</h3>
            <div className='text-end me-3 '>
                <Button text="Add Vendor" color="white" handleClick={handleClick} bgColor="black" ></Button>
            </div>
            <AppTable headers={["Name", "Location"]} data={[{ name: "n1", loc: "l1" }, { name: "n2", loc: "l2" }]} columns={["name", "loc"]} />
            {
                showPopup && <>

                    <div className={styles.popup}></div>
                    <div className='px-2 py-2'>
                        <b onClick={closePopup}>X</b>
                        <div className='mt-5'>
                            {
                                formControls.map((obj, ind) => {
                                    return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                                })
                            }
                        </div>
                    </div>

                </>
            }
        </div>
    )
}
