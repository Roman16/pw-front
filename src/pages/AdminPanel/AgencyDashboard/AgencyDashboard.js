import React, {useEffect, useState} from "react"
import './AgencyDashboard.less'
import CustomTable from "../../../components/Table/CustomTable"
import {adminServices} from "../../../services/admin.services"
import {columns} from './columns'
import {Filters} from "./Filters"
import moment from "moment-timezone"
import _ from 'lodash'


export const AgencyDashboard = () => {
    const [data, setData] = useState([]),
        [loading, setLoading] = useState(true),
        [requestData, setRequestData] = useState({
            attributionWindow: 7,
            dateFrom: moment().add(-6, 'days'),
            dateTo: moment(),
            comparePreviousPeriod: false
        })


    const getDataHandler = async () => {
        setLoading(true)
        try {
            let res

            if (requestData.comparePreviousPeriod) {
                const dateDiff = moment(requestData.dateTo).diff(moment(requestData.dateFrom), 'days')

                const [currentData, previousData] = await Promise.all([adminServices.getAgencyDashboardData({..._.omit(requestData, 'comparePreviousPeriod')}), adminServices.getAgencyDashboardData({
                    attributionWindow: requestData.attributionWindow,
                    dateFrom: moment(requestData.dateFrom).add(-(dateDiff + 1), 'days'),
                    dateTo: moment(requestData.dateFrom).add(-1, 'days'),
                })])

                res = currentData.result.map((i, index) => {
                    const obj = {...i, compareWithPrevious: true}

                    columns.forEach((column) => {
                        if (column.key !== 'name') {
                            obj[`${column.key}_prev`] = previousData.result[index][column.key]
                        }
                    })

                    return (obj)
                })
            } else {
                const {result} = await adminServices.getAgencyDashboardData({..._.omit(requestData, 'comparePreviousPeriod')})
                res = result
            }

            setData(res)
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