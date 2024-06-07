import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import styles from './AppTable.module.css'
type TableProps = {
    headers: String[],
    data: any,
    columns: String[]

}

const AppTable = (props: TableProps) => {

    const { headers, data, columns } = props;
    const [pageNo, setPageNo] = useState(1)
    const [currData, setCurrData] = useState([])
    const perPage = 5;

    useEffect(() => {
        const end = pageNo * perPage
        const start = end - perPage;
        setCurrData(data.slice(start, end))
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
                    </tr>
                </thead>
                <tbody>
                    {
                        currData.map((obj, index) => {
                            return <tr key={`tr_${index}`}>
                                {
                                    columns.map((key: any, ind) => {
                                        return <td key={`td_${ind}`}>{obj[key]}</td>
                                    })
                                }
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
