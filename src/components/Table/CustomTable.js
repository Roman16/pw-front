import React from 'react';
import {Pagination, Spin} from 'antd';
import shortid from 'shortid';

import './CustomTable.less';

const CustomTable = ({
                         columns,
                         dataSource,
                         totalSize,
                         onChangePagination,
                         currentPage,
                         loading,
                         heightTabBtn,
                         pageSize
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
                            style={
                                item.width ? {width: item.width} : {flex: 1}
                            }
                        >
                            {item.title}
                        </div>
                    ))}
                </div>

                <div className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map(report => (
                            <div
                                className="table-body__row"
                                key={shortid.generate()}
                            >
                                {columns.map(item => (
                                    <div
                                        className="table-body__field"
                                        style={
                                            item.width
                                                ? {width: item.width}
                                                : {flex: 1}
                                        }
                                        key={shortid.generate()}
                                    >
                                        {item.render
                                            ? item.render(
                                                report[item.key],
                                                report
                                            )
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

            {totalSize > (pageSize || 10)  && (
                <Pagination
                    defaultCurrent={1}
                    pageSize={pageSize || 10}
                    current={currentPage}
                    total={totalSize}
                    onChange={onChangePagination}
                />
            )}
        </div>
    );
};

export default CustomTable;
