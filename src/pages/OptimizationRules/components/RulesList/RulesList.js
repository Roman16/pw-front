import React, {useEffect, useState} from "react"
import './RulesList.less'
import {SVG} from "../../../../utils/icons"
import {SearchField} from "../../../../components/SearchField/SearchField"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"
import {Popover, Radio, Spin, Switch} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import {periodEnums} from "../../RuleSettings/CreateRulesWindow/RuleInformation"
import _ from 'lodash'
import {intervalEnums} from "../../RuleSettings/CreateRulesWindow/RuleSettings"
import {ParentStatus} from "../../../Analytics/components/TableList/tableColumns"
import axios from "axios"

const navigationTabs = ['rules', 'campaigns']

const CancelToken = axios.CancelToken
let source = null

export const RulesList = ({activeTab, onSetActiveTab, selectedRule, onSelect, onDelete, searchParams}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 10,
            searchStr: searchParams ? {multiSearch: false, strictSearch: true, value: searchParams} : undefined,
            sorting: 'created_at:desc',
            onlyManual: false
        })

    const selectRuleHandler = (rule) => {
        onSelect({
            ...rule,
            condition: rule.condition && JSON.parse(rule.condition),
            actions: rule.actions && JSON.parse(rule.actions)
        })
    }

    const getList = async () => {
        setProcessing(true)
        setList([])

        source && source.cancel()
        source = CancelToken.source()

        try {
            let arr = [],
                totalSize = 0

            if (activeTab === 'rules') {
                const {result} = await optimizationRulesServices.getRules(requestParams, source.token)
                arr = result.data
                totalSize = result.total_count
            } else {
                const {result} = await optimizationRulesServices.getCampaignsPreview(requestParams, source.token)
                arr = result.data
                totalSize = result.total_count
            }

            setList(arr)
            setTotalSize(totalSize)
            selectRuleHandler(arr[0] || {})
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const changePaginationHandler = (data) => setRequestParams(prevState => ({...prevState, ...data}))

    const changeTabHandler = (tab) => {
        onSetActiveTab(tab)

        changePaginationHandler({
            page: 1,
            searchStr: '',
            sorting: tab === navigationTabs[0] ? 'created_at:desc' : 'name:asc'
        })
    }

    useEffect(() => {
        getList()
    }, [requestParams, activeTab])


    useEffect(() => {
        if (activeTab === navigationTabs[0]) {
            if (selectedRule?.new) {
                setList([
                    selectedRule,
                    ...list.splice(0, list.length)
                ])

                onSelect({
                    ...selectedRule,
                    new: false,
                })
                setTotalSize(prevState => prevState + 1)
            } else {
                setList([
                    ...list.map(i => i.id === selectedRule.id ? ({
                        ...i,
                        name: selectedRule.name,
                        description: selectedRule.description,
                        active: selectedRule.active,
                        campaigns_count: selectedRule.campaigns_count || 0,
                        rules_count: selectedRule.rules_count || 0,
                        interval: selectedRule.interval,
                        period: selectedRule.period,
                        type: selectedRule.type,
                        actions: JSON.stringify(selectedRule.actions),
                        condition: JSON.stringify(selectedRule.condition),
                        new: false,
                    }) : i)
                ])
            }
        } else if (activeTab === navigationTabs[1] && selectedRule.campaignId) {
            setList([
                ...list.map(i => i.campaignId === selectedRule.campaignId ? ({
                    ...i,
                    rules_count: selectedRule.rules_count || 0,
                }) : i)
            ])
        }
    }, [selectedRule])

    return (<div className="rules-list">
        <div className="tabs">
            {navigationTabs.map(i => (<div
                onClick={() => activeTab !== i && changeTabHandler(i)}
                className={`tab ${activeTab === i ? 'active' : ''}`}>
                <SVG id={'list'}/>
                {i}
            </div>))}
        </div>

        <div className="search-block">
            <SearchField
                placeholder={activeTab === 'campaigns' ? 'Search by Campaign' : 'Search by Rule'}
                value={requestParams.searchStr}
                onSearch={searchStr => changePaginationHandler({searchStr, page: 1})}
            />

            <Popover
                trigger="click"
                placement="bottomRight"
                overlayClassName={'sorting-options-popover'}
                getPopupContainer={(node) => node.parentNode}
                content={<div className="options">
                    <Radio.Group value={requestParams.sorting}
                                 onChange={({target: {value}}) => setRequestParams(prevState => ({...prevState, sorting: value}))}>
                        <Radio value={'name:asc'}>
                            Name rules A-Z
                        </Radio>

                        <Radio value={'name:desc'}>
                            Name rules Z-A
                        </Radio>

                        {activeTab === navigationTabs[0] && <>
                            <Radio value={'created_at:asc'}>
                                Creation date increase
                            </Radio>

                            <Radio value={'created_at:desc'}>
                                Creation date decrease
                            </Radio>
                        </>}
                    </Radio.Group>

                </div>}
            >
                <div className="sort-btn">
                    <button className={`btn icon sorting-icon`}>
                        <SVG id={'sort-arrows'}/>
                    </button>
                </div>
            </Popover>
        </div>

        <div className="list">
            {processing && <div className='fetching-data'><Spin size={'large'}/></div>}

            {list.map(item => activeTab === 'rules' ?
                <div onClick={() => selectedRule?.id !== item.id ? selectRuleHandler(item) : ''}
                     className={`item rule ${selectedRule?.id === item.id ? 'active' : ''}`}>
                    <div className={`status ${item.active ? 'enabled' : 'paused'}`}/>
                    <div className="name" title={item.name}>{item.name}</div>
                    <div className="description" title={item.description}>{item.description}</div>
                    <div className="details-row">
                        <SVG id={'calendar'}/>

                        <div className="timeline">{_.find(intervalEnums, {key: item.interval})?.title}</div>
                        <div className="type">
                            <span>{item.type}</span> {item.type === 'auto' && `• ${_.find(periodEnums, {key: item.period})?.title}`}
                        </div>
                        <div className="campaigns-count">
                            Campaigns: <b>{item.campaigns_count}</b>
                        </div>
                    </div>

                    {/*<button className="btn default" onClick={() => onDelete(item.id)}>delete</button>*/}
                </div>

                :

                <div className={`item campaign ${item.campaignId === selectedRule?.campaignId ? 'active' : ''}`}
                     onClick={() => selectRuleHandler(item)}>
                    <div className="row">
                        <div className="name" title={item.name}>{item.name}</div>

                        <ParentStatus status={item.state} widthLabel={true}/>
                    </div>

                    <div className="details-row">
                        <div className="campaigns-count">
                            Rules: <b>{item.rules_count}</b>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <Pagination
            onChange={changePaginationHandler}

            page={requestParams.page}
            pageSizeOptions={[10, 30, 50]}
            pageSize={requestParams.pageSize}
            totalSize={totalSize}
            processing={processing}
            listLength={list && list.length}
        />
    </div>)
}