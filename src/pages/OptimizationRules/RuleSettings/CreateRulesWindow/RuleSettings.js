import React, {useEffect, useState} from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Checkbox, Input, Select} from "antd"
import {SVG} from "../../../../utils/icons"
import _ from 'lodash'
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {round} from '../../../../utils/round'
import {InfinitySelect} from "../../../AnalyticsV3/Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import {analyticsServices} from "../../../../services/analytics.services"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"

const Option = Select.Option

const metrics = [
    {
        title: 'Impressions',
        key: 'impressions',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'Ad Spend',
        key: 'spend',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Clicks',
        key: 'clicks',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'Ad Orders',
        key: 'orders',
        type: 'number'
        // type: 'number'
    },
    {
        title: 'ACoS',
        key: 'acos',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Ad Sales',
        key: 'sales',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'CTR',
        key: 'ctr',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Ad CVR',
        key: 'cvr',
        type: 'number'
        // type: 'percent'
    },
    {
        title: 'Bid',
        key: 'bid',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'CPC',
        key: 'cpc',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Bid - CPC',
        key: 'bidMinusCPC',
        type: 'number'
        // type: 'currency'
    },
    {
        title: 'Match Type',
        key: 'matchType',
        type: 'enums'
    },
    {
        title: 'State',
        key: 'state',
        type: 'enums'
    },
]

const conditionsByMetric = {
    number: [
        {title: 'Equals', key: '==='},
        {title: 'Greater than', key: '>'},
        {title: 'Less than', key: '<'},
        {title: 'Greater than or equal to', key: '>='},
        {title: 'Less than or equal to', key: '<='},
    ],
    enums: [
        {title: 'Equals', key: '==='},
        {title: 'Not equals', key: '!=='}
    ]
}

export const intervalEnums = [
    {
        title: 'Today',
        key: "0;"
    },
    {
        title: 'Yesterday',
        key: "1;1"
    },
    {
        title: 'Last 3 days',
        key: "3;1"
    },
    {
        title: 'Last 7 days',
        key: "7;1"
    },
    {
        title: 'Last 14 days',
        key: "14;1"
    },
    {
        title: 'Last 30 days',
        key: "30;1"
    },
    {
        title: 'Last 65 days',
        key: "65;1"
    },
]

export const actionsEnums = {
    targetings: [
        {
            title: 'Set - Bid',
            key: 'set_bid'
        },
        {
            title: 'Set - Status',
            key: 'set_status'
        },
        {
            title: 'Decrease - Bid',
            key: 'decrease_bid'
        },
        {
            title: 'Increase - Bid',
            key: 'increase_bid'
        },
    ],
    product_ads: [
        {
            title: 'Set - Status',
            key: 'set_status'
        }
    ],
    search_term_keywords: [
        {
            title: 'Add as - Keyword Exact',
            key: 'add_as_keyword_exact'
        },
        {
            title: 'Add as - Keyword Phrase',
            key: 'add_as_keyword_phrase'
        },
        {
            title: 'Add as - Keyword Broad',
            key: 'add_as_keyword_broad'
        },
        {
            title: 'Add as - Keyword Negative Exact',
            key: 'add_as_keyword_negative_exact'
        },
        {
            title: 'Add as - Keyword Negative Phrase',
            key: 'add_as_keyword_negative_phrase'
        },
        {
            title: 'Add as - Keyword Campaign Negative Exact',
            key: 'add_as_keyword_campaign_negative_exact'
        },
        {
            title: 'Add as - Keyword Campaign Negative Phrase',
            key: 'add_as_keyword_campaign_negative_phrase'
        },
    ],
    search_term_targets: [
        {
            title: 'Add as - Target ASIN',
            key: 'add_as_target_asin'
        },
        {
            title: 'Add as - Target ASIN Expaned',
            key: 'add_as_target_asin_expaned'
        },
        {
            title: 'Add as - Target Negative ASIN',
            key: 'add_as_target_negative_asin'
        },
    ],

}

export const stateEnums = [
    {
        title: 'Enabled',
        key: 'enabled'
    },
    {
        title: 'Paused',
        key: 'paused'
    },
    {
        title: 'Archived',
        key: 'archived'
    },
]

export const matchTypeEnums = [
    {title: 'Exact', key: 'exact', value: 'exact'},
    {title: 'Phrase', key: 'phrase', value: 'phrase'},
    {title: 'Broad', key: 'broad', value: 'broad'},
    {title: 'ASIN', key: 'asin', value: 'asin'},
    {title: 'Expanded ASIN', key: 'expandedASIN', value: 'expandedASIN'},
    {title: 'Category', key: 'category', value: 'category'},
    {title: 'Brand', key: 'brand', value: 'brand'},
    {title: 'Views', key: 'views', value: 'views'},
    {title: 'Auto', key: 'auto', value: 'auto'},
]

const defaultRule = {
    "type": "rule",
    "metric": "impressions",
    "operator": "===",
    "value": "1"
}

const defaultGroup = {
    "type": "array",
    "glue": "AND",
    "rules": [
        defaultRule,
        defaultRule
    ]
}

const addConditionHandler = (data) => {
    if (data.type === 'array') {
        return ({
            ...data,
            rules: [
                ..._.filter(data.rules, {'type': 'rule'}),
                defaultRule,
                ..._.filter(data.rules, {'type': 'array'}),
            ]
        })
    } else {
        return ({
            "type": "array",
            "glue": "AND",
            "rules": [
                data,
                defaultRule,
            ]
        })
    }
}

const addGroupHandler = (data) => {
    if (data.type === 'array') {
        return ({
            ...data,
            rules: [
                ...data.rules,
                defaultGroup,
            ]
        })
    } else {
        return ({
            "type": "array",
            "glue": "AND",
            "rules": [
                data,
                defaultGroup,
            ]
        })
    }
}

const removeConditionHandler = (group, index) => {
    if (group.rules.length === 2) {
        const rule = group.rules.filter((item, i) => i !== index)[0]

        if (rule.type === 'array') {
            return ({
                ...rule
            })

        } else {
            return ({
                "type": "rule",
                "metric": rule.metric,
                "operator": rule.operator,
                "value": rule.value
            })
        }
    } else {
        return ({
            "type": "array",
            "glue": group.glue,
            "rules": [...group.rules.filter((item, i) => i !== index)]
        })
    }
}

export const RuleSettings = ({data, onChange}) => {
    const changeSettingsHandler = (condition) => {
        onChange({condition})
    }

    const changeActionHandler = (type) => {
        if (type === 'decrease_bid' || type === 'increase_bid') {
            onChange({
                actions: {
                    type,
                    units: 'exact'
                }
            })
        } else {
            onChange({actions: {type}})
        }
    }

    return (<div className="step rule-settings">
        <div className="when-line line active">
            <div>when</div>
        </div>

        <div className="conditions">
            <RenderRules
                rule={data.condition}
                onChange={changeSettingsHandler}
            />

            <AddActions
                onAddCondition={() => changeSettingsHandler(addConditionHandler(data.condition))}
                onAddGroup={() => changeSettingsHandler(addGroupHandler(data.condition))}
            />
        </div>

        <div className={`time-line line ${data.interval ? 'active' : ''}`}>
            <div>
                <label htmlFor="">FOR:</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode}
                    placeholder={'SELECT TIMELINE'}
                    value={data.interval}
                    onChange={interval => onChange({interval})}
                >
                    {[...intervalEnums, ...data.type === 'manual' ? [{title: 'lifetime', key: ";"}] : []].map(i =>
                        <Option value={i.key}>{i.title}</Option>)}

                </CustomSelect>
            </div>

            {data.interval ? <p className={'active'}>
                    The rule uses data for the period of <b>{_.find([...intervalEnums, {
                    title: 'lifetime',
                    key: ';'
                }], {key: data.interval}).title}</b> to check the conditions.
                </p> :
                <p>Please, select timeline</p>}
        </div>

        <div
            className={`action-line line ${data.actions.type ? 'active' : ''} ${data.rule_entity_type === 'search_term_keywords' || data.rule_entity_type === 'search_term_targets' ? 'large' : ''}`}>
            <div>
                <label htmlFor="">ACTION:</label>
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode}
                    placeholder={'SELECT ACTION'}
                    value={data.actions.type}
                    onChange={changeActionHandler}
                >
                    {actionsEnums[data.rule_entity_type].map(i => <Option value={i.key}>{i.title}</Option>)}
                </CustomSelect>
            </div>

            {!data.actions.type && <p>Please, select action to create a rule</p>}
        </div>

        <ActionValue
            actions={data.actions}
            advertisingType={data.advertising_type}
            onChange={onChange}
            targetingType={data.rule_entity_type}
        />
    </div>)
}


