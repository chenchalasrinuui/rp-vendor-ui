import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import styles from './AppTable.module.css'
import Image from 'next/image';
type TableProps = {
    headers: string[],
    data: any,
    columns: string[],
    isShowEdit?: boolean,
    isShowDelete?: boolean
    handleEdit: (data: any) => void,
    handleDelete: (data: any) => void,
    hasImage?: boolean,
    imageHeaders?: any,
    imageColumns?: any

}

const AppTable = (props: TableProps) => {

    const { hasImage, imageHeaders, imageColumns, headers, data, columns, isShowDelete, isShowEdit, handleDelete, handleEdit } = props;

    const [pageNo, setPageNo] = useState(1)
    const [currData, setCurrData] = useState([])
    const perPage = 5;

    useEffect(() => {
        const end = pageNo * perPage
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end) || [])
    }, [pageNo, data])


    return (
        <div className={`table-responsive ${styles.appTableRoot}`}>
            <table className={styles.appTable}>
                <thead>
                    <tr>
                        {
                            hasImage &&
                            imageHeaders.map((value: any, index: number) => {
                                return <th key={`th_${index}`}>{value}</th>
                            })

                        }
                        {
                            headers.map((value, index) => {
                                return <th key={`th_${index}`}>{value}</th>
                            })
                        }
                        {isShowEdit && <th>Edit</th>}
                        {isShowDelete && <th>Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {currData.length > 0 ?

                        currData.map((obj: any, index) => {
                            return <tr key={`tr_${index}`}>
                                {
                                    hasImage && imageColumns.map((key: any, ind: any) => {
                                        return <td key={`td_${ind}`}><Image alt="image" src={`http://localhost:4000${obj[key]}?${new Date().getTime()}`} width="100" height="100" /></td>
                                    })
                                }
                                {
                                    columns.map((key: any, ind) => {
                                        return <td key={`td_${ind}`}>{obj[key]}</td>
                                    })
                                }
                                {isShowEdit && <td><i onClick={() => handleEdit(obj)} className="bi bi-pencil-fill"></i></td>}
                                {isShowDelete && <td><i onClick={() => handleDelete(obj)} className="bi bi-trash-fill"></i></td>}
                            </tr>
                        })
                        :
                        <tr><td colSpan={columns.length + 2} className='text-center'>No data found</td></tr>
                    }
                </tbody>
            </table>
            {data?.length > perPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />}
        </div>
    )
}

export default AppTable
