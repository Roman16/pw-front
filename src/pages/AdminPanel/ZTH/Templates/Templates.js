import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {adminServices} from "../../../../services/admin.services"


const columns = [
    {
        title: 'Date released',
        dataIndex: 'dateReleased',
        key: 'dateReleased',
        width: '120px',
    },
    {
        title: 'Version',
        dataIndex: 'version',
        key: 'version',
        width: '80px',
    },
    {
        title: 'Lowest compatible version',
        dataIndex: 'lowestCompatibleVersion',
        key: 'lowestCompatibleVersion',
        width: '200px',
    },
    {
        title: 'Link',
        dataIndex: 'templateVersionLink',
        key: 'templateVersionLink',
        width: '200px',
        render: link => <a href={link} target={'_blank'}>Click to open template</a>
    },
    {
        title: 'Changelog',
        dataIndex: 'changelog',
        key: 'changelog',
        render: changelog => <ul className={'align-left'}>{changelog.map(text => <li>{text}</li>)}</ul>
    }
]

const Templates = () => {
    const [templatesList, setTemplatesList] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 200,
        })

    const getData = async () => {
        setProcessing(true)

        try {
            const res = await adminServices.fetchZthTemplates(requestParams)

            setTotalSize(res.count)
            setTemplatesList(res.templates)
        } catch (e) {

        }

        setProcessing(false)
    }

    useEffect(() => {
        getData()
    }, [requestParams])

    return (
        <section className={'zth-jobs zth-templates'}>
            <CustomTable
                loading={processing}
                columns={columns}
                dataSource={templatesList}
            />

            {/*<Pagination*/}
            {/*    onChange={(data) => setRequestParams(prevState => ({...prevState, ...data}))}*/}

            {/*    pageSizeOptions={[10, 50, 100, 200]}*/}
            {/*    showQuickJumper={true}*/}
            {/*    listLength={templatesList.length}*/}
            {/*    processing={processing}*/}
            {/*    {...requestParams}*/}
            {/*    totalSize={totalSize}*/}
            {/*/>*/}
        </section>
    )
}

export default Templates