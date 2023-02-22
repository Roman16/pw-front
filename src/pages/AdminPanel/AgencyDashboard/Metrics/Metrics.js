import React, {useEffect, useState} from "react"
import {Filters} from "./Filters"
import CustomTable from "../../../../components/Table/CustomTable"
import {columns as col} from "./columns"
import moment from "moment-timezone"
import {adminServices} from "../../../../services/admin.services"
import _ from "lodash"
import {updateLocaleStorage, updateUserInformation} from "../../Impersonations/Impersonations"
import {useDispatch} from "react-redux"
import {userService} from "../../../../services/user.services"
import {amazonRegionsSort} from "../../../../reducers/user.reducer"
import {userActions} from "../../../../actions/user.actions"
import {notification} from "../../../../components/Notification"

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

    const dispatch = useDispatch()

    const updateUserInformation = async (marketplace, regionId) => {
        const {result} = await userService.getAmazonRegionAccounts()

        result.forEach(item => ({
            ...item,
            amazon_region_account_marketplaces: amazonRegionsSort(item.amazon_region_account_marketplaces)
        }))

        const user = await userService.getUserPersonalInformation()

        dispatch(userActions.setInformation({userDetails: user.result}))

        if (result.length > 0) {
            const importStatus = await userService.checkImportStatus(regionId)

            dispatch(userActions.setInformation({importStatus: importStatus.result}))

            dispatch(userActions.setActiveRegion({
                region: result.find(i => i.amazon_region_account_marketplaces.find(m => m.marketplace_id === marketplace)),
                marketplace: result.find(i => i.amazon_region_account_marketplaces.find(m => m.marketplace_id === marketplace)).amazon_region_account_marketplaces.find(m => m.marketplace_id === marketplace)
            }))
        } else if (result.length === 0) {
            dispatch(userActions.setActiveRegion({
                region: null,
                marketplace: null
            }))
        }

        dispatch(userActions.setAmazonRegionAccounts(result))

        notification.success({title: 'Success!'})

        window.location.reload();
    }


    const impersonateHandler = async (email, marketplace, regionId) => {
        try {

            const res = await adminServices.impersonateUser(email, 'email')

            if (localStorage.getItem('adminToken')) {
                localStorage.setItem('token', res.result.access_token)
            } else {
                localStorage.setItem('adminToken', localStorage.getItem('token'))
                localStorage.setItem('token', res.result.access_token)
            }

            updateLocaleStorage()

            updateUserInformation(marketplace, regionId)
        } catch (e) {
            console.log(e)
        }

    }

    const columns = col(impersonateHandler)

    const getDataHandler = async () => {
        setLoading(true)
        try {
            let res

            if (requestData.comparePreviousPeriod) {
                const dateDiff = moment(requestData.dateTo).diff(moment(requestData.dateFrom), 'days')

                const [currentData, previousData] = await Promise.all([adminServices.getAgencyDashboardData({
                    ..._.omit({
                        ...requestData,
                        sorterColumn
                    }, 'comparePreviousPeriod')
                }), adminServices.getAgencyDashboardData({
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
                const {result} = await adminServices.getAgencyDashboardData({
                    ..._.omit({
                        ...requestData,
                        sorterColumn
                    }, 'comparePreviousPeriod')
                })
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