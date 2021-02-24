import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useDispatch, useSelector} from "react-redux"
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
import {analyticsActions} from "../../../../actions/analytics.actions"
import FastUpdateBlock from "./FastUpdateBlock/FastUpdateBlock"
import {notification} from "../../../../components/Notification"

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const CancelToken = axios.CancelToken
let source = null

const idKey = {
    'products': 'product',
    'products-regular': 'product',
    'products-parents': 'product',
    'overview': 'product',
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
                       location,
                       moreActions,
                       fixedColumns,
                       showPagination = true,
                       columnSelect = true,
                       showFilters = true,
                       searchField = true,
                       showTotal = true,
                       showOptions = true,
                       dateRange = true,
                       responseFilter = false,
                       expandedRowRender,
                       isParent,
                       showRowSelection = false,
                       rowKey
                   }) => {

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList')),
        sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') && JSON.parse(localStorage.getItem('analyticsSorterColumn')),
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') && JSON.parse(localStorage.getItem('analyticsTableOptions')),
        pageSizeFromLocalStorage = localStorage.getItem('analyticsPageSize') && JSON.parse(localStorage.getItem('analyticsPageSize'))


    const [tableData, setTableData] = useState([]),
        [fetchingStatus, setFetchingStatus] = useState(false),
        [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {}),
        [sorterColumn, setSorterColumn] = useState(sorterColumnFromLocalStorage ? sorterColumnFromLocalStorage : {}),
        [tableOptions, setTableOptions] = useState(tableOptionsFromLocalStorage ? tableOptionsFromLocalStorage : {}),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: pageSizeFromLocalStorage || 30,
            totalSize: 0,
        }),
        [selectedRows, setSelectedRows] = useState([]),
        [selectedAllRows, setSelectedAllRows] = useState(false)

    const dispatch = useDispatch()

    const {mainState, selectedRangeDate, metricsData, placementSegment} = useSelector(state => ({
        mainState: state.analytics.mainState,
        selectedRangeDate: state.analytics.selectedRangeDate,
        metricsData: state.analytics.metricsData,
        placementSegment: state.analytics.placementSegment,
    }))

    const localColumnBlackList = columnsBlackList[location] || [],
        localSorterColumn = sorterColumn[location] || undefined,
        localTableOptions = tableOptions[location] || {comparePreviousPeriod: false},
        filters = useSelector(state => state.analytics.filters[location] || [])


    const sortChangeHandler = (column) => {
        const setColumn = (data) => {
            setSorterColumn({
                ...sorterColumn,
                [location]: data
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
            [location]: value
        })
    }

    const dateRangeHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setDateRange({startDate: startDate || 'lifetime', endDate: endDate || 'lifetime'}))

        if (startDate === null) {
            setTableOptions(_.mapValues(tableOptions, (value) => ({...value, comparePreviousPeriod: false})))
        }
    }

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
            [location]: list
        })
    }

    const paginationChangeHandler = (params) => {
        localStorage.setItem('analyticsPageSize', params.pageSize)

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
            let filtersWithState = [
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

            if (location === 'placements') {
                filtersWithState.push({
                    filterBy: 'segment',
                    type: 'eq',
                    value: placementSegment
                })
            }

            if (isParent) {
                filtersWithState = [...filtersWithState.filter(item => item.filterBy !== 'productId')]

                filtersWithState.push({
                    filterBy: 'parent_productId',
                    type: 'eq',
                    value: mainState.productId
                })
            }

            const res = await analyticsServices.fetchTableData(location, paginationParams, localSorterColumn, filtersWithState, source.token)

            setPaginationParams({
                ...paginationParams,
                totalSize: res.total_count
            })

            if (res.response) {
                if (localTableOptions.comparePreviousPeriod) {
                    setTableData(res.response.map(item => ({
                        ...item,
                        compareWithPrevious: true
                    })))
                } else {
                    setTableData(res.response)
                }

                if (localTableOptions.comparePreviousPeriod && showOptions) {
                    getPreviousPeriodData(res.response.map(item => item[`${idKey[location]}Id`]))
                }
            }
            setFetchingStatus(false)

        } catch (e) {

        }
    }

    const getPreviousPeriodData = async (idList) => {
        source && source.cancel()
        source = CancelToken.source()

        if (selectedRangeDate.startDate !== 'lifetime') {
            try {
                const dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)

                let filtersWithState = [
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

                if (isParent) {
                    filtersWithState = [...filtersWithState.filter(item => item.filterBy !== 'productId')]
                }


                const res = await analyticsServices.fetchTableData(location, {
                    ...paginationParams,
                    page: 1
                }, localSorterColumn, filtersWithState, source.token, `&${idKey[location]}Id:in=${idList.join(',')}`)

                if (res.response) {
                    if (responseFilter) {
                        setTableData(prevState => {
                            return prevState.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.response, {placementName: item.placementName}), (value, key) => {
                                    return `${key}_prev`
                                })
                            }))
                        })
                    } else {
                        setTableData(prevState => {
                            return prevState.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.response, {[`${idKey[location]}Id`]: item[`${idKey[location]}Id`]}), (value, key) => {
                                    return `${key}_prev`
                                })
                            }))
                        })
                    }
                }
            } catch (e) {

            }
        }
    }

    const setChangesHandler = async (key, value) => {
        await setTableData([...tableData.map(item => {
            if (selectedRows.includes(item.campaignId)) {
                item[key] = value
            }

            return item
        })])

        notification.success({title: 'Success'})
        setSelectedAllRows(false)
        setSelectedRows([])
    }

    useEffect(() => {
        getData()
    }, [location, paginationParams.page, paginationParams.pageSize, sorterColumn, mainState, selectedRangeDate, tableOptions])

    useEffect(() => {
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
        getData()
    }, [filters, placementSegment])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsBlackList', JSON.stringify(columnsBlackList))
    }, [columnsBlackList])

    useEffect(() => {
        localStorage.setItem('analyticsSorterColumn', JSON.stringify(sorterColumn))
    }, [sorterColumn])

    useEffect(() => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify(tableOptions))
    }, [tableOptions])


    const rowSelection = {
        onChange: (rowsList, selectAll = false) => {
            setSelectedRows(rowsList)

            if (selectedRows.length === rowsList.length || selectAll) setSelectedAllRows(true)
            else setSelectedAllRows(false)
        }
    }

    return (
        <div className={'table-section'}>
            {selectedRows.length > 0 ? <FastUpdateBlock
                    {...paginationParams}
                    location={location}
                    selectedRows={selectedRows}
                    selectedAllOnPage={selectedAllRows}
                    columns={columns}

                    onClose={() => {
                        setSelectedAllRows(false)
                        setSelectedRows([])
                    }}
                    onSelectAll={() => setSelectedAllRows(true)}
                    onSetChanges={setChangesHandler}
                />
                :
                <div className="section-header">
                    {showFilters && <TableFilters
                        columns={columns}
                        filters={filters}
                        locationKey={location}
                        searchField={searchField}
                    />}

                    {moreActions}

                    {columnSelect && <ColumnsSelect
                        columns={columns}
                        columnsBlackList={localColumnBlackList}
                        onChangeBlackList={changeBlackListHandler}
                    />}

                    <ExpandWorkplace/>

                    {showOptions && <TableOptions
                        options={localTableOptions}
                        onChange={changeTableOptionsHandler}
                        selectedRangeDate={selectedRangeDate}
                    />}

                    {dateRange && <DateRange
                        onChange={dateRangeHandler}
                        selectedRangeDate={selectedRangeDate}
                        tableOptions={localTableOptions}
                    />}

                    <SwitchChartVisible/>
                </div>}


            <CustomTable
                loading={fetchingStatus}
                dataSource={responseFilter ? responseFilter(tableData) : tableData}
                {...showTotal && {
                    totalDataSource: {
                        ..._.mapValues(metricsData, (value) => (+value.value)),
                        ...{[showRowSelection ? columns[1].dataIndex : columns[0].dataIndex]: `Total: ${paginationParams.totalSize}`}
                    }
                }}

                rowKey={rowKey}
                {...showRowSelection && {rowSelection: rowSelection}}
                selectedAll={selectedAllRows}
                selectedRows={selectedRows}
                disabledRows={tableData.filter(item => item.state === 'archived').map(item => item[rowKey])}

                sorterColumn={localSorterColumn}
                columns={columns.filter(column => !localColumnBlackList.includes(column.key))}
                fixedColumns={fixedColumns}
                {...expandedRowRender && {expandedRowRender: (props) => expandedRowRender && expandedRowRender(props, localColumnBlackList)}}
                onChangeSorter={sortChangeHandler}
            />

            {paginationParams.totalSize !== 0 && showPagination && <Pagination
                {...paginationParams}

                pageSizeOptions={[10, 30, 50, 100, 200]}
                showQuickJumper={true}
                listLength={tableData.length}
                processing={fetchingStatus}

                onChange={paginationChangeHandler}
            />}
        </div>
    )
}

export default React.memo(TableList)
