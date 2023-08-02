import React from "react"
import _ from "lodash"
import {actionsEnums, intervalEnums} from "./RuleSettings"
import {advertisingTypeEnums, periodEnums, ruleTypeEnums} from "./RuleInformation"


export const Overview = ({data}) => {

    const fields = [
        {
            title: 'Rule Name',
            fieldKey: 'name'
        },
        {
            title: 'Advertising type',
            fieldKey: 'advertising_type',
            render: value => _.find(advertisingTypeEnums, {key: value}).title
        },
        {
            title: 'Rule Type',
            fieldKey: 'rule_entity_type',
            render: value => _.find(ruleTypeEnums[data.advertising_type], {key: value}).title
        },
        {
            title: 'Attribution window',
            fieldKey: 'attribution_window'
        },
        {
            title: 'Description',
            fieldKey: 'description',
            render: value => value || <hr/>
        },
        {
            title: 'Status',
            fieldKey: 'active',
            render: value => value ? 'Enabled' : 'Disabled'
        },
        {
            title: 'Optimization type',
            fieldKey: 'type',
            render: (type, item) => <div className="type">
                <span>{type}</span> {type === 'auto' && `• ${_.find(periodEnums, {key: item.period})?.title}`}</div>
        },
        {
            title: 'Timeline',
            fieldKey: 'interval',
            render: interval => _.find([...intervalEnums, {
                title: 'lifetime',
                key: 'lifetime'
            }], {key: interval}).title
        },
        {
            title: 'Action type',
            fieldKey: 'actions',
            render: actions => _.find(actionsEnums[data.rule_entity_type], {key: actions.type}).title
        },
        {
            title: 'Attached campaigns',
            fieldKey: 'campaignsId',
            render: arr => arr.length
        },
    ]

    return (<div className="create-rule-overview">
        <h3>Overview</h3>

        <div className="scroll-container">
            {fields.map((field) => (
                <div className="row">
                    <div className="label">{field.title}</div>
                    <div className="value">
                        {field.render ? field.render(data[field.fieldKey], data) : data[field.fieldKey]}
                    </div>
                </div>
            ))}
        </div>
    </div>)
}