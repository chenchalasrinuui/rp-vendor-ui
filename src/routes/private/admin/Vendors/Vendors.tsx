"use client"
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { VENDORS_LIST_GQ } from '@/services/graphql/vendorlistgq'
import { useAppContext } from '@/statemanagement/appContext'
import AppTable from '@/reusableComponents/AppTable/AppTable'
import Button from '@/reusableComponents/inputControls/Button'
import styles from './Vendros.module.css'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input'
import Textarea from '@/reusableComponents/inputControls/TextArea/TextArea'
import { Popup } from '@/reusableComponents/Popup/Popup'
import { fieldLevelValidation, formLevelValidation } from '@/services/validations'
import { REG_VENDOR_GQ } from '@/services/graphql/regvendorgq'
export const Vendors = () => {
    const [formControls, setFormControls] = useState(config)
    const { loading, error, data, refetch } = useQuery(VENDORS_LIST_GQ);

    const [regVendor] = useMutation(REG_VENDOR_GQ)

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
    const handleChange = (eve: any) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }
    const handleFormSubmit = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            setShowPopup(false);
            dispatch({
                type: "LOADER",
                payload: true
            })

            const result = await regVendor({
                variables: {
                    "data": dataObj
                }
            })
            const { acknowledged, insertedId } = result?.data?.registerVendor;
            let toasterMessage = "Successfully registered"
            let toasterBG = "green";
            if (!acknowledged || !insertedId) {
                toasterMessage = "Not registered"
                toasterBG = "red";
            }

            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: toasterMessage,
                    toasterBG: toasterBG
                }
            })
            refetch();

        } catch (ex) {

        }
        finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }
    return (
        <div>
            <h3 className='my-3 text-center'>Vendors</h3>
            <div className='text-end me-3 '>
                <Button text="Add Vendor" color="white" handleClick={handleClick} bgColor="black" ></Button>
            </div>
            {data && <AppTable headers={["User ID", "Password", "Phone", "Address"]} data={data?.getVendors} columns={["uid", "password", "phone", "address"]} />}
            {
                showPopup && <Popup closePopup={closePopup} handleFormSubmit={handleFormSubmit}>
                    <div className='mt-5'>
                        {
                            formControls.map((obj, ind) => {
                                switch (obj.tag) {
                                    case 'input':
                                        return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                                    case 'textarea':
                                        return <Textarea key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                                    case 'default':
                                        return <div />
                                }
                            })
                        }
                    </div>
                </Popup>


            }
        </div>
    )
}
