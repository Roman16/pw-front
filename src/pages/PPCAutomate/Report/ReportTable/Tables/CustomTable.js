import React from 'react';
import './CustomTable.less';
import { Pagination, Spin } from 'antd';

const CustomTable = ({
    columns,
    dataSource,
    totalSize,
    onChangePagination,
    currentPage,
    loading
}) => {
    const heightScreen = window.innerHeight;

    return (
        <div className="custom-reports-table">
            <div className="table-head">
                {columns.map(item => (
                    <div
                        className="th"
                        key={item.key}
                        style={item.width ? { width: item.width } : { flex: 1 }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>

            <div className="table-body">
                {!loading ? (
                    dataSource.length > 0 &&
                    dataSource.map(report => (
                        <div className="table-body__row">
                            {columns.map(item => (
                                <div
                                    className="table-body__field"
                                    style={
                                        item.width
                                            ? { width: item.width }
                                            : { flex: 1 }
                                    }
                                    key={item.key}
                                >
                                    {item.render
                                        ? item.render(report[item.key])
                                        : report[item.key]}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <Spin size="large" />
                )}
            </div>

            {/*<table>*/}
            {/*    <thead>*/}
            {/*    {columns.map(item => (*/}
            {/*        <th*/}
            {/*            key={item.key}*/}
            {/*            style={{width: item.width}}>{item.title}</th>*/}
            {/*    ))}*/}
            {/*    </thead>*/}

            {/*    <tbody style={{height: `${heightScreen - 400}px`}}>*/}
            {/*    {dataSource.length > 0 && dataSource.map(report => (*/}
            {/*        <tr className='table-body__row' key={report.id}>*/}
            {/*            {columns.map(item => (*/}
            {/*                <td className='table-body__field'*/}
            {/*                    style={{width: item.width}}*/}
            {/*                    key={item.key}*/}
            {/*                >*/}
            {/*                    {item.render ? item.render(report[item.key]) : report[item.key]}*/}
            {/*                </td>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            {totalSize > 10 && !loading && (
                <Pagination
                    defaultCurrent={1}
                    pageSize={10}
                    current={currentPage}
                    total={totalSize}
                    onChange={onChangePagination}
                />
            )}
        </div>
    );
};

export default CustomTable;
