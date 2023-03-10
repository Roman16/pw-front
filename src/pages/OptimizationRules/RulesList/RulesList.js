import React, {useEffect, useState} from "react"
import './RulesList.less'
import {SVG} from "../../../utils/icons"
import {SearchField} from "../../../components/SearchField/SearchField"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Spin} from "antd"
import Pagination from "../../../components/Pagination/Pagination"
import {periodEnums} from "../CreateRulesWindow/RuleInformation"
import _ from 'lodash'
import {intervalEnums} from "../CreateRulesWindow/RuleSettings"
import {ParentStatus} from "../../Analytics/components/TableList/tableColumns"

const navigationTabs = ['rules', 'campaigns']

export const RulesList = ({activeTab, onSetActiveTab, selectedRule, onSelect, onDelete}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 10,
            searchStr: ''
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
        try {
            let arr = [],
                totalSize = 0

            if (activeTab === 'rules') {
                const {result} = await optimizationRulesServices.getRules(requestParams)
                arr = result.data
                totalSize = result.total_count
            } else {

                const {result} = await optimizationRulesServices.getCampaigns(requestParams)
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
            searchStr: ''
        })
    }

    useEffect(() => {
        getList()
    }, [requestParams, activeTab])

    useEffect(() => {
        if (activeTab === navigationTabs[0]) {
            if (selectedRule?.id && _.findIndex(list, {id: selectedRule.id}) === -1) {
                setList([
                    selectedRule,
                    ...list.splice(0, list.length - 1)
                ])

                setTotalSize(prevState => prevState + 1)
            } else {
                setList([
                    ...list.map(i => i.id === selectedRule.id ? ({
                        ...i,
                        name: selectedRule.name,
                        campaigns_count: selectedRule.campaigns_count || 0,
                        rules_count: selectedRule.rules_count || 0,
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
                onClick={() => changeTabHandler(i)}
                className={`tab ${activeTab === i ? 'active' : ''}`}>
                <SVG id={'list'}/>
                {i}
            </div>))}
        </div>

        <div className="search-block">
            <SearchField
                placeholder={activeTab === 'campaigns' ? 'Search by campaign name' : 'Search by rule’s name'}
                value={requestParams.searchStr}
                onSearch={searchStr => changePaginationHandler({searchStr, page: 1})}
            />
        </div>

        <div className="list">
            {processing && <div className='fetching-data'><Spin size={'large'}/></div>}

            {list.map(item => activeTab === 'rules' ? <div onClick={() => selectRuleHandler(item)}
                                                           className={`item rule ${selectedRule?.id === item.id ? 'active' : ''}`}>
                    <div className={`status ${item.active ? 'enabled' : 'paused'}`}/>
                    <div className="name">{item.name}</div>
                    <div className="description">{item.description}</div>
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
                </div>

                :

                <div className={`item campaign ${item.campaignId === selectedRule?.campaignId ? 'active' : ''}`}
                     onClick={() => selectRuleHandler(item)}>
                    <div className="row">
                        <div className="name">{item.name}</div>

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