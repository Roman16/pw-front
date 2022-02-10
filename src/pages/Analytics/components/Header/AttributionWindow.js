import React, {useState} from "react"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const Option = Select.Option

const AttributionWindow = () => {
    const [value, setValue] = useState(localStorage.getItem('attributionWindow') || 30)

    const dispatch = useDispatch()

    const changeValueHandler = (value) => {
        setValue(value)

        setTimeout(() => {
            dispatch(analyticsActions.setAttributionWindow(value))
        }, 10)
    }

    return (<div className="attribution-window">
        <div className="form-group">
            <label htmlFor="">
                Attribution window

                <InformationTooltip
                    description={'Sponsored Brands metrics are always displayed using 14 days attribution window, since Amazon does not provide performance information for Sponsored Brands for other windows.'}/>
            </label>

            <CustomSelect
                onChange={changeValueHandler}
                getPopupContainer={trigger => trigger.parentNode}
                optionFilterProp="children"
                value={+value}
            >
                <Option value={1}>1 day</Option>
                <Option value={7}>7 day</Option>
                <Option value={14}>14 day</Option>
                <Option value={30}>30 day</Option>
            </CustomSelect>

        </div>
    </div>)
}

export default AttributionWindow