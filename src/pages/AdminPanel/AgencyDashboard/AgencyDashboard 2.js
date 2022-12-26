import React, {useEffect, useState} from "react"
import './AgencyDashboard.less'
import CustomTable from "../../../components/Table/CustomTable"
import {numberColumns} from "../../Analytics/components/TableList/tableColumns"
import Pagination from "../../../components/Pagination/Pagination"
import {adminServices} from "../../../services/admin.services"
import {columns} from './columns'
import {Filters} from "./Filters"

export const AgencyDashboard = () => {
    const [data, setData] = useState([]),
        [totalCount, setTotalCount] = useState(0),
        [loading, setLoading] = useState(true),
        [requestData, setRequestData] = useState({
            attributionWindow: 7,
            dateFrom: '',
            dateTo: '',
            page: 1,
            pageSize: 10
        })


    const getDataHandler = async () => {
        setLoading(true)
        try {
            const {response} = await adminServices.getAgencyDashboardData(requestData)
            console.log(response)
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }

    const paginationChangeHandler = () => {

    }


    useEffect(() => {
        getDataHandler()
    }, [])

    return (<section className={'agency-dashboard'}>
        <Filters
            {...requestData}
        />

        <div className="table-block">
            <CustomTable
                loading={loading}
                dataSource={data}
                columns={columns}
            />

            {/*<Pagination*/}
            {/*    totalSize={totalCount}*/}
            {/*    pageSizeOptions={[10, 30, 50, 100, 200]}*/}
            {/*    pageSize={requestData.pageSize}*/}
            {/*    showQuickJumper={true}*/}
            {/*    listLength={data.length}*/}
            {/*    processing={loading}*/}

            {/*    onChange={paginationChangeHandler}*/}
            {/*/>*/}
        </div>
    </section>)
}