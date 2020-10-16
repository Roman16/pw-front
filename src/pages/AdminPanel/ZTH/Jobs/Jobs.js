import React, {useEffect} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import './Jobs.less'
import {adminServices} from "../../../../services/admin.services"
import moment from "moment"

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

const Jobs = () => {

    const getData = async () => {
        try {
            const res = adminServices.fetchZthJobs()

            console.log(res)
        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={'zth-jobs'}>
            <CustomTable
                // loading={processing}
                columns={columns}
            />
        </section>
    )
}

export default Jobs
