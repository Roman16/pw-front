import React, {memo} from 'react';
import {Checkbox, Spin} from 'antd';
import shortid from 'shortid';
import './CustomTable.less';
import {SVG} from "../../utils/icons";

const CustomTable = ({
                         columns,
                         dataSource,
                         loading,
                         rowClassName,
                         rowClick,
                         onChangeSorter,
                         sorterColumn,
                         processing,
                         rowSelection,
                         clickHandler,
                         expandedRowRender,
                         openedRow
                     }) => {

    const devicePixelRatio = window.devicePixelRatio;

    const checkAllRowsHandler = ({target: {value}}) => {
        if (value) {
            rowSelection.onChange([...dataSource], true)
        } else {
            rowSelection.onChange([...dataSource], false)
        }
    }

    const checkRowHandler = (row, value) => {
        rowSelection.onChange([row], value)
    }

    return (
        <div className="custom-table">
            <div className="table-overflow">
                <div className="table-head" key={'table-head'}>
                    {rowSelection && <div className={'th checkbox-column'}>
                        <Checkbox
                            onChange={checkAllRowsHandler}
                        />
                    </div>}

                    {columns.map((item, index) => {
                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                        return (
                            <div
                                className={`th ${item.filter ? 'filter-column' : ''} ${item.sorter ? 'sorter-column' : ''}`}
                                key={`row_${item.dataIndex}_${index}`}
                                style={{
                                    ...fieldWidth,
                                    minWidth: item.minWidth || '0',
                                }}
                                onClick={() => item.sorter && onChangeSorter(item.key)}
                            >
                                <div className={`title ${item.align || ''}`}>
                                    {typeof item.title === 'function' ? item.title() : item.title}

                                    {item.sorter && <div
                                        className={`sorter-buttons
                                         ${sorterColumn && sorterColumn.column === item.key ? sorterColumn.type === 'desc' ? 'is-sorter desc' : 'is-sorter asc' : ''}`}>
                                        <SVG id={'sorter-arrow'}/>
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="table-body">
                    {!loading ? (
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map((report, index) => (
                            <>
                                <div
                                    className={`table-body__row ${rowClassName && rowClassName(report)}`}
                                    onClick={() => rowClick && rowClick(report, index)}
                                >
                                    {rowSelection && <div className={'table-body__field checkbox-column'}>
                                        <Checkbox
                                            onChange={(e) => checkRowHandler(report, e.target.checked)}
                                        />
                                    </div>}


                                    {columns.map((item) => {
                                        const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                                        return (
                                            <div
                                                className={`table-body__field ${item.align || ''}`}
                                                style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                            >
                                                {item.render
                                                    ? item.render(report[item.key], report, index)
                                                    : report[item.key]}
                                            </div>
                                        )
                                    })}
                                </div>

                                {expandedRowRender && openedRow === report.id && <div className={'table-body__row expand-row'}>
                                    {expandedRowRender(report)}
                                </div>}
                            </>
                        ))
                    ) : (
                        <div className='spin-wrap'>
                            <Spin size="large"/>
                        </div>
                    )}
                </div>
            </div>

            {processing && <div className={'load-data'}><Spin size={'large'}/></div>}

        </div>
    );
};

export default memo(CustomTable);
