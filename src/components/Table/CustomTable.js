import React, {Fragment} from 'react';
import {Pagination, Spin, Select} from 'antd';
import shortid from 'shortid';

import './CustomTable.less';

const Option = Select.Option;

const pageSizeOptions = ['10', '50', '100', '200'];

const CustomTable = ({
                         columns,
                         dataSource,
                         totalSize,
                         onChangePagination,
                         currentPage,
                         loading,
                         heightTabBtn,
                         pageSize,
                         showSizeChanger = false
                     }) => {
    return (
        <div
            className="custom-table"
            style={{height: `calc(100% - ${heightTabBtn}px`}}
        >
            <div className="table-overflow">
                <div className="table-head">
                    {columns.map(item => (
                        <div
                            className="th"
                            key={shortid.generate()}
                            style={item.width ? {width: item.width} : {flex: 1}}
                        >
                            {typeof item.title === 'function' ? item.title() : item.title}
                        </div>
                    ))}
                </div>

                <div className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map(report => (
                            <div className="table-body__row" key={shortid.generate()}>
                                {columns.map(item => (
                                    <div
                                        className="table-body__field"
                                        style={item.width ? {width: item.width} : {flex: 1}}
                                        key={shortid.generate()}
                                    >
                                        {item.render
                                            ? item.render(report[item.key], report)
                                            : report[item.key]}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <Spin size="large"/>
                    )}
                </div>
            </div>

            {(totalSize > pageSize) && (
                <div className='table-pagination'>
                    <Pagination
                        defaultCurrent={1}
                        pageSize={+pageSize || 10}
                        current={currentPage}
                        total={totalSize}
                        onChange={(page) => onChangePagination({page})}
                    />

                    {showSizeChanger && <Select onChange={(pageSize) => onChangePagination({pageSize})} value={pageSize}>
                        {pageSizeOptions.map(size => (
                            <Option value={size} key={size}>{size}</Option>
                        ))}
                    </Select>}
                </div>

            )}
        </div>
    );
};

export default CustomTable;
