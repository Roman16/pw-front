import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import './Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"
import {Input, Select} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import {saveInputParameters} from "../../../../utils/saveFile"
import CustomSelect from "../../../../components/Select/Select"
import {JobStatus} from "../CreationJobs/CreationJobs"

const Option = Select.Option

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
        render: date => <span>{moment.utc(date).local().format('ddd MMM DD')}
            <br/> {moment.utc(date).local().format('YYYY HH:mm:ss')}</span>
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: '150px',
        render: date => <span>{moment.utc(date).local().format('ddd MMM DD')}
            <br/> {moment.utc(date).local().format('YYYY HH:mm:ss')}</span>
    },
    {
        title: 'User Id',
        dataIndex: 'userId',
        key: 'userId',
        width: '80px',
    },
    {
        title: 'User Email',
        dataIndex: 'userEmail',
        key: 'userEmail',
        width: '200px',
    },
    {
        title: 'Username',
        dataIndex: 'userName',
        key: 'userName',
        width: '200px',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '250px',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '110px',
        render: status => <JobStatus status={status}/>
    },
    {
        title: 'SC URL',
        dataIndex: 'googleSpreadsheetUrl',
        key: 'googleSpreadsheetUrl',
        width: '100px',
        render: url => <a href={url} target={'_blank'} className={'google-url'} title={url}>Open</a>
    },
    {
        title: 'Parameters',
        dataIndex: 'inputParameters',
        key: 'inputParameters',
        width: '100px',
        render: parameters => Object.keys(parameters).length > 0 &&
            <button onClick={() => saveInputParameters(parameters)}>Download</button>
    },
    {
        title: 'Error',
        dataIndex: 'errorText',
        key: 'errorText',
        minWidth: '200px',
        render: (errorText, item) => (item.status === 'ERROR' || item.status === 'FAILED') && errorText
    },
]

let timeoutId

const Jobs = () => {
    const [jobsList, setJobsList] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            title: '',
            page: 1,
            pageSize: 200,
            status: ''
        })

    const getData = async () => {
        setProcessing(true)

        try {
            const res = await adminServices.fetchZthJobs(requestParams)

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
                        <Option value={'CREATED'}>CREATED</Option>
                        <Option value={'IN_PROGRESS'}>IN PROGRESS</Option>
                        <Option value={'DONE'}>DONE</Option>
                        <Option value={'FAILED'}>FAILED</Option>
                        <Option value={'ERROR'}>ERROR</Option>
                        <Option value={'CANCELED'}>CANCELED</Option>
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

export default Jobs
