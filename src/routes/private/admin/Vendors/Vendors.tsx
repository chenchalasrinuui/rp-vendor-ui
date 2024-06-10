"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import { clearFormData, fieldLevelValidation, formLevelValidation, setDataToForm } from '@/services/validations'
import { REG_VENDOR_GQ } from '@/services/graphql/regvendorgq'
import { Modal } from '@/reusableComponents/Modal'
import { UPDATE_VENDOR_GQ } from '@/services/graphql/updateVendorGQ'
import { DELETE_VENDOR_GS } from '@/services/graphql/deleteVendorGQ'
export const Vendors = () => {
    /**
     * Create state variables
     */
    const [formControls, setFormControls] = useState(config)
    const [showPopup, setShowPopup] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)

    const idRef = useRef()
    /**
     * Define the Query
     */
    const { loading, error, data, refetch } = useQuery(VENDORS_LIST_GQ);

    /**
     * Define Mutation
     */

    const [regVendor] = useMutation(REG_VENDOR_GQ)
    const [updateVendor] = useMutation(UPDATE_VENDOR_GQ)
    const [deleteVendor] = useMutation(DELETE_VENDOR_GS)

    /**
     * consume the context data
     */
    const { dispatch }: any = useAppContext()

    /**
     * hanlde useEffect on loading property change
     */

    useEffect(() => {
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])

    /**
     * Show popup
     */
    const handleClick = () => {
        setShowPopup(true)
    }
    /**
     * close popup
     */
    const closePopup = () => {
        clearFormData(formControls, setFormControls)
        setShowPopup(false)
        setIsEdit(false);
    }
    /**
     * Handle form input contorls changes
     * @param eve 
     */
    const handleChange = (eve: any) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }
    const fnUpdateVendor = async (dataObj: any) => {
        try {
            const result = await updateVendor({
                variables: {
                    "data": dataObj,
                    updateVendorId: idRef.current
                }
            })
            const { acknowledged, modifiedCount } = result?.data?.updateVendor;
            let toasterMessage = "Successfully Updated"
            let toasterBG = "green";
            if (!acknowledged || !modifiedCount) {
                toasterMessage = "Not Updated"
                toasterBG = "red";
            } else {
                refetch();
            }

            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: toasterMessage,
                    toasterBG: toasterBG
                }
            })


        } catch (ex) {

        }
        finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }

    const fnRegVendor = async (dataObj: any) => {
        try {

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
    /**
     * handle submit
     * @returns 
     */

    const handleFormSubmit = async () => {
        const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
        if (!isFormValid) return;
        setShowPopup(false);
        dispatch({
            type: "LOADER",
            payload: true
        })
        if (isEdit) {
            fnUpdateVendor(dataObj);
        } else {
            fnRegVendor(dataObj);
        }
    }
    /**
     * Handle edit button click inside the table
     * @param data : row object
     */
    const handleEdit = (data: any) => {
        idRef.current = data._id
        setIsEdit(true);
        setDataToForm(formControls, setFormControls, data)
        setShowPopup(true)
    }
    /***
     * Handle Delete button click inside the table
     * @param data : row object
     */
    const hanldeDelete = (data: any) => {
        idRef.current = data._id
        setIsShowModal(true);
    }
    /**
     * Hnalde modal ok and cancal button clicks
     * @param opt : modal action 
     */
    const modalActions = async (opt: string) => {
        setIsShowModal(false);
        if (opt === 'O') {
            dispatch({
                type: "LOADER",
                payload: true
            })
            try {
                const result = await deleteVendor({
                    variables: {
                        deleteVendorId: idRef.current
                    }
                })
                const { acknowledged, deletedCount } = result?.data?.deleteVendor;
                let toasterMessage = "Successfully Deleted"
                let toasterBG = "green";
                if (!acknowledged || !deletedCount) {
                    toasterMessage = "Not Deleted"
                    toasterBG = "red";
                } else {
                    refetch();
                }

                dispatch({
                    type: "TOASTER",
                    payload: {
                        isShowToaster: true,
                        toasterMessage: toasterMessage,
                        toasterBG: toasterBG
                    }
                })

            } catch (ex) {

            }
            finally {
                dispatch({
                    type: "LOADER",
                    payload: false
                })
            }
        }
    }
    return (
        <div>
            <h3 className='my-3 text-center'>Vendors</h3>
            <div className='text-end me-3 '>
                <Button text="Add Vendor" color="white" handleClick={handleClick} bgColor="black" ></Button>
            </div>
            {data && <AppTable handleEdit={handleEdit} handleDelete={hanldeDelete} isShowDelete={true} isShowEdit={true} headers={["id", "User ID", "Password", "Phone", "Address"]} data={data?.getVendors} columns={["_id", "uid", "password", "phone", "address"]} />}
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
            {isShowModal && <Modal modalActions={modalActions} />}

        </div>
    )
}
