import React from 'react';
import '../../pages/PPCAutomate/Report/ReportTable/Tables/CustomTable.less';
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
            <table className="table">
                <thead className="table-head">
                    <tr className="table-head__row">
                        {columns.map(item => (
                            <th
                                className="th"
                                key={item.key}
                                style={
                                    item.width
                                        ? { width: item.width }
                                        : { flex: 1 }
                                }
                            >
                                {item.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map(report => (
                            <tr className="table-body__row">
                                {columns.map(item => (
                                    <td
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
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <Spin size="large" />
                    )}
                </tbody>
            </table>

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
            {totalSize > 8 && (
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
