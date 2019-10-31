import React from "react";
import './CustomTable.less';
import {Pagination} from "antd";

const CustomTable = ({columns, dataSource, totalSize, onChangePagination}) => {

    return (
        <div className='custom-reports-table'>
            <div className='table-head'>
                {columns.map(item => (
                    <div className='th'
                         key={item.key}
                         style={{width: item.width || 'max-content'}}
                    >
                        {item.title}
                    </div>
                ))}
            </div>

            <div className='table-body'>
                {dataSource.length > 0 && dataSource.map(report => (
                    <div className='table-body__row'>
                        {columns.map(item => (
                            <div className='table-body__field'
                                 style={{width: item.width || 'max-content'}}
                                 key={item.key}
                            >
                                {item.render ? item.render(report[item.key]) : report[item.key]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {totalSize > 10 && < Pagination
                defaultCurrent={1}
                pageSize={10}
                total={totalSize}
                onChange={onChangePagination}
            />}

        </div>
    )
};

export default CustomTable;