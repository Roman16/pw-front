import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import './Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"
import {Input} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"

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
        width: '200px',
        render: date => moment.utc(date).local().format('ddd MMM DD YYYY HH:mm:ss')
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: '200px',
        render: date => moment.utc(date).local().format('ddd MMM DD YYYY HH:mm:ss')
    },
    {
        title: 'User Id',
        dataIndex: 'userId',
        key: 'userId',
        width: '100px',
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
        width: '150px',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        render: status => (<>
                {status === 'DONE' && <span style={{color: '#259B25'}}>DONE</span>}
                {(status === 'ERROR' || status === 'FAILED') && <span style={{color: '#D66744'}}>{status}</span>}
                {status === 'IN_PROGRESS' && <span style={{color: '#EEBB81'}}>IN PROGRESS</span>}
                {status === 'PENDING' && <span style={{color: '#656A84'}}>PENDING</span>}
            </>
        )
    },
    {
        title: 'SC URL',
        dataIndex: 'googleSpreadsheetUrl',
        key: 'googleSpreadsheetUrl',
        width: '150px',
        render: url => <a href={url} target={'_blank'} className={'google-url'} title={url}>{url}</a>
    },
    {
        title: 'Parameters',
        dataIndex: 'inputParameters',
        key: 'inputParameters',
        width: '100px',
        render: parameters => Object.keys(parameters).length > 0 && <button>Save</button>
    },
    {
        title: 'Error',
        dataIndex: 'errorText',
        key: 'errorText',
        render: (errorText, item) => item.status === 'ERROR' && errorText
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
            pageSize: 50,
            totalSize: 0,
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
            <div className="form-group">
                <Input
                    placeholder={'Search in Title'}
                    onChange={changeTitleFieldHandler}
                />
            </div>

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
            />
        </section>
    )
}

export default Jobs
