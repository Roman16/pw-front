import React, {useState} from "react"
import './RuleDetails.less'
import {SVG} from "../../../../utils/icons"
import moment from "moment"
import TableFilters from "../../../Analytics/components/TableFilters/TableFilters"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"

const tabs = ['logs', 'statuses']

const columns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        search: true
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Log',
        key: 'log',
        dataIndex: 'log',
    },
]

export const RuleDetails = ({
                                name = 'testName'
                            }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 10,
            filters: []
        }),
        [processing, setProcessing] = useState(true),
        [logsData, setLogsData] = useState([]),
        [totalSize, setTotalSize] = useState(0)


    const changeFiltersHandler = () => {

    }

    const changePagination = () => {

    }

    return (<div className="rule-details">
        <div className="actions">
            <h2>{name}</h2>

            <button className="btn default">
                <SVG id={'play-icon'}/>
                Run
            </button>
        </div>

        <ul className="statuses">
            <li>
                <SVG id={`optimization-changes`}/>

                <div>
                    <h5>Total Changes</h5>
                    <h4>{0}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-Status`}/>

                <div>
                    <h5>Status</h5>
                    <h4>{'Active'}</h4>
                </div>
            </li>

            <li>
                <SVG id={`optimization-start-date`}/>

                <div>
                    <h5>Start Date</h5>
                    <h4>{moment().format('DD.MM.YYYY')}</h4>
                </div>
            </li>


            <li>
                <SVG id={`optimization-changes2`}/>

                <div>
                    <h5>Today Changes</h5>
                    <h4>{0}</h4>
                </div>
            </li>
        </ul>

        <div className="logs">
            <div className="tabs">
                <div className="container">
                    {tabs.map(i => <div onClick={() => setActiveTab(i)}
                                        className={`tab ${activeTab === i ? 'active' : ''}`}>{i}</div>)}
                </div>
            </div>

            <div className="filters">
                <TableFilters
                    columns={columns}
                    filters={requestParams.filters}
                    searchField={true}
                    onChange={changeFiltersHandler}
                />
            </div>


            <div className="table-block">
                <CustomTable
                    key={'table'}
                    dataSource={logsData}
                    columns={columns}
                    loading={processing}
                />

                <Pagination
                    onChange={changePagination}
                    page={requestParams.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={requestParams.pageSize}
                    totalSize={totalSize}
                    listLength={logsData.length}
                    processing={processing}
                />
            </div>

        </div>
    </div>)
}