import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import styles from './AppTable.module.css'
type TableProps = {
    headers: string[],
    data: any,
    columns: string[],
    isShowEdit?: boolean,
    isShowDelete?: boolean
    handleEdit: (data: any) => void,
    handleDelete: (data: any) => void

}

const AppTable = (props: TableProps) => {

    const { headers, data, columns, isShowDelete, isShowEdit, handleDelete, handleEdit } = props;
    const [pageNo, setPageNo] = useState(1)
    const [currData, setCurrData] = useState([])
    const perPage = 5;

    useEffect(() => {
        console.log(22, data)
        const end = pageNo * perPage
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end) || [])
    }, [pageNo])


    return (
        <div className={`table-responsive ${styles.appTableRoot}`}>
            <table className={styles.appTable}>
                <thead>
                    <tr>
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
                    {
                        currData.map((obj: any, index) => {
                            return <tr key={`tr_${index}`}>
                                {
                                    columns.map((key: any, ind) => {
                                        return <td key={`td_${ind}`}>{obj[key]}</td>
                                    })
                                }
                                {isShowEdit && <td><i onClick={() => handleEdit(obj)} className="bi bi-pencil-fill"></i></td>}
                                {isShowDelete && <td><i onClick={() => handleDelete(obj)} className="bi bi-trash-fill"></i></td>}
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {data?.length > perPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />}
        </div>
    )
}

export default AppTable
