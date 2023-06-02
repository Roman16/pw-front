import React, {useEffect, useState} from "react"
import './RuleDetails.less'
import {SVG} from "../../../../utils/icons"
import moment from "moment"
import TableFilters from "../../../Analytics/components/TableFilters/TableFilters"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"
import {Spin} from "antd"

const tabs = ['logs', 'statuses']

const columns = {
    'logs': [
        {
            title: 'Campaign Name',
            key: 'campaignName',
            dataIndex: 'campaignName',
            search: true
        },
        {
            title: 'Status',
            key: 'code',
            dataIndex: 'code',
            render: status => <Status status={status}/>
        },
        {
            title: 'Date',
            key: 'generatedAtDateTime',
            dataIndex: 'generatedAtDateTime',
            render: date => moment(date).format('DD-MM-YYYY HH:MM')
        },
        {
            title: 'Result',
            key: 'result',
            dataIndex: 'result',
            render: text => <div title={text} className="cut-text">{text}</div>
        },
    ],
    'statuses': [
        {
            title: 'Name',
            key: 'rule_name',
            dataIndex: 'rule_name',
            search: true
        },
        {
            title: 'Launch date',
            key: 'created_at',
            dataIndex: 'created_at',
            render: date => moment(date).format('DD-MM-YYYY HH:MM')
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => <Status status={status}/>
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: type => <div>{type === 'MANUAL' ? 'Manual' : 'Auto'}</div>
        },
    ]
}

export const RuleDetails = ({
                                selectedRule,

                                onActivate,
                                onPause
                            }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 10,
            filters: []
        }),
        [processing, setProcessing] = useState(true),
        [ruleData, setRuleData] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [activateProcessing, setActivateProcessing] = useState(false),
        [pauseProcessing, setPauseProcessing] = useState(false)


    const changeFiltersHandler = () => {

    }

    const changePagination = (params) => {
        setRequestParams({...requestParams, ...params})
    }

    const activateRuleHandler = () => {
        setActivateProcessing(true)

        onActivate(selectedRule.id, () => {
            setActivateProcessing(false)
        })
    }

    const pauseRuleHandler = () => {
        setPauseProcessing(true)

        onPause(selectedRule.id, () => {
            setPauseProcessing(false)
        })
    }

    const getRuleData = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices[activeTab === tabs[0] ? 'getLogs' : 'getStatuses']({
                ...requestParams,
                ruleId: selectedRule.id
            })

            setRuleData(result.data)
            setTotalSize(result.total_count)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    useEffect(() => {
        setRuleData([])

        selectedRule.id && getRuleData()
    }, [selectedRule.id, requestParams, activeTab])

    return (<div className="rule-details">
        <div className="actions">
            <h2>{selectedRule?.name}</h2>

            {selectedRule.id ? selectedRule.active ? <button
                    className="btn grey"
                    onClick={pauseRuleHandler}
                >
                    <SVG id={'pause'}/>
                    Pause

                    {pauseProcessing && <Spin size={'small'}/>}
                </button>
                :
                <button
                    disabled={activateProcessing}
                    className="btn default"
                    onClick={activateRuleHandler}
                >
                    <SVG id={'play-icon'}/>
                    Run

                    {activateProcessing && <Spin size={'small'}/>}
                </button>
                : ''}
        </div>

        {/*<ul className="statuses">*/}
        {/*    <li>*/}
        {/*        <SVG id={`optimization-changes`}/>*/}

        {/*        <div>*/}
        {/*            <h5>Total Changes</h5>*/}
        {/*            <h4>{0}</h4>*/}
        {/*        </div>*/}
        {/*    </li>*/}

        {/*    <li>*/}
        {/*        <SVG id={`optimization-Status`}/>*/}

        {/*        <div>*/}
        {/*            <h5>Status</h5>*/}
        {/*            <h4>{'Active'}</h4>*/}
        {/*        </div>*/}
        {/*    </li>*/}

        {/*    <li>*/}
        {/*        <SVG id={`optimization-start-date`}/>*/}

        {/*        <div>*/}
        {/*            <h5>Start Date</h5>*/}
        {/*            <h4>{moment().format('DD.MM.YYYY')}</h4>*/}
        {/*        </div>*/}
        {/*    </li>*/}


        {/*    <li>*/}
        {/*        <SVG id={`optimization-changes2`}/>*/}

        {/*        <div>*/}
        {/*            <h5>Today Changes</h5>*/}
        {/*            <h4>{0}</h4>*/}
        {/*        </div>*/}
        {/*    </li>*/}
        {/*</ul>*/}

        <div className="logs">
            <div className="tabs">
                <div className="container">
                    {tabs.map(i => <div onClick={() => setActiveTab(i)}
                                        className={`tab ${activeTab === i ? 'active' : ''}`}>{i}</div>)}
                </div>
            </div>

            {/*<div className="filters">*/}
            {/*    <TableFilters*/}
            {/*        columns={columns}*/}
            {/*        filters={requestParams.filters}*/}
            {/*        searchField={true}*/}
            {/*        onChange={changeFiltersHandler}*/}
            {/*    />*/}
            {/*</div>*/}


            <div className="table-block">
                <CustomTable
                    key={'table'}
                    dataSource={ruleData}
                    columns={columns[activeTab]}
                    loading={processing}
                />

                <Pagination
                    onChange={changePagination}
                    page={requestParams.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={requestParams.pageSize}
                    totalSize={totalSize}
                    listLength={ruleData.length}
                    processing={processing}
                />
            </div>

        </div>
    </div>)
}

const Status = ({status}) => {
    switch (status) {
        case 'CHECK_IN_PROGRESS':
        case 'APPLY_IN_PROGRESS':
            return (<div>Processing</div>)
        case 'FAILED':
        case 'CHECK_FAILED':
        case 'APPLY_FAILED':
            return (<div style={{color: '#FF5256'}}>Failed</div>)
        case 'CREATED':
        case 'COMPLETE':
            return (<div style={{color: '#7FD3A1'}}>Done</div>)
        case 'SUCCESS':
            return (<div style={{color: '#7FD3A1'}}>Success</div>)
        default:
            return (<div>{status}</div>)
    }
}