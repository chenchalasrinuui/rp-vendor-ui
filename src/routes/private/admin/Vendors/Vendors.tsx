"use client"
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { VENDORS_LIST_GQ } from '@/services/graphql/vendorlistgq'
import { useAppContext } from '@/statemanagement/appContext'

export const Vendors = () => {

    const { loading, error, data } = useQuery(VENDORS_LIST_GQ)
    const { dispatch }: any = useAppContext()
    useEffect(() => {
        console.log('data', data)
        console.log('error', error)
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])

    return (
        <div>Vendors...</div>
    )
}
