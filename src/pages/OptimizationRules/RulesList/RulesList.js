import React, {useEffect, useState} from "react"
import './RulesList.less'
import {SVG} from "../../../utils/icons"
import {SearchField} from "../../../components/SearchField/SearchField"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Spin} from "antd"
import Pagination from "../../../components/Pagination/Pagination"

const navigationTabs = ['rules', 'campaigns']

export const RulesList = ({activeTab, setActiveTab, selectedRule, onSelect}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 10,
            searchStr: ''
        })

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
            onSelect(arr[0])
        } catch (e) {

        }

        setProcessing(false)
    }

    const changePaginationHandler = (data) => setRequestParams(prevState => ({...prevState, data}))

    useEffect(() => {
        getList()
    }, [requestParams, activeTab])

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
            {processing && <div className='fetching-data'><Spin size={'large'}/></div>}

            {list.map(item => activeTab === 'rules' ? <div onClick={() => onSelect(item)}
                                                           className={`item rule ${selectedRule?.id === item.id ? 'active' : ''}`}>
                    <div className="name">{item.name}</div>
                    <div className="description">{item.description}</div>
                    <div className="details-row">
                        <div className="timeline">Last 3 days</div>
                        <div className="status">Auto • Lifetime</div>
                        <div className="campaigns-count">
                            Campaigns: <b>76</b>
                        </div>
                    </div>
                </div>

                :

                <div className={'item campaign'}>
                    <div className="name">{item.name}</div>
                    <div className="description">{item.description}</div>
                    <div className="details-row">
                        <div className="status">Auto • Lifetime</div>
                        <div className="campaigns-count">
                            Rules: <b>76</b>
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