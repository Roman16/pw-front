import React from "react"
import './ProblemsReport.less'
import Filters from "./Filters"
import CustomTable from "../../../components/Table/CustomTable"
import {scanningStatusEnums} from "../PPCAudit"
import loaderImg from "../../../assets/img/loader.svg"
import {history} from "../../../utils/history"
import Pagination from "../../../components/Pagination/Pagination"
import {issuesTypeEnums} from "../../PPCAutomate/Report/Filters/FilterItem"
import _ from 'lodash'
import TitleInfo from "../../../components/Table/renders/TitleInfo"

const columns = [
    {
        title: 'Severity',
        dataIndex: 'severity',
        key: 'severity',
        filter: true,
        sorter: true,
        width: '120px',
    },
    {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        filter: true,
        sorter: true,
        width: '150px',
        render: text => text ? text.replace(/([a-z])([A-Z])/g, '$1 $2') : ''
    },
    {
        title: 'Type',
        dataIndex: 'issueType',
        key: 'issueType',
        filter: true,
        sorter: true,
        width: '230px',
        render: (text, item) => item.type ? _.find(issuesTypeEnums, {key: item.type}) ? _.find(issuesTypeEnums, {key: item.type}).title : item.type : ''
    },
    {
        title: 'Object',
        dataIndex: 'object',
        key: 'object',
        filter: true,
        sorter: true,
        width: '200px',
        render: text => text ? text.replace(/([a-z])([A-Z])/g, '$1 $2') : ''
    },
    {
        title: 'Object Type',
        dataIndex: 'issueObjectType',
        key: 'issueObjectType',
        filter: true,
        sorter: true,
        width: '200px',
        render: (text, item) => item.object_type ? item.object_type.replace(/([a-z])([A-Z])/g, '$1 $2') : ''
    },
    {
        title: 'Issue',
        dataIndex: 'issue',
        key: 'issue',
        // filter: true,
        // sorter: true,
        minWidth: '250px',
        render: (text, item) => <div className={'issues-details'}>
            <span dangerouslySetInnerHTML={{__html: text}}/>

            <TitleInfo
                overlayClassName={'issues-details-tooltip'}
                info={item.issue_explain} position="left" type="info"
            />
        </div>
    },
]

const ProblemsReport = ({
                            data,
                            paginationParams,
                            filters,
                            sorterColumn,
                            requestProcessing,

                            scanningStatus,
                            onSetFilters,
                            fixProblemsHandler,
                            onChangePagination,
                            onSetSorterColumn
                        }) => {
    const processing = scanningStatus === scanningStatusEnums.PROCESSING

    const changeSorterColumnHandler = (col) => {
        if (sorterColumn.column === col) {
            if (sorterColumn.type === 'asc') {
                onSetSorterColumn({
                    column: col,
                    type: 'desc'
                })
            } else if (sorterColumn.type === 'desc') {
                onSetSorterColumn({
                    column: null,
                    type: 'asc'

                })
            }
        } else {
            onSetSorterColumn({
                column: col,
                type: 'asc'
            })
        }
    }

    return (<div className={`problems-report ${processing ? 'processing' : ''}`}>
        <Filters
            filters={filters}
            columns={columns}
            processing={processing}

            onSetFilters={onSetFilters}
            onFixProblems={fixProblemsHandler}
        />

        <div className="table-block">
            <CustomTable
                loading={processing || requestProcessing}
                dataSource={data.issues}
                sorterColumn={sorterColumn}
                emptyComponent={<NoTableData/>}

                columns={columns}
                rowClassName={(item) => item.severity ? item.severity.toLowerCase() : ''}

                onChangeSorter={changeSorterColumnHandler}
            />
            <Pagination
                page={paginationParams.page}
                pageSizeOptions={[10, 30, 50]}
                pageSize={paginationParams.pageSize}
                totalSize={+data.total_count}
                listLength={data.issues && data.issues.length}
                processing={processing || requestProcessing}
                disabled={processing}

                onChange={onChangePagination}
            />

        </div>

        {(processing) && <div className="load-data"><img src={loaderImg} alt=""/></div>}
    </div>)
}

const NoTableData = () => (<div className="empty-data-block">
    <svg width="178" height="128" viewBox="0 0 178 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="89" cy="109.169" rx="89" ry="15.831" fill="#F7F7F7"/>
        <path
            d="M33.1543 101.367H144.787C146.996 101.367 148.787 99.5761 148.787 97.367V21.0618C148.787 18.8526 146.996 17.0618 144.787 17.0618H65.8483H33.1543C30.9452 17.0618 29.1543 18.8526 29.1543 21.0618V97.367C29.1543 99.5761 30.9452 101.367 33.1543 101.367Z"
            fill="#D2D7E1"/>
        <path
            d="M44.4679 87.0732L135.955 84.3862C138.163 84.3213 139.9 82.4787 139.835 80.2705L137.587 3.99825C137.522 1.79007 135.679 0.0525602 133.471 0.117416L68.5001 2.02566L41.9846 2.80444C39.7764 2.8693 38.0391 4.71196 38.1042 6.92014L40.3518 83.1924C40.4169 85.4005 42.2598 87.1381 44.4679 87.0732Z"
            fill="#EDF0F5"/>
        <path opacity="0.3"
              d="M33.1543 104.378H144.787C146.996 104.378 148.787 102.587 148.787 100.378V32.1018C148.787 29.8927 146.996 28.1018 144.787 28.1018H75.223C73.7789 28.1018 72.447 27.3235 71.7381 26.0654L69.509 22.1092C68.8002 20.8511 67.4682 20.0728 66.0241 20.0728H33.1543C30.9452 20.0728 29.1543 21.8636 29.1543 24.0728V100.378C29.1543 102.587 30.9452 104.378 33.1543 104.378Z"
              fill="#C9CEDA"/>
        <path
            d="M33.1543 110.4H144.787C146.996 110.4 148.787 108.609 148.787 106.4V34.1236H72.7097C71.2656 34.1236 69.9337 33.3452 69.2248 32.0871L66.9957 28.1309C66.2869 26.8728 64.9549 26.0945 63.5108 26.0945H29.1543V106.4C29.1543 108.609 30.9452 110.4 33.1543 110.4Z"
            fill="#DCDFE6"/>
        <path
            d="M155.811 118.719C157.739 120.696 157.702 123.863 155.728 125.793C153.753 127.724 150.589 127.686 148.66 125.71L155.811 118.719ZM137.121 99.5658L155.811 118.719L148.66 125.71L129.971 106.557L137.121 99.5658Z"
            fill="#CFD4DF"/>
        <path
            d="M148.51 114.702C149.667 115.888 149.644 117.788 148.46 118.947C147.275 120.105 145.377 120.083 144.219 118.897L148.51 114.702ZM129.82 95.549L148.51 114.702L144.219 118.897L125.53 99.7435L129.82 95.549Z"
            fill="#CFD4DF"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
              fill="#C0C7D3"/>
        <mask id="mask0_21660_58178" maskUnits="userSpaceOnUse" x="93" y="61" width="41" height="42">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                  fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0_21660_58178)">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9722 113.459 61.9722C102.285 61.9722 93.2275 71.0391 93.2275 82.2238C93.2275 93.4085 102.285 102.475 113.459 102.475Z"
                  fill="#D2D7E1"/>
            <path d="M135.277 61.9722L101.955 108.432" stroke="#EDF0F5" stroke-width="3" stroke-linecap="round"/>
            <path d="M140.831 66.0046L107.509 112.464" stroke="#EDF0F5" stroke-width="7" stroke-linecap="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                  fill="#DCDFE6"/>
        </g>
    </svg>

    <h4>No problems found</h4>
    <p>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit. Ullamcorper non nec sit pharetra.</p>
</div>)

export default ProblemsReport