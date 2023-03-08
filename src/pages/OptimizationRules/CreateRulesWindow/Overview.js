import React from "react"
import _ from "lodash"
import {actionsEnums, intervalEnums} from "./RuleSettings"
import {periodEnums} from "./RuleInformation"

const fields = [
    {
        title: 'Rule Name',
        fieldKey: 'name'
    },
    {
        title: 'Description',
        fieldKey: 'description',
        render: value => value || <hr/>
    },
    {
        title: 'Optimization type',
        fieldKey: 'type',
        render: (type, item) => <div className="type"><span>{type}</span> {type === 'auto' && `• ${_.find(periodEnums, {key: item.period})?.title}`}</div>
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
        render: actions => _.find(actionsEnums, {key: actions.type}).title
    },
    {
        title: 'Attached campaigns',
        fieldKey: 'campaignsId',
        render: arr => arr.length
    },
]

export const Overview = ({data}) => {

    return (<div className="create-rule-overview">
        <h3>Overview</h3>

        {fields.map((field) => (
            <div className="row">
                <div className="label">{field.title}</div>
                <div className="value">
                    {field.render ? field.render(data[field.fieldKey], data) : data[field.fieldKey]}
                </div>
            </div>
        ))}
    </div>)
}