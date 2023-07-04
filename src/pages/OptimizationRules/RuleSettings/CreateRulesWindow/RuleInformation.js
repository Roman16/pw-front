import React from "react"
import {Select, Switch} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import {SVG} from "../../../../utils/icons"
import {AttributionWindowSelect} from "../../../Analytics/components/Header/AttributionWindow"
import {intervalEnums} from "./RuleSettings"

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

export const ruleTypeEnums = [
    {
        title: 'Targetings',
        key: 'targetings'
    },
    {
        title: 'Product Ads',
        key: 'product_ads'
    },
    // {
    //     title: 'Search Terms Keywords',
    //     key: 'search_term_keywords'
    // },
    // {
    //     title: 'Search Terms Targets',
    //     key: 'search_term_targets'
    // },
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
            <label htmlFor="">Rule type </label>

            <CustomSelect
                getPopupContainer={trigger => trigger.parentNode}
                placeholder={'Select rule type'}
                value={data.rule_entity_type}
                disabled={disabledAutomaticSwitch}
                onChange={rule_entity_type => onChange({
                    rule_entity_type: rule_entity_type,
                    actions: {
                        type: undefined,
                    }
                })}
            >
                {ruleTypeEnums.map(i => <Option value={i.key}>{i.title}</Option>)}
            </CustomSelect>

            <p>
                Specifies which entities this rule can interact with. You can not change this after the rule has been
                created.
            </p>
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
                When you turn off this switch, the created rule will not run automatically. This way, you limit the
                Software and adjust it to your convenience. You can run this rule manually from the interface.
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