import React from 'react';
import {Pagination, Spin, Select, Icon} from 'antd';
import shortid from 'shortid';

import './CustomTable.less';
import CustomSelect from "../Select/Select";

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
                         showSizeChanger = false,
                         rowClassName,
                         onChangeSorter,
                         sorterColumn
                     }) => {

    const devicePixelRatio = window.devicePixelRatio;

    return (
        <div
            className="custom-table"
            style={{height: `calc(100% - ${heightTabBtn}px`}}
        >
            <div className="table-overflow">
                <div className="table-head">
                    {columns.map((item, index) => {
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                        return (
                            <div
                                className={`th ${item.filter ? 'filter-column' : ''} ${item.sorter ? 'sorter-column' : ''}`}
                                key={`${item.dataIndex}_${index}`}
                                style={fieldWidth}
                                onClick={() => item.sorter && onChangeSorter(item.key)}
                            >
                                <div className='title'>
                                    {typeof item.title === 'function' ? item.title() : item.title}

                                    {sorterColumn && (<div
                                        className={`sorter-buttons ${sorterColumn.key === item.key && 'is-sorter'}`}>
                                        <Icon type="caret-up"
                                              style={{color: `${(sorterColumn.key === item.key && sorterColumn.type === 'asc') ? "#6d6df6" : ""}`}}/>
                                        <Icon type="caret-down"
                                              style={{color: `${(sorterColumn.key === item.key && sorterColumn.type === 'desc') ? "#6d6df6" : ""}`}}/>
                                    </div>)}
                                </div>

                                {(item.filter && (
                                    item.filter(item.key)
                                ))
                                }
                            </div>
                        )
                    })}
                </div>

                <div className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map((report, index) => (
                            <div
                                className={`table-body__row ${rowClassName && rowClassName(report)}`}
                                key={`report_${index}_`}
                            >
                                {columns.map((item) => {

                                    const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                                    return (
                                        <div
                                            className="table-body__field"
                                            style={fieldWidth}
                                            key={shortid.generate()}
                                        >
                                            {item.render
                                                ? item.render(report[item.key], report, index)
                                                : report[item.key]}
                                        </div>
                                    )
                                })}
                            </div>
                        ))
                    ) : (
                        <div className='spin-wrap'>
                            <Spin size="large"/>
                        </div>
                    )}
                </div>
            </div>

            <div className='table-pagination'>
                {(totalSize > +pageSize) && (
                    <Pagination
                        defaultCurrent={1}
                        pageSize={+pageSize || 10}
                        current={currentPage}
                        total={+totalSize}
                        onChange={(page) => onChangePagination({page})}
                    />
                )}

                {(showSizeChanger && (totalSize > 10)) &&
                <CustomSelect onChange={(pageSize) => onChangePagination({pageSize})} value={pageSize}>
                    {pageSizeOptions.map(size => (
                        <Option value={size} key={size}>{size}</Option>
                    ))}
                </CustomSelect>
                }
            </div>
        </div>
    );
};

export default CustomTable;
