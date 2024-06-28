"use client"
import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { useLazyQuery, useQuery } from '@apollo/client'
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
import { DELETE_PRODUCT_GQL } from '@/services/graphql/deleteProductGQ'
import { AppCookie } from '@/services/cookies'
import { Modal } from '@/reusableComponents/Modal'

export const Products = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [formControls, setFormControls] = useState(config)
    const [fnGetUsers, { loading, error, data, refetch }] = useLazyQuery(PRODUCTS_LIST_GQ);
    const [saveProduct, { loading: saveProductLoading, error: saveProductError, data: saveProductData }] = useMutation(SAVE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT_GQL)

    const [isShowPopup, setIsShowPopup] = useState(false)
    const { dispatch }: any = useAppContext()
    const deleteIdRef = React.useRef();
    const isSaveRef = React.useRef(true);
    useEffect(() => {
        (async () => {
            const id = await AppCookie.getCookie("id")
            fnGetUsers({
                variables: {
                    "getProductsId": id
                }
            })
        })()
    }, [])
    useEffect(() => {
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])

    const handleEdit = (row: any) => {
        isSaveRef.current = false;
        setDataToForm(formControls, setFormControls, row)
        setIsShowPopup(true);
        console.log(row);
    }

    const handleDelete = (row: any) => {
        setIsShowModal(true);
        deleteIdRef.current = row?._id
    }

    const modalActions = async (opt: string) => {
        try {
            setIsShowModal(false);
            if (opt === 'O') {
                dispatch({
                    type: "LOADER",
                    payload: true
                })
                const res = await deleteProduct({
                    variables: {
                        "deleteProductId": deleteIdRef.current
                    }
                })
                const { acknowledged, deletedCount } = res?.data?.deleteProduct;
                let isSuccess = acknowledged && deletedCount;
                if (isSuccess) {
                    refetch();
                }
                dispatch({
                    type: "TOASTER",
                    payload: {
                        isShowToaster: true,
                        toasterMessage: isSuccess ? 'Successfully deleted' : "Not deleted",
                        toasterBG: isSuccess ? 'green' : 'red'
                    }
                })
            }
        } catch (ex) {

        } finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }
    const fnAddProduct = () => {
        isSaveRef.current = true;
        clearFormData(formControls, setFormControls)
        setIsShowPopup(true);
    }

    const fnClosePopup = () => {
        setIsShowPopup(false)
    }
    const handleSaveProduct = async (dataObj: any, id: any) => {
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
        return acknowledged && insertedId
    }
    const hanldeUpldateProduct = () => {

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
            let isSuccess;
            if (isSaveRef.current) {
                isSuccess = await handleSaveProduct(dataObj, id)
            } else {
                isSuccess = await hanldeUpldateProduct()
            }
            if (isSuccess) {
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
