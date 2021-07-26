import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import '../Jobs/Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"
import {Input, Select} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import {saveInputParameters} from "../../../../utils/saveFile"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

let timeoutId

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
        setJobsList([...jobsList.map(item => {
            if (item.id === id) item.status = 'IN_PROGRESS'
            return item
        })])

        try {
            await adminServices.restartZthJob(id)

        } catch (e) {
            console.log(e)
        }
    }

    const downloadSearchTermReportHandler = async id => {
        try {
            const res = await adminServices.downloadSearchTermReport(id)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
    const downloadProductReportHandler = async id => {
        try {
            const res = await adminServices.downloadProductReport(id)
            console.log(res)

        } catch (e) {
            console.log(e)
        }
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
            width: '250px',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '110px',
            render: status => (<>
                    {status === 'DONE' && <span style={{color: 'green'}}>DONE</span>}
                    {(status === 'ERROR' || status === 'FAILED') && <span style={{color: 'red'}}>{status}</span>}
                    {status === 'IN_PROGRESS' && <span style={{color: 'blue'}}>IN PROGRESS</span>}
                    {status === 'PENDING' && <span style={{color: 'orange'}}>PENDING</span>}
                </>
            )
        },
        {
            title: 'Google Spreadsheet URL',
            dataIndex: 'googleSpreadsheetUrl',
            key: 'googleSpreadsheetUrl',
            width: '200px',
            render: url => <a href={url} target={'_blank'} className={'google-url'} title={url}>Open</a>
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
                <button onClick={() => downloadSearchTermReportHandler(item.id)}>Download</button> :
                <span className={'no-file'}>No File</span>
        },
        {
            title: 'Product Report',
            dataIndex: 'productReportExists',
            key: 'productReportExists',
            width: '130px',
            render: (value, item) => value ?
                <button onClick={() => downloadProductReportHandler(item.id)}>Download</button> :
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
            minWidth: '200px',
            render: (errorText, item) => (item.status === 'ERROR' || item.status === 'FAILED') && errorText
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

export default CreationJobs
