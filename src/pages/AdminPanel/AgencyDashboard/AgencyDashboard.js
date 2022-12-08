import React, {useEffect, useState} from "react"
import './AgencyDashboard.less'
import CustomTable from "../../../components/Table/CustomTable"
import {numberColumns} from "../../Analytics/components/TableList/tableColumns"
import Pagination from "../../../components/Pagination/Pagination"
import {adminServices} from "../../../services/admin.services"
import {columns} from './columns'
import {Filters} from "./Filters"
import moment from "moment-timezone"
import {activeTimezone} from "../../index"

export const AgencyDashboard = () => {
    const [data, setData] = useState([]),
        [loading, setLoading] = useState(true),
        [requestData, setRequestData] = useState({
            attributionWindow: 7,
            dateFrom: moment().add(-6, 'days'),
            dateTo: moment(),
        })


    const getDataHandler = async () => {
        setLoading(true)
        try {
            const {result} = await adminServices.getAgencyDashboardData(requestData)
            console.log(result)
            setData(result)
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }

    const changeFiltersHandler = (data) => setRequestData(prevData => ({...prevData, ...data}))

    useEffect(() => {
        getDataHandler()
    }, [requestData])

    return (<section className={'agency-dashboard'}>
        <Filters
            {...requestData}
            onChange={changeFiltersHandler}
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