import React from "react"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import CustomSelect from "../../../components/Select/Select"
import {Select} from "antd"

const Option = Select.Option


export const Filters = ({attributionWindow, onChange}) => {

    return (<div className={'filters-block attribution-window-block'}>
        <div className="form-group">
            <div className="label">
                <InformationTooltip
                    description={`<b>Sponsored Brands</b> metrics are always displayed using 14 days attribution window, since Amazon does not provide performance information for <b>Sponsored Brands</b> for other windows.`}/>

                Attribution window:
            </div>

            <CustomSelect
                onChange={onChange}
                getPopupContainer={trigger => trigger.parentNode}
                optionFilterProp="children"
                value={+attributionWindow}
            >
                <Option value={1}>1 day</Option>
                <Option value={7}>7 day</Option>
                <Option value={14}>14 day</Option>
                <Option value={30}>30 day</Option>
            </CustomSelect>

        </div>

    </div>)
}