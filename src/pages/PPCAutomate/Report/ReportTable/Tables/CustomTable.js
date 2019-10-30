import React from "react";

const CustomTable = ({columns}) => {
    return(
        <div className='custom-reports-table'>
            <div className='table-head'>
                <div className='head-index'></div>
                {columns.map(item => (
                    <div className='th'>{item.title}</div>
                ))}
            </div>

            <div className='table-body'></div>
        </div>
    )
};

export default CustomTable;