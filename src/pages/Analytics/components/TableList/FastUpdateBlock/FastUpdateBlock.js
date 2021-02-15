import React, {useState} from "react"
import {SVG} from "../../../../../utils/icons"
import CustomSelect from "../../../../../components/Select/Select"
import {Input, Select} from "antd"
import './FastUpdateBlock.less'
import InputCurrency from "../../../../../components/Inputs/InputCurrency"

const Option = Select.Option

const FastUpdateBlock = ({totalSize, location, selectedRows, selectedAll, onClose}) => {
    const [selectedColumn, setSelectedColumn] = useState()

    return (
        <div className="fast-update-block">
            {selectedAll ?
                <p><b>All {selectedRows.length}</b> products on this <b>page</b> are selected.</p>
                :
                <p><b>{selectedRows.length}</b> products on this <b>page</b> are selected.</p>
            }

            <button className={'select-all-btn'}>Select all {totalSize} {location}.</button>

            <form action="">
                <label htmlFor="">Apply to all:</label>

                <div className="form-group">
                    <CustomSelect
                        required
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={value => setSelectedColumn(value)}
                    >
                        <Option value={'budget'}>Budget</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    {selectedColumn === 'budget' ? <InputCurrency
                        step={0.01}
                    /> : <Input/>}
                </div>

                <button className={'btn green'}>Apply</button>
            </form>

            <button className={'btn icon close'} onClick={onClose}>
                <SVG id={'close-window-icon'}/>
            </button>
        </div>
    )
}

export default FastUpdateBlock
