import React, {useEffect, useState} from "react"
import './RulesList.less'
import {SVG} from "../../../utils/icons"
import {SearchField} from "../../../components/SearchField/SearchField"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"

const navigationTabs = ['rules', 'campaigns']

export const RulesList = ({activeTab, setActiveTab}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            searchStr: ''
        })

    const getList = async () => {
        setProcessing(true)
        setList([])
        try {
            if (activeTab === 'rules') {
                const {result} = await optimizationRulesServices.getRules(requestParams)
                setList(result.response)
            } else {
                const {result} = await optimizationRulesServices.getCampaigns(requestParams)
                setList(result.response)
            }

        } catch (e) {

        }

        setProcessing(false)
    }

    useEffect(() => {
        getList()
    }, [requestParams])

    return (<div className="rules-list">
        <div className="tabs">
            {navigationTabs.map(i => (<div
                onClick={() => setActiveTab(i)}
                className={`tab ${activeTab === i ? 'active' : ''}`}>
                <SVG id={'list'}/>
                {i}
            </div>))}
        </div>

        <div className="search-block">
            <SearchField
                placeholder={activeTab === 'campaigns' ? 'Search by campaign name' : 'Search by rule’s name'}
                // value={searchValue}
                // onSearch={changeSearchHandler}
            />
        </div>

        <div className="list">
            <div className="item rule active">
                <div className="name">Only for big Campaigns rule</div>
                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut
                </div>
                <div className="details-row">
                    <div className="timeline">Last 3 days</div>
                    <div className="status">Auto • Lifetime</div>
                    <div className="campaigns-count">
                        Campaigns: <b>76</b>
                    </div>
                </div>
            </div>
            <div className="item rule">
                <div className="running-status"/>

                <div className="name">Only for big Campaigns rule</div>
                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut
                </div>
                <div className="details-row">
                    <div className="timeline">Last 3 days</div>
                    <div className="status">Auto • Lifetime</div>
                    <div className="campaigns-count">
                        Campaigns: <b>76</b>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}