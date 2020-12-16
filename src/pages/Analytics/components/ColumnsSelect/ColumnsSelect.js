import React, {useState} from "react"
import {Checkbox, Input, Popover} from "antd"
import {SVG} from "../../../../utils/icons"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch} from "react-redux"

const {Search} = Input

const ColumnsSelect = ({columns, columnsBlackList, onChangeBlackList}) => {
    return (
        <>
            <Popover
                content={<ColumnList columns={columns} columnsBlackList={columnsBlackList}
                                     onChangeBlackList={onChangeBlackList}/>}
                getPopupContainer={(node) => node.parentNode}
                destroyTooltipOnHide={true}
                placement="bottomRight"
                overlayClassName={'popover-column-select'}
                trigger="click"
            >
                <button className={'columns-select'}>
                    <i className={'btn icon'}>
                        <SVG id={'table-columns'}/>
                    </i>
                </button>
            </Popover>

        </>
    )
}

const ColumnList = ({columns, columnsBlackList, onChangeBlackList}) => {
    const [columnsState, setColumnsState] = useState(columns)

    const onSearch = (value) => {
        setColumnsState(columns.filter(column => column.title.toLowerCase().includes(value.toLowerCase())))
    }

    const changeColumnHandler = (event, column) => {
        if (event) {
            onChangeBlackList(columnsBlackList.filter(item => item !== column))
        } else {
            onChangeBlackList([...columnsBlackList, column])
        }
    }

    return (
        <div>
            <div className="form-group">
                <Search
                    className="search-field"
                    placeholder={'Search'}
                    onChange={e => onSearch(e.target.value)}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>

            <div className="columns-list">
                {columnsState.map(column => (
                    <Checkbox
                        disabled={column.locked}
                        checked={!columnsBlackList.find(key => key === column.key)}
                        onChange={(e) => changeColumnHandler(e.target.checked, column.key)}
                    >
                        {column.title}
                    </Checkbox>
                ))}
            </div>
        </div>
    )
}


export default React.memo(ColumnsSelect)
