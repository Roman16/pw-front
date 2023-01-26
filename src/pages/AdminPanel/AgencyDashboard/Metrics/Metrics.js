import React, {useEffect, useState} from "react"
import {Filters} from "./Filters"
import CustomTable from "../../../../components/Table/CustomTable"
import {columns} from "./columns"
import moment from "moment-timezone"
import {adminServices} from "../../../../services/admin.services"
import _ from "lodash"

export const Metrics = () => {
    const [data, setData] = useState([]),
        [loading, setLoading] = useState(true),
        [requestData, setRequestData] = useState({
            attributionWindow: 7,
            dateFrom: moment().add(-6, 'days'),
            dateTo: moment(),
            comparePreviousPeriod: false,
            filters: []
        }),
        [sorterColumn, setSorterColumn] = useState({
            column: undefined,
            type: undefined
        })

    const getDataHandler = async () => {
        setLoading(true)
        try {
            let res

            if (requestData.comparePreviousPeriod) {
                const dateDiff = moment(requestData.dateTo).diff(moment(requestData.dateFrom), 'days')

                const [currentData, previousData] = await Promise.all([adminServices.getAgencyDashboardData({..._.omit({...requestData, sorterColumn}, 'comparePreviousPeriod')}), adminServices.getAgencyDashboardData({
                    attributionWindow: requestData.attributionWindow,
                    dateFrom: moment(requestData.dateFrom).add(-(dateDiff + 1), 'days'),
                    dateTo: moment(requestData.dateFrom).add(-1, 'days'),
                    sorterColumn,
                    filters: requestData.filters
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
                const {result} = await adminServices.getAgencyDashboardData({..._.omit({...requestData, sorterColumn}, 'comparePreviousPeriod')})
                res = result
            }

            setData(res)
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }

    const changeFiltersHandler = (data) => setRequestData(prevData => ({...prevData, ...data}))

    const changeSorterHandler = (column) => {
        if (sorterColumn && sorterColumn.column === column) {
            if (sorterColumn.type === 'asc') {
                setSorterColumn({
                    column: column,
                    type: 'desc'

                })
            } else if (sorterColumn.type === 'desc') {
                setSorterColumn({
                    column: null,
                    type: 'asc'
                })
            }
        } else {
            setSorterColumn({
                column: column,
                type: 'asc'
            })
        }
    }

    useEffect(() => {
        getDataHandler()
    }, [requestData, sorterColumn])

    return <div className={'metrics-section'}>
        <Filters
            {...requestData}
            columns={columns}
            onChange={changeFiltersHandler}
        />

        <div className="table-block">
            <CustomTable
                loading={loading}
                dataSource={data}
                columns={columns}
                sorterColumn={sorterColumn}

                onChangeSorter={changeSorterHandler}
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
    </div>
}