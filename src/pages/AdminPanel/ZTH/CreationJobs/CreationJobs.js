import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import '../Jobs/Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"
import {Input, Select} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import {saveInputParameters} from "../../../../utils/saveFile"
import CustomSelect from "../../../../components/Select/Select"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

let timeoutId

const token = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : localStorage.getItem('token')

const CreationJobs = () => {
    const [jobsList, setJobsList] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            title: '',
            page: 1,
            pageSize: 200,
            status: ''
        })

    const _baseUrl = process.env.REACT_APP_ENV === 'production'
        ? `${process.env.REACT_APP_API_PROD}/api/agency-server/api/v1/` || ''
        : `${process.env.REACT_APP_API_URL}/api/agency-server/api/v1/` || ''

    const getZTHToken = () => {
        return localStorage.getItem('zthToken')
    }

    const getData = async () => {
        setProcessing(true)

        try {
            const res = await adminServices.fetchZthCreationJobs(requestParams)

            setTotalSize(res.totalCount)
            setJobsList(res.jobs)
        } catch (e) {

        }

        setProcessing(false)
    }

    const changeTitleFieldHandler = ({target: {value}}) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setRequestParams(prevState => ({
                ...prevState,
                page: 1,
                title: value
            }))
        }, 500)
    }

    useEffect(() => {
        getData()
    }, [requestParams])


    const restartHandler = async id => {
        try {
            await adminServices.restartZthJob(id)
            notification.success({title: `Successfully restarted Zero to Hero job with id: ${id}`})
            await getData()
        } catch (e) {
            console.log(e)
        }
    }

    const getZTHSearchTermReportDownloadPath = (jobId) => {
        return `${_baseUrl}zero-to-hero/creation-jobs/${jobId}/download-search-term-report?X-PW-Agency-ZTH-API-Token=${getZTHToken()}&token=${token}`
    }

    const getZTHProductReportDownloadPath = (jobId) => {
        return `${_baseUrl}zero-to-hero/creation-jobs/${jobId}/download-product-report?X-PW-Agency-ZTH-API-Token=${getZTHToken()}&token=${token}`
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '50px',
        },
        {
            title: 'Scheduled At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '150px',
            render: date => <span>{moment.utc(date).local().format('ddd MMM DD YYYY')}
                <br/> {moment.utc(date).local().format('YYYY HH:mm:ss')}</span>
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: '150px',
            render: date => <span>{moment.utc(date).local().format('ddd MMM DD YYYY')}
                <br/> {moment.utc(date).local().format('YYYY HH:mm:ss')}</span>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            minWidth: '250px',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '110px',
            render: status => <JobStatus status={status}/>
        },
        {
            title: 'Google Spreadsheet URL',
            dataIndex: 'googleSpreadsheetUrl',
            key: 'googleSpreadsheetUrl',
            width: '200px',
            render: url => url ?
                <a href={url} target={'_blank'} className={'google-url'} title={url}>Open</a> : 'No Link'
        },
        {
            title: 'Input Parameters',
            dataIndex: 'inputParameters',
            key: 'inputParameters',
            width: '150px',
            render: parameters => Object.keys(parameters).length > 0 &&
                <button onClick={() => saveInputParameters(parameters)}>Download</button>
        },
        {
            title: 'Search Term Report',
            dataIndex: 'searchTermReportExists',
            key: 'searchTermReportExists',
            width: '150px',
            render: (value, item) => value ?
                <a target="_blank" href={getZTHSearchTermReportDownloadPath(item.id)}>Download</a> :
                <span className={'no-file'}>No File</span>
        },
        {
            title: 'Product Report',
            dataIndex: 'productReportExists',
            key: 'productReportExists',
            width: '130px',
            render: (value, item) => value ?
                <a target="_blank" href={getZTHProductReportDownloadPath(item.id)}>Download</a> :
                <span className={'no-file'}>No File</span>
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            key: 'status',
            width: '100px',
            render: (status, item) => (status === 'ERROR' || status === 'FAILED') &&
                <button onClick={() => restartHandler(item.id)}>Restart</button>
        },
        {
            title: 'Error',
            dataIndex: 'errorText',
            key: 'errorText',
            width: '500px',
            render: (errorText, item) => (item.status === 'ERROR' || item.status === 'FAILED') &&
                <span className={'word-break'}> {errorText}</span>
        },
    ]


    return (
        <section className={'zth-jobs'}>
            <div className="filters">
                <div className="form-group">
                    <Input
                        placeholder={'Search in Title'}
                        onChange={changeTitleFieldHandler}
                    />
                </div>

                <div className="form-group">
                    <CustomSelect
                        placeholder={'Filter by status'}
                        getPopupContainer={trigger => trigger}
                        onChange={(value) => setRequestParams(prevState => ({...prevState, status: value}))}
                    >
                        <Option value={''}>No Filter</Option>
                        <Option value={'PENDING'}>PENDING</Option>
                        <Option value={'IN_PROGRESS'}>IN PROGRESS</Option>
                        <Option value={'DONE'}>DONE</Option>
                        <Option value={'FAILED'}>FAILED</Option>
                        <Option value={'ERROR'}>ERROR</Option>
                    </CustomSelect>
                </div>
            </div>

            <button className={'btn default refresh'} onClick={getData}>
                Refresh
            </button>

            <CustomTable
                loading={processing}
                columns={columns}
                dataSource={jobsList}
            />

            <Pagination
                onChange={(data) => setRequestParams(prevState => ({...prevState, ...data}))}

                pageSizeOptions={[10, 50, 100, 200]}
                showQuickJumper={true}
                listLength={jobsList.length}
                processing={processing}
                {...requestParams}
                totalSize={totalSize}
            />
        </section>
    )
}

export const JobStatus = ({status}) => {
    if (status === 'DONE') {
        return <span style={{color: 'green'}}>DONE</span>
    } else if (status === 'ERROR' || status === 'FAILED' || status === 'CANCELED') {
        return <span style={{color: 'red'}}>{status}</span>
    } else if (status === 'IN_PROGRESS') {
        return <span style={{color: 'blue'}}>IN PROGRESS</span>
    } else if (status === 'PENDING' || status === 'CREATED') {
        return <span style={{color: 'orange'}}>{status}</span>
    } else {
        return status
    }
}

export default CreationJobs
