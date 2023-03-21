import React from "react"
import {Select, Switch} from "antd"
import CustomSelect from "../../../components/Select/Select"
import {SVG} from "../../../utils/icons"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"

const Option = Select.Option

export const periodEnums = [
    {
        title: 'Every 3 hours',
        key: '+3 hours'
    },
    {
        title: 'Every 6 hours',
        key: '+6 hours'
    },
    {
        title: 'Every 12 hours',
        key: '+12 hours'
    },
    {
        title: 'Everyday',
        key: '+1 day'
    },
    {
        title: 'Every 3 days',
        key: '+3 days'
    },
    {
        title: 'Every 7 days',
        key: '+7 days'
    },
    {
        title: 'Every 14 days',
        key: '+14 days'
    },
    {
        title: 'Every 30 days',
        key: '+30 days'
    },
    {
        title: 'Every 65 days',
        key: '+65 days'
    },
]

export const RuleInformation = ({data, disabledAutomaticSwitch = false, onChange}) => {

    return (<div className="step rule-information">
        <div className="row form-group">
            <label htmlFor="">Rule name</label>

            <input
                type="text"
                placeholder={'Only for big Campaigns rule'}
                value={data.name}
                onChange={({target: {value}}) => onChange({'name': value})}
            />
        </div>

        <div className="row form-group">
            <label htmlFor="">Attribution window</label>

            <AttributionWindowSelect
                value={data.attribution_window}
                onChange={(attribution_window) => onChange({attribution_window})}
            />
        </div>

        <div className="row form-group">
            <label htmlFor="">Description</label>
            <textarea
                value={data.description}
                onChange={({target: {value}}) => onChange({'description': value})}
            />
        </div>

        <div className="row form-group">
            <label htmlFor="">Automatic <SVG id='rotate-arrows-icon'/></label>
            <div className="switch-group">
                <Switch
                    disabled={disabledAutomaticSwitch}
                    checked={data.type === 'auto'}
                    onChange={checked => onChange({'type': checked ? 'auto' : 'manual'})}
                />

                {data.type === 'auto' && <CustomSelect
                    getPopupContainer={trigger => trigger}
                    value={data.period}
                    placeholder={'Select period'}
                    onChange={period => onChange({period})}
                >
                    {periodEnums.map(i => <Option value={i.key}>{i.title}</Option>)}
                </CustomSelect>}
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet duis tellus
                digni
            </p>
        </div>

        {data.type === 'auto' && <div className="row form-group">
            <label htmlFor="">{data.active ? 'Enabled' : 'Disabled'}</label>
            <div className="switch-group">
                <Switch checked={data.active} onChange={active => onChange({active})}/>
            </div>
        </div>}
    </div>)
}