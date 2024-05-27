import React, { useRef } from 'react'

const Pagination = ({ setPageNo, pageNo, totalPages }: any) => {

    const gotoInputRef: any = useRef();

    const handlePagination = (action: String) => {
        switch (action) {
            case 'GO':
                setPageNo(gotoInputRef.current);
                break;
            case 'Prev':
                setPageNo(pageNo - 1)
            case 'next':
                setPageNo(pageNo + 1);
                break;
        }

    }
    return (
        <div>
            <input ref={gotoInputRef} /><button onClick={() => handlePagination("GO")}>Go</button>
            <button onClick={() => handlePagination("Prev")}>Prev</button>
            {pageNo}
            <button onClick={() => handlePagination("next")}>Next</button>
            TotalPage:{totalPages}
        </div>
    )
}

export default Pagination
