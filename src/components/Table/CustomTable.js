import React, { useRef, useEffect } from 'react';
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

    const refTable = useRef(null);
    const widthTab = refTable.current ? refTable.current.offsetWidth : 0;
    useEffect(() => {
        const width = refTable.current ? refTable.current.offsetWidth : 0;
        console.log('width', width);
    }, []);
    console.log('widthTab', widthTab);

    return (
        <div className="custom-reports-table" ref={refTable}>
            {/* <div className="table-overflow">
                <table className="table" ref={refTable}>
                    <thead
                        className="table-head"
                        style={{ width: `${widthTab}px` }}
                    >
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
            </div> */}

            <div className="table-overflow">
                <div className="table-head">
                    {columns.map(item => (
                        <div
                            className="th"
                            key={item.key}
                            style={
                                item.width ? { width: item.width } : { flex: 1 }
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
                        <Spin size="large" />
                    )}
                </div>
            </div>

            {totalSize > 100000 && (
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
