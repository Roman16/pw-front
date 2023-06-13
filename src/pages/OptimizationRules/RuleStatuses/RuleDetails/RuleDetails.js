import React, {useEffect, useState} from "react"
import './RuleDetails.less'
import {SVG} from "../../../../utils/icons"
import moment from "moment"
import TableFilters from "../../../AnalyticsV3/components/TableFilters/TableFilters"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"
import {Spin} from "antd"
import {activeTimezone} from "../../../index"

const tabs = ['logs', 'launches']

const statusEnums = {
    'CHECK_IN_PROGRESS': 'CHECK_IN_PROGRESS',
    'CHECK_COMPLETE': 'CHECK_COMPLETE',
    'CHECK_FAILED': 'CHECK_FAILED',
    'APPLY_IN_PROGRESS': 'APPLY_IN_PROGRESS',
    'APPLY_FAILED': 'APPLY_FAILED',
    'COMPLETE': 'COMPLETE',
    'CREATED': 'CREATED',
    'SUCCESS': 'SUCCESS',
    'FAILED': 'FAILED',
}

const columns = {
    'logs': [
        {
            title: 'Campaign',
            key: 'campaignName',
            dataIndex: 'campaignName',
            render: text => <div title={text} className="cut-text">{text}</div>,
            filter: true,
            sorter: true,
        },
        {
            title: 'Status',
            key: 'code',
            dataIndex: 'code',
            render: status => <Status status={status}/>,
            filter: true,
        },
        {
            title: 'Date',
            key: 'generatedAtDateTime',
            dataIndex: 'generatedAtDateTime',
            render: date => moment(date).tz(activeTimezone).format('DD-MM-YYYY HH:mm'),
            filter: true,
            sorter: true,
        },
        {
            title: 'Object Type',
            key: 'logType',
            dataIndex: 'logType',
            filter: false,
            visible: false
        },
        {
            title: 'Result',
            key: 'result',
            dataIndex: 'result',
            render: text => <div title={text} className="cut-text">{text}</div>,
        },
    ],
    'launches': [
        {
            title: 'Rule',
            key: 'rule_name',
            dataIndex: 'rule_name',
            search: true,
            render: text => <div title={text} className="cut-text">{text}</div>,
            filter: true,
            sorter: true,
        },
        {
            title: 'Launch date',
            key: 'created_at',
            dataIndex: 'created_at',
            render: date => moment(date).tz(activeTimezone).format('DD-MM-YYYY HH:mm'),
            filter: true,
            sorter: true,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => <Status status={status}/>,
            filter: true,
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: type => <div>{type === 'MANUAL' ? 'Manual' : 'Auto'}</div>,
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
        [sorterColumn, setSorterColumn] = useState({
            column: 'generatedAtDateTime',
            type: 'desc'
        }),
        [processing, setProcessing] = useState(true),
        [ruleData, setRuleData] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [activateProcessing, setActivateProcessing] = useState(false),
        [pauseProcessing, setPauseProcessing] = useState(false)


    const changeFiltersHandler = (data) => setRequestParams(prevState => ({...prevState, filters: data, page: 1}))

    const changePagination = (params) => {
        setRequestParams({...requestParams, ...params})
    }

    const activateRuleHandler = () => {
        setActivateProcessing(true)

        onActivate(selectedRule.id, () => {
            setActivateProcessing(false)

            if(activeTab=== tabs[1]) {
                getRuleData()
            }
        })
    }

    const changeTabHandler = (tab) => {
        if(tab === tabs[0]){
            setSorterColumn({
                column: 'generatedAtDateTime',
                type: 'desc'
            })
        } else{
            setSorterColumn({
                column: 'created_at',
                type: 'desc'
            })
        }

        setRequestParams(prevState => ({...prevState, filters: [], page: 1}))
        setActiveTab(tab)
    }

    const getRuleData = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices[activeTab === tabs[0] ? 'getLogs' : 'getStatuses']({
                ...requestParams,
                sorterColumn,
                ruleId: selectedRule.id
            })

            setRuleData(result.data)
            setTotalSize(result.total_count)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const sortChangeHandler = (column) => {
        setRequestParams(prevState => ({...prevState, page: 1}))

        if (column === 'generatedAtDateTime' || column === 'created_at') {
            if (sorterColumn && sorterColumn.column === column) {
                if (sorterColumn.type === 'desc') {
                    setSorterColumn({
                        column: column,
                        type: 'asc'

                    })
                } else if (sorterColumn.type === 'asc') {
                    setSorterColumn({
                        column: null,
                        type: 'desc'
                    })
                }
            } else {
                setSorterColumn({
                    column: column,
                    type: 'desc'
                })
            }
        } else {
            if (sorterColumn && sorterColumn.column === column) {
                if (sorterColumn.type === 'asc') {
                    setSorterColumn({
                        column: column,
                        type: 'desc'

                    })
                } else if (sorterColumn.type === 'desc') {
                    setSorterColumn({
                        column: null,
                        type: 'asc'
                    })
                }
            } else {
                setSorterColumn({
                    column: column,
                    type: 'asc'
                })
            }
        }
    }


    useEffect(() => {
        setRuleData([])

        selectedRule.id && getRuleData()
    }, [selectedRule.id, requestParams, activeTab])


    return (<div className="rule-details">
        <div className="actions">
            <h2>{selectedRule?.name}</h2>

            {selectedRule.id && (selectedRule.launch_status === statusEnums['CHECK_FAILED'] || selectedRule.launch_status === statusEnums['APPLY_FAILED'] || selectedRule.launch_status === statusEnums['COMPLETE'] || selectedRule.launch_status === null) ?
                <button
                    disabled={activateProcessing}
                    className="btn default"
                    onClick={activateRuleHandler}
                >
                    <SVG id={'play-icon'}/>
                    Run

                    {activateProcessing && <Spin size={'small'}/>}
                </button>
                :
                <button
                    className="btn grey"
                    disabled
                >
                    Processing
                </button>
            }
        </div>


        <div className={`logs ${activeTab}`}>
            <div className="tabs">
                <div className="container">
                    {tabs.map(i => <div onClick={() => changeTabHandler(i)}
                                        className={`tab ${activeTab === i ? 'active' : ''}`}>{i}</div>)}
                </div>
            </div>

            {activeTab === tabs[0] && <div className="filters">
                <TableFilters
                    columns={columns[activeTab]}
                    filters={requestParams.filters}
                    searchField={false}
                    onChange={changeFiltersHandler}
                />
            </div>}


            <div className="table-block">
                <CustomTable
                    key={'table'}
                    dataSource={ruleData}
                    columns={columns[activeTab]}
                    loading={processing}
                    sorterColumn={sorterColumn}

                    onChangeSorter={sortChangeHandler}
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
        case statusEnums['CHECK_IN_PROGRESS']:
        case statusEnums['CHECK_COMPLETE']:
        case statusEnums['CREATED']:
        case statusEnums['APPLY_IN_PROGRESS']:
            return (<div>Processing</div>)
        case statusEnums['CHECK_FAILED']:
        case statusEnums['APPLY_FAILED']:
        case statusEnums['FAILED']:
            return (<div style={{color: '#FF5256'}}>Failed</div>)
        case statusEnums['COMPLETE']:
        case null:
            return (<div style={{color: '#7FD3A1'}}>Done</div>)
        case statusEnums['SUCCESS']:
            return (<div style={{color: '#7FD3A1'}}>Success</div>)
        default:
            return (<div>{status}</div>)
    }
}