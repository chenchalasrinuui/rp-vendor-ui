import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
type TableProps = {
    headers: String[],
    data: [],
    columns: String[]

}

const AppTable = (props: TableProps) => {

    const { headers, data, columns } = props;
    const [pageNo, setPageNo] = useState(1)
    const [currData, setCurrData] = useState([])
    const perPage = 10;

    useEffect(() => {
        const end = pageNo * perPage
        const start = end - perPage;
        setCurrData(data.slice(start, end))
    }, [pageNo])


    return (
        <div>
            <table>
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
            <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />
        </div>
    )
}

export default AppTable
