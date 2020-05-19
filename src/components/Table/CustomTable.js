import React from 'react';
import {Spin} from 'antd';
import shortid from 'shortid';
import './CustomTable.less';
import {SVG} from "../../utils/icons";

const CustomTable = ({
                         columns,
                         dataSource,
                         loading,
                         heightTabBtn,
                         rowClassName,
                         rowClick,
                         onChangeSorter,
                         sorterColumn,
                         processing
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
                            <div
                                className={`table-body__row ${rowClassName && rowClassName(report)}`}
                                key={`report_${index}_`}
                                onClick={() => rowClick && rowClick(report, index)}
                            >
                                {columns.map((item) => {
                                    const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                                    return (
                                        <div
                                            className={`table-body__field ${item.align || ''}`}
                                            style={{...fieldWidth, minWidth: item.minWidth || '0'}}
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

            {processing && <div className={'load-data'}><Spin/></div>}
        </div>
    );
};

export default React.memo(CustomTable);
