import React, {useEffect, useState} from "react"
import '../RuleDetails/RuleDetails.less'
import moment from "moment"
import TableFilters from "../../../AnalyticsV3/components/TableFilters/TableFilters"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"
import {activeTimezone} from "../../../index"

const tabs = ['logs', 'launches']

const columns = {
    'logs': [
        {
            title: 'Campaign',
            key: 'campaignName',
            dataIndex: 'campaignName',
            filter: true,
            sorter: true,
            render: text => <div title={text} className="cut-text">{text}</div>
        },
        {
            title: 'Date',
            key: 'generatedAtDateTime',
            dataIndex: 'generatedAtDateTime',
            filter: true,
            sorter: true,
            render: date => moment(date).tz(activeTimezone).format('DD-MM-YYYY HH:mm'),
        },
        {
            title: 'Status',
            key: 'code',
            dataIndex: 'code',
            filter: true,
            render: status => <Status status={status}/>,

        },
        {
            title: 'Object Type',
            key: 'entityType',
            dataIndex: 'entityType',
            filter: true,
            visible: false
        },
        {
            title: 'Result',
            key: 'result',
            dataIndex: 'result',
            render: text => <div title={text} className="cut-text">{text}</div>
        },
    ],
    'launches': [
        {
            title: 'Rule',
            key: 'rule_name',
            dataIndex: 'rule_name',
            filter: true,
            sorter: true,
            render: text => <div title={text} className="cut-text">{text}</div>,
        },
        {
            title: 'Launch date',
            key: 'created_at',
            dataIndex: 'created_at',
            filter: true,
            sorter: true,
            render: date => moment(date).tz(activeTimezone).format('DD-MM-YYYY HH:mm'),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filter: true,
            render: status => <Status status={status}/>,
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            filter: true,
            render: type => <div>{type === 'MANUAL' ? 'Manual' : 'Auto'}</div>,
        },
    ]
}

export const CampaignDetails = ({
                                    selectedCampaign,
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
        [totalSize, setTotalSize] = useState(0)


    const changeFiltersHandler = (data) => setRequestParams(prevState => ({...prevState, filters: data, page: 1}))

    const changePagination = (params) => {
        setRequestParams({...requestParams, ...params})
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
                campaignId: selectedCampaign.campaignId
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

        selectedCampaign.campaignId && getRuleData()
    }, [selectedCampaign.campaignId, requestParams, activeTab])

    return (<div className="rule-details">
        <div className="actions">
            <h2>{selectedCampaign?.name}</h2>
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