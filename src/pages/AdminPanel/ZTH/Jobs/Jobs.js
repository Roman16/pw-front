import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import './Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"
import CustomSelect from "../../../../components/Select/Select"
import {Input, Select} from "antd"

const Option = Select.Option

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        minWidth: '50px',
    },
    {
        title: 'Scheduled At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        minWidth: '150px',
        render: date => moment.utc(date).local().format('ddd MMM DD YYYY HH:mm:ss')
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        minWidth: '150px',
        render: date => moment.utc(date).local().format('ddd MMM DD YYYY HH:mm:ss')
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
        minWidth: '100px',
        render: status => (
            <>
                {status === 'DONE' && <span style={{color: 'green'}}>DONE</span>}
                {status === 'FAILED' && <span style={{color: 'red'}}>FAILED</span>}
            </>
        )
    },
    {
        title: 'Google Spreadsheet URL',
        dataIndex: 'googleSpreadsheetUrl',
        key: 'googleSpreadsheetUrl',
        minWidth: '200px',
        render: link => (
            link ? <a target={'_blank'} href={link}>Open</a> : <span>No Link</span>
        )
    },
    {
        title: 'Input Parameters',
        dataIndex: 'inputParametersLinkElement',
        key: 'inputParametersLinkElement',
        minWidth: '150px',
        render: (input, item) => (
            <a onclick="${this._saveInputParametersForJobFuncName}(${jobData.id})">Download</a>
        )
    },
    {
        title: 'Product Report',
        dataIndex: 'productReportLinkElement',
        key: 'productReportLinkElement',
        minWidth: '150px',
    },
    {
        title: 'Search Term Report',
        dataIndex: 'searchTermLinkElement',
        key: 'searchTermLinkElement',
        minWidth: '150px',
    },
    {
        title: 'Actions',
        dataIndex: 'restartJobButton',
        key: 'restartJobButton',
        minWidth: '100px',
    },
    {
        title: 'Error',
        dataIndex: 'errorText',
        key: 'errorText',
        minWidth: '100px',
    },
]

let timeoutId

const Jobs = () => {
    const [requestParams, setRequestParams] = useState({
        page: 1,
        limit: 200,
        title: ''
    })

    const getData = async () => {
        try {
            const res = await adminServices.fetchZthJobs(requestParams)

            console.log(res)
        } catch (e) {

        }
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
            <div className="pagination">
                <div className="form-group">
                    <label htmlFor="">Page:</label>
                    <CustomSelect>
                        <Option value={'1'}>1</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="">Search in Title:</label>
                    <Input
                        onChange={changeTitleFieldHandler}
                    />
                </div>
            </div>

            <CustomTable
                // loading={processing}
                columns={columns}
            />
        </section>
    )
}

export default Jobs
