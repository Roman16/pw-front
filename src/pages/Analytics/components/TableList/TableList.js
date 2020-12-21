import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useSelector} from "react-redux"
import _ from 'lodash'
import './TableList.less'
import {analyticsServices} from "../../../../services/analytics.services"
import TableFilters from "../TableFilters/TableFilters"
import DateRange from "../DateRange/DateRange"
import ColumnsSelect from "./ColumnsSelect"
import axios from "axios"
import {Popover, Switch} from "antd"
import {SVG} from "../../../../utils/icons"
import TableOptions from "./TableOptions"
import moment from "moment"
import preciseDiff from "moment-precise-range-plugin"
import SwitchChartVisible from "./SwitchChartVisisble"
import ExpandWorkplace from "./ExpandWorkplace"

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const CancelToken = axios.CancelToken
let source = null

const idKey = {
    'products': 'product',
    'portfolios': 'portfolio',
    'campaigns': 'campaign',
    'placements': 'placement',
    'ad-groups': 'adGroup',
    'targetings': 'targeting',
    'negative-targetings': 'targeting',
    'product-ads': 'ad',
}


const TableList = ({
                       columns,
                       fixedColumns,
                       columnSelect = true,
                       dateRange = true,
                       showFilters = true,
                       showPagination = true,
                       moreActions,
                       showTotal = true
                   }) => {

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList')),
        sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') && JSON.parse(localStorage.getItem('analyticsSorterColumn')),
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') && JSON.parse(localStorage.getItem('analyticsTableOptions'))

    const [tableData, setTableData] = useState([]),
        [fetchingStatus, setFetchingStatus] = useState(false),
        [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {}),
        [sorterColumn, setSorterColumn] = useState(sorterColumnFromLocalStorage ? sorterColumnFromLocalStorage : {}),
        [tableOptions, setTableOptions] = useState(tableOptionsFromLocalStorage ? tableOptionsFromLocalStorage : {}),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 30,
            totalSize: 0,
        })


    const {locationKey, mainState, selectedRangeDate, metricsData} = useSelector(state => ({
        locationKey: state.analytics.location,
        mainState: state.analytics.mainState,
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsData: state.analytics.metricsData
    }))

    const localColumnBlackList = columnsBlackList[locationKey] || [],
        localSorterColumn = sorterColumn[locationKey] || undefined,
        localTableOptions = tableOptions[locationKey] || {comparePreviousPeriod: false},
        filters = useSelector(state => state.analytics.filters[locationKey] || [])


    const sortChangeHandler = (column) => {
        const setColumn = (data) => {
            setSorterColumn({
                ...sorterColumn,
                [locationKey]: data
            })
        }

        if (localSorterColumn && localSorterColumn.column === column) {
            if (localSorterColumn.type === 'asc') {
                setColumn({
                    column: column,
                    type: 'desc'

                })
            } else if (localSorterColumn.type === 'desc') {
                setColumn({
                    column: null,
                    type: 'asc'
                })
            }
        } else {
            setColumn({
                column: column,
                type: 'asc'
            })
        }

        setPaginationParams({
            ...paginationParams,
            page: 1,
        })
    }

    const changeTableOptionsHandler = (value) => {
        setTableOptions({
            ...tableOptions,
            [locationKey]: value
        })
    }

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
            [locationKey]: list
        })
    }

    const paginationChangeHandler = (params) => {
        setPaginationParams(prevState => ({
            ...prevState,
            ...params
        }))
    }

    const getData = async () => {
        document.querySelector('.table-overflow').scrollTop = 0

        setFetchingStatus(true)

        source && source.cancel()
        source = CancelToken.source()

        try {
            const filtersWithState = [
                ...filters,
                ...Object.keys(mainState).map(key => ({
                    filterBy: key,
                    type: 'eq',
                    value: mainState[key]
                })).filter(item => !!item.value),
                {
                    filterBy: 'datetime',
                    type: 'range',
                    value: selectedRangeDate
                },
            ]

            const res = await analyticsServices.fetchTableData(locationKey, paginationParams, localSorterColumn, filtersWithState, source.token)

            setPaginationParams({
                ...paginationParams,
                totalSize: res.total_count
            })

            if (res.response) {
                setTableData(res.response)

                if (localTableOptions.comparePreviousPeriod) {
                    getPreviousPeriodData(res.response.map(item => item[`${idKey[locationKey]}Id`]))
                }
            }
            setFetchingStatus(false)

        } catch (e) {

        }
    }

    const getPreviousPeriodData = async (idList) => {
        source && source.cancel()
        source = CancelToken.source()

        const dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)

        try {
            const filtersWithState = [
                ...filters,
                ...Object.keys(mainState).map(key => ({
                    filterBy: key,
                    type: 'eq',
                    value: mainState[key]
                })).filter(item => !!item.value),
                {
                    filterBy: 'datetime',
                    type: 'range',
                    value: {
                        startDate: moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff),
                        endDate: moment(selectedRangeDate.startDate).subtract(1, 'days')
                    }
                },
            ]

            const res = await analyticsServices.fetchTableData(locationKey, paginationParams, localSorterColumn, filtersWithState, source.token, `&${idKey[locationKey]}Id:in=${idList.join(',')}`)

            if (res.response) {
                setTableData(prevState => {

                    return prevState.map(item => ({
                        ...item,
                        compareWithPrevious: true,
                        ..._.mapKeys(_.find(res.response, {[`${idKey[locationKey]}Id`]: item[`${idKey[locationKey]}Id`]}), (value, key) => {
                            return `${key}_prev`
                        })
                    }))
                })
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        getData()
    }, [locationKey, paginationParams.page, paginationParams.pageSize, sorterColumn, mainState, selectedRangeDate, tableOptions])

    useEffect(() => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
        getData()
    }, [filters])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsBlackList', JSON.stringify(columnsBlackList))
    }, [columnsBlackList])

    useEffect(() => {
        localStorage.setItem('analyticsSorterColumn', JSON.stringify(sorterColumn))
    }, [sorterColumn])

    useEffect(() => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify(tableOptions))
    }, [tableOptions])

    return (
        <div className={'table-section'}>
            <div className="section-header">
                {showFilters && <TableFilters
                    columns={columns}
                    filters={filters}
                    locationKey={locationKey}
                />}

                {moreActions}

                {columnSelect && <ColumnsSelect
                    columns={columns}
                    columnsBlackList={localColumnBlackList}
                    onChangeBlackList={changeBlackListHandler}
                />}

                <ExpandWorkplace/>

                <TableOptions
                    options={localTableOptions}
                    onChange={changeTableOptionsHandler}
                />

                {dateRange && <DateRange/>}

                <SwitchChartVisible/>
            </div>

            <CustomTable
                loading={fetchingStatus}
                dataSource={tableData}
                {...showTotal && {
                    totalDataSource: {
                        ..._.mapValues(metricsData, (value) => (+value.value)),
                        ...{[columns[0].dataIndex]: `Total: ${paginationParams.totalSize}`}
                    }
                }}
                sorterColumn={localSorterColumn}
                columns={columns.filter(column => !localColumnBlackList.includes(column.key))}
                fixedColumns={fixedColumns}

                onChangeSorter={sortChangeHandler}
            />

            {paginationParams.totalSize !== 0 && showPagination && <Pagination
                {...paginationParams}

                pageSizeOptions={[10, 30, 50, 100, 200, 500]}
                showQuickJumper={true}
                listLength={tableData.length}
                processing={fetchingStatus}

                onChange={paginationChangeHandler}
            />}
        </div>
    )
}

export default React.memo(TableList)
