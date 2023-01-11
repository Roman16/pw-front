import React from "react"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import CustomSelect from "../../../../components/Select/Select"
import {Popover, Select, Switch} from "antd"
import DateRange from "../../../Analytics/components/DateRange/DateRange"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import moment from "moment-timezone"
import {activeTimezone} from "../../../index"
import {SVG} from "../../../../utils/icons"

const Option = Select.Option


const ranges = {
    Today: [moment().tz(activeTimezone), moment().tz(activeTimezone)],
    Yesterday: [
        moment().tz(activeTimezone).add(-1, 'days'),
        moment().tz(activeTimezone).add(-1, 'days'),
    ],
    'Last 7 Days': [
        moment().tz(activeTimezone).add(-6, 'days'),
        moment().tz(activeTimezone)
    ],
    'Last 14 Days': [
        moment().tz(activeTimezone).add(-13, 'days'),
        moment().tz(activeTimezone)
    ],
    'Last 30 Days': [
        moment().tz(activeTimezone).add(-29, 'days'),
        moment().tz(activeTimezone)
    ]
}

export const Filters = ({attributionWindow, dateFrom, dateTo,comparePreviousPeriod, onChange}) => {

    return (<div className={'filters-block '}>
        <div className="form-group attribution-window-block">
            <div className="label">
                <InformationTooltip
                    description={`<b>Sponsored Brands</b> metrics are always displayed using 14 days attribution window, since Amazon does not provide performance information for <b>Sponsored Brands</b> for other windows.`}/>

                Attribution window:
            </div>

            <CustomSelect
                onChange={(value) => onChange({attributionWindow: value})}
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

        <div className="form-group date-range">
            <div className={'label'}>Date range:</div>

            <DatePicker
                timeRange={(start, end) => {
                    onChange({
                        dateFrom: start,
                        dateTo: end
                    })
                }}
                ranges={ranges}
                allowClear={false}
                value={[moment(dateFrom), moment(dateTo)]}
            />
        </div>

        <div className="form-group compare">
            <Popover
                trigger="click"
                placement="bottomRight"
                overlayClassName={'table-options-popover'}
                getPopupContainer={(node) => node.parentNode}
                content={<div className="switches">
                    <div className='switch-block optimization-switch'>
                        <Switch
                            checked={comparePreviousPeriod}
                            onChange={e => onChange({comparePreviousPeriod: e})}
                        />
                        <span>Compare with previous period</span>
                    </div>
                </div>}
            >
                <button className={'table-options icon-btn'}>
                    <i>
                        <SVG id={'options-icon'}/>
                    </i>

                    options
                </button>
            </Popover>
        </div>
    </div>)
}