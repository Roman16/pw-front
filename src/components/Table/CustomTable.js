import React, {useState, useEffect} from 'react';
import {Pagination, Spin, Select, Menu, Dropdown, Icon} from 'antd';
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
                         showSizeChanger = false,
                         rowClassName,
                         onChangeSorter
                     }) => {
    const [sorterColumn, sortColumn] = useState({
        key: null,
        type: null
    });

    function handleChangeSorterButton(column) {

        if (sorterColumn.key === column) {
            if (sorterColumn.type === 'desc') sortColumn({key: column, type: 'asc'});
            if (sorterColumn.type === 'asc') sortColumn({key: null, type: null});

        } else {
            sortColumn({
                key: column,
                type: 'desc'
            })
        }
        // 'desc'

        // 'asc'^
    }

    useEffect(() => {
        onChangeSorter && onChangeSorter(sorterColumn);
    }, [sorterColumn]);

    console.log(sorterColumn);

    return (
        <div
            className="custom-table"
            style={{height: `calc(100% - ${heightTabBtn}px`}}
        >
            <div className="table-overflow">
                <div className="table-head">
                    {columns.map(item => {
                        const menu = (
                            <Menu>
                                {item.filterIcon && item.filterDropdown()}
                            </Menu>
                        );

                        return (
                            <div
                                className={`th ${item.filterIcon && 'filter-column'} ${item.sorter && 'sorter-column'}`}
                                key={shortid.generate()}
                                style={item.width ? {width: item.width} : {flex: 1}}
                                onClick={() => item.sorter && handleChangeSorterButton(item.key)}
                            >
                                <div className='title'>
                                    {typeof item.title === 'function' ? item.title() : item.title}

                                    {item.sorter && (<div className='sorter-buttons'>
                                        <Icon type="caret-up"
                                              style={{color: `${sorterColumn.key === item.key && sorterColumn.type === 'asc' && "#1890ff"}`}}/>
                                        <Icon type="caret-down"
                                              style={{color: `${sorterColumn.key === item.key && sorterColumn.type === 'desc' && "#1890ff"}`}}/>
                                    </div>)}
                                </div>

                                {item.filterIcon && (
                                    <Dropdown overlay={menu} trigger={['contextMenu', 'click']} placement="bottomRight"
                                              onClick={(e) => e.stopPropagation()}>
                                        <a className="ant-dropdown-link" href="#">
                                            {item.filterIcon()}
                                        </a>
                                    </Dropdown>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map(report => (
                            <div className={`table-body__row ${rowClassName && rowClassName(report)}`}
                                 key={shortid.generate()}>
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
                        <div className='spin-wrap'>
                            <Spin size="large"/>
                        </div>
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

                    {showSizeChanger &&
                    <Select onChange={(pageSize) => onChangePagination({pageSize})} value={pageSize}>
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
