import React from "react"
import {Popover, Switch} from "antd"
import {SVG} from "../../../../utils/icons"

const TableOptions = ({options, onChange}) => {

    const changeOptionsHandler = (name, value) => {
        onChange({
            ...options,
            [name]: value
        })
    }

    return (<Popover
        placement="bottomRight"
        overlayClassName={'table-options-popover'}
        getPopupContainer={(node) => node.parentNode}
        trigger="click"
        content={<div className="switches">
            <div className='switch-block optimization-switch'>
                <Switch
                    checked={options.comparePreviousPeriod}
                    onChange={e => changeOptionsHandler('comparePreviousPeriod', e)}
                />
                <span>Compare with previous period</span>
            </div>
        </div>}
    >
        <button className={'table-options'}>
            <SVG id={'options-icon'}/>
            options
        </button>
    </Popover>)
}

export default TableOptions
