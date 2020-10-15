import React from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import './Jobs.less'
import {Input, Tabs} from "antd"
import SemanticCore from "../ConvertSemanticCore/SemanticCore"

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        minWidth: '50px',
    },
    {
        title: 'Scheduled At',
        dataIndex: 'id',
        key: 'id',
        minWidth: '150px',
    },
    {
        title: 'Updated At',
        dataIndex: 'id',
        key: 'id',
        minWidth: '150px',
    },
    {
        title: 'Title',
        dataIndex: 'id',
        key: 'id',
        minWidth: '250px',
    },
    {
        title: 'Status',
        dataIndex: 'id',
        key: 'id',
        minWidth: '100px',
    },
    {
        title: 'Google Spreadsheet URL',
        dataIndex: 'id',
        key: 'id',
        minWidth: '200px',
    },
    {
        title: 'Input Parameters',
        dataIndex: 'id',
        key: 'id',
        minWidth: '150px',
    },
    {
        title: 'Product Report',
        dataIndex: 'id',
        key: 'id',
        minWidth: '150px',
    },
    {
        title: 'Search Term Report',
        dataIndex: 'id',
        key: 'id',
        minWidth: '150px',
    },
    {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        minWidth: '100px',
    },
    {
        title: 'Error',
        dataIndex: 'id',
        key: 'id',
        minWidth: '100px',
    },
]

const Jobs = () => {
    return(
        <section className={'zth-jobs'}>
            <CustomTable
                // loading={processing}
                columns={columns}
            />
        </section>
    )
}

export default Jobs