const RenderRules = ({rule, onChange, showActions = false, showRemove = false, onRemove}) => {
    if (rule.type === 'rule') {
        return (<>
            <div className="rule">
                <div className="form-group">
                    <label htmlFor="">Metric</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.metric}
                        onChange={metric => onChange({
                            ...rule,
                            metric,
                            value: metric === 'state' ? stateEnums[0].key : metric === 'matchType' ? matchTypeEnums[0].key : '1'
                        })}
                    >
                        {metrics.map(metric => <Option value={metric.key}>{metric.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Condition</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.operator}
                        onChange={operator => onChange({...rule, operator})}
                    >
                        {conditionsByMetric[_.find(metrics, {key: rule.metric})?.type]?.map(i =>
                            <Option value={i.key}>{i.title}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Value</label>
                    {_.find(metrics, {key: rule.metric})?.type === 'enums' ? <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={rule.value}
                            onChange={value => onChange({...rule, value})}
                        >
                            {[...rule.metric === 'state' ? stateEnums : matchTypeEnums].map(i =>
                                <Option value={i.key}>{i.title}</Option>)}
                        </CustomSelect>
                        : <input
                            type="number"
                            value={rule.value}
                            onChange={({target: {value}}) => {
                                if (value.split('.')[1] && value.split('.')[1].length > 2) {
                                    onChange({
                                        ...rule,
                                        value: `${value.split('.')[0]}.${value.split('.')[1].slice(0, 2)}`
                                    })
                                } else {
                                    onChange({...rule, value: String(value)})
                                }
                            }
                            }
                        />
                    }
                </div>

                {showRemove && <button className="btn icon" onClick={onRemove}>
                    <SVG id={'close-window-icon'}/>
                </button>}
            </div>
        </>)
    } else {
        return (<div className={`group`}>
            <div className={`glue ${rule.glue}`}>
                <div>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={rule.glue}
                        onChange={glue => onChange({...rule, glue})}
                    >
                        <Option value={'AND'}>AND</Option>
                        <Option value={'OR'}>OR</Option>
                    </CustomSelect>
                </div>
            </div>

            <div className="rules">
                {rule?.rules?.map((i, index) => <RenderRules
                    showActions={true}
                    showRemove={true}
                    rule={i}

                    onRemove={() => onChange(removeConditionHandler(rule, index))}
                    onChange={(data) => onChange({
                        ...rule,
                        rules: [...rule.rules.map((item, index2) => index2 === index ? data : item)]
                    })}
                />)}
            </div>

            {showActions && <AddActions
                onAddCondition={() => onChange(addConditionHandler(rule))}
                onAddGroup={() => onChange(addGroupHandler(rule))}

                addGroupBtnText={'Add inner group'}
            />}
        </div>)
    }
}

const AddActions = ({onAddCondition, onAddGroup, addGroupBtnText = 'Add group'}) => {
    return (<div className="add-actions">
        <button onClick={onAddCondition}>
            <SVG id={'plus-icon'}/>
            Add condition
        </button>

        <button onClick={onAddGroup}>
            <SVG id={'plus-icon'}/>
            {addGroupBtnText}
        </button>
    </div>)
}

const ActionValue = ({actions, onChange,targetingType, advertisingType}) => {
    const [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([])

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        try {
            const res = await optimizationRulesServices.getCampaignsForST({
                page,
                advertisingType,
                searchStr
            })

            if (page === 1) setCampaigns([...res.result])
            else setCampaigns([...campaigns, ...res.result])
            cb && cb(res.result.length !== 0)
        } catch (e) {
            console.log(e)
        }
    }

    const getAdGroups = async (id, page = 1, cb, searchStr = undefined) => {
        try {
            const res = await optimizationRulesServices.getAdGroupsForST({
                page,
                campaignId: id,
                advertisingType,
                searchStr,
                type: targetingType
            })

            setAdGroups(res.result)

            if (page === 1) setAdGroups([...res.result])
            else setAdGroups([...adGroups, ...res.result])
            cb && cb(res.result.length !== 0)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        actions.type && advertisingType && getCampaigns()
    }, [actions.type])

    useEffect(() => {
        actions.campaignId && getAdGroups(actions.campaignId)
    }, [actions.campaignId])

    switch (actions.type) {
        case 'set_bid':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                    />
                </div>
            </div>

        case 'set_status':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.value}
                        onChange={value => onChange({actions: {...actions, value}})}
                    >
                        <Option value={'enabled'}>Enabled</Option>
                        <Option value={'paused'}>Paused</Option>
                        <Option value={'archived'}>Archived</Option>
                    </CustomSelect>
                </div>
            </div>

        case 'decrease_bid':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group type">
                    <label htmlFor="">Type</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.units}
                        onChange={units => onChange({actions: {...actions, units}})}
                    >
                        <Option value={'exact'}>$</Option>
                        <Option value={'percents'}>%</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                        typeIcon={actions.units === 'exact' ? 'number' : 'percent'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Up to minimum</label>
                    <InputCurrency
                        value={actions.down_limit}
                        onChange={(down_limit) => onChange({
                            actions: {
                                ...actions,
                                down_limit: down_limit ? +down_limit : undefined
                            }
                        })}
                    />
                </div>
            </div>

        case 'add_as_keyword_exact':
        case 'add_as_keyword_phrase':
        case 'add_as_keyword_broad':
        case 'add_as_target_asin':
        case 'add_as_target_asin_expaned':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Campaign</label>
                    <InfinitySelect
                        value={actions.campaignId}
                        onChange={campaignId => onChange({actions: {...actions, campaignId}})}
                        onLoadMore={(page, cb, searchStr) => getCampaigns(actions.campaignId, page, cb, searchStr)}
                        children={campaigns}
                        dataKey={'campaignId'}
                        notFoundContent={'No campaigns'}
                        optionName={'campaignName'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Ad Group</label>
                    <InfinitySelect
                        value={actions.adGroupId}
                        disabled={!actions.campaignId}
                        onChange={adGroupId => onChange({actions: {...actions, adGroupId}})}
                        onLoadMore={(page, cb, searchStr) => getAdGroups(actions.adGroupId, page, cb, searchStr)}
                        children={adGroups}
                        dataKey={'adGroupId'}
                        notFoundContent={'No ad groups'}
                        optionName={'adGroupName'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Bid</label>
                    <InputCurrency
                        value={actions.bid}
                        disabled={actions.useBidFromCpc || !actions.adGroupId}
                        onChange={(value) => onChange({actions: {...actions, bid: String(value)}})}
                        typeIcon={'number'}
                    />
                </div>

                <div className="form-group">
                    <Checkbox
                        checked={actions.useBidFromCpc}
                        disabled={!actions.adGroupId}
                        onChange={({target: {checked}}) => onChange({actions: {...actions, useBidFromCpc: checked}})}
                    >
                        Use bid from CPC
                    </Checkbox>
                </div>
            </div>

        case 'add_as_keyword_negative_exact':
        case 'add_as_keyword_negative_phrase':
        case 'add_as_target_negative_asin':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Campaign</label>
                    <InfinitySelect
                        value={actions.campaignId}
                        onChange={campaignId => onChange({actions: {...actions, campaignId}})}
                        onLoadMore={(page, cb, searchStr) => getCampaigns(actions.campaignId, page, cb, searchStr)}
                        children={campaigns}
                        dataKey={'campaignId'}
                        notFoundContent={'No campaigns'}
                        optionName={'campaignName'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Ad Group</label>
                    <InfinitySelect
                        value={actions.adGroupId}
                        disabled={!actions.campaignId}
                        onChange={adGroupId => onChange({actions: {...actions, adGroupId}})}
                        onLoadMore={(page, cb, searchStr) => getAdGroups(actions.adGroupId, page, cb, searchStr)}
                        children={adGroups}
                        dataKey={'adGroupId'}
                        notFoundContent={'No ad groups'}
                        optionName={'adGroupName'}
                    />
                </div>
            </div>

        case 'add_as_keyword_campaign_negative_phrase':
        case 'add_as_keyword_campaign_negative_exact':
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group">
                    <label htmlFor="">Campaign</label>
                    <InfinitySelect
                        value={actions.campaignId}
                        onChange={campaignId => onChange({actions: {...actions, campaignId}})}
                        onLoadMore={(page, cb, searchStr) => getCampaigns(actions.campaignId, page, cb, searchStr)}
                        children={campaigns}
                        dataKey={'campaignId'}
                        notFoundContent={'No campaigns'}
                        optionName={'campaignName'}
                    />
                </div>
            </div>

        default:
            return <div className={`action-value ${actions.type ? 'visible' : ''}`}>
                <div className="form-group type">
                    <label htmlFor="">Type</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        value={actions.units}
                        onChange={units => onChange({actions: {...actions, units}})}
                    >
                        <Option value={'exact'}>$</Option>
                        <Option value={'percents'}>%</Option>
                    </CustomSelect>
                </div>


                <div className="form-group">
                    <label htmlFor="">Value</label>
                    <InputCurrency
                        value={actions.value}
                        onChange={(value) => onChange({actions: {...actions, value: String(value)}})}
                        typeIcon={actions.units === 'exact' ? 'number' : 'percent'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Up to maximum</label>
                    <InputCurrency
                        value={actions.up_limit}
                        onChange={(up_limit) => onChange({
                            actions: {
                                ...actions,
                                up_limit: up_limit ? +up_limit : undefined
                            }
                        })}
                    />
                </div>
            </div>
    }
}