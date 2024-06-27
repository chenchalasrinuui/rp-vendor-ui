"use client"
import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { useQuery } from '@apollo/client'
import { PRODUCTS_LIST_GQ } from '@/services/graphql/productsListGQ'
import { useAppContext } from '@/statemanagement/appContext'
import AppTable from '@/reusableComponents/AppTable/AppTable'
import Button from '@/reusableComponents/inputControls/Button'
import { Popup } from '@/reusableComponents/Popup/Popup'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input'
import { clearFormData, fieldLevelValidation, formLevelValidation, setDataToForm } from '@/services/validations'
import { useMutation } from '@apollo/client'
import { SAVE_PRODUCT } from '@/services/graphql/saveProductGQ'
import { AppCookie } from '@/services/cookies'
import { Modal } from '@/reusableComponents/Modal'

export const Products = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [formControls, setFormControls] = useState(config)
    const { loading, error, data, refetch } = useQuery(PRODUCTS_LIST_GQ)
    const [saveProduct, { loading: saveProductLoading, error: saveProductError, data: saveProductData }] = useMutation(SAVE_PRODUCT)
    const [isShowPopup, setIsShowPopup] = useState(false)
    const { dispatch }: any = useAppContext()

    useEffect(() => {
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])

    const handleEdit = (row: any) => {
        setDataToForm(formControls, setFormControls, row)
        setIsShowPopup(true);
        console.log(row);
    }

    const handleDelete = (row: any) => {
        setIsShowModal(true);
    }
    const modalActions = async (opt: string) => {
        setIsShowModal(false);
        if (opt === 'O') {
            dispatch({
                type: "LOADER",
                payload: true
            })

        }
    }
    const fnAddProduct = () => {
        setIsShowPopup(true);
    }

    const fnClosePopup = () => {
        setIsShowPopup(false)
    }
    const handleSubmit = async () => {
        try {
            const [isFormValid, dataObj] = formLevelValidation(formControls, setFormControls)
            if (!isFormValid) return;
            setIsShowPopup(false)
            dispatch({
                type: "LOADER",
                payload: true
            })
            const id = await AppCookie.getCookie("id")
            const res = await saveProduct({
                variables: {
                    "file": dataObj.path,
                    "product": {
                        "cost": Number(dataObj.cost),
                        "name": dataObj.name,
                        "path": "",
                        "uid": id
                    }
                }
            })
            const { acknowledged, insertedId } = res?.data?.saveProduct
            let isSuccess = false
            if (acknowledged && insertedId) {
                isSuccess = true;
                refetch();
            }
            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: isSuccess ? 'Successfully Saved' : "Not Saved",
                    toasterBG: isSuccess ? 'green' : 'red'
                }
            })
        } catch (ex) {
            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: "Something went wrong",
                    toasterBG: 'red'
                }
            })
        } finally {

            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }
    const handleChange = (eve: any) => {
        fieldLevelValidation(eve, formControls, setFormControls)
    }
    return (
        <div className='container-fluid mt-3'>

            <Button align='text-end' text="ADD PRODUCT" handleClick={fnAddProduct} bgColor="black" color="white" />
            {data && <AppTable
                headers={["Name", "Cost"]}
                data={[...data?.getProducts]}
                columns={["name", "cost"]}
                isShowDelete={true}
                isShowEdit={true}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                hasImage={true}
                imageHeaders={["Photo"]}
                imageColumns={['path']}

            />}
            {isShowPopup && <Popup closePopup={fnClosePopup} handleFormSubmit={handleSubmit}>
                <div className='mt-5'>
                    {
                        formControls.map((obj, ind) => {
                            return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                        })
                    }
                </div>
            </Popup>
            }
            {isShowModal && <Modal modalActions={modalActions} />}

        </div>
    )
}
