import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"
import {useDispatch, useSelector} from "react-redux"
import _ from 'lodash'
import '../../components/TableList/TableList.less'
import {analyticsServices} from "../../../../services/analytics.services"
import TableFilters from "../../components/TableFilters/TableFilters"
import DateRange from "../../components/DateRange/DateRange"
import ColumnsSelect from "../../components/TableList/ColumnsSelect"
import axios from "axios"
import {Popover, Switch} from "antd"
import {SVG} from "../../../../utils/icons"
import TableOptions from "../../components/TableList/TableOptions"
import moment from "moment"
import preciseDiff from "moment-precise-range-plugin"
import SwitchChartVisible from "../../components/TableList/SwitchChartVisisble"
import ExpandWorkplace from "../../components/TableList/ExpandWorkplace"
import {analyticsActions} from "../../../../actions/analytics.actions"

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const idKey = {
    'products': 'product',
    'products-regular': 'product',
    'products-parents': 'product',
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
                       dateRange = true,
                       expandedRowRender,
                       metricsData,
                       localTableOptions,
                       tableData,
                       tableRequestParams,
                       onChange,
                       fetching,
                       localSorterColumn,
                       onChangeSorterColumn,
                       onChangeTableOptions
                   }) => {

    const columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList'))

    const [columnsBlackList, setColumnsBlackList] = useState(columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {})

    const dispatch = useDispatch()

    const {selectedRangeDate} = useSelector(state => ({
        selectedRangeDate: state.analytics.selectedRangeDate,
    }))

    const localColumnBlackList = columnsBlackList[location] || [],
        filters = useSelector(state => state.analytics.filters[location] || [])

    const sortChangeHandler = (column) => {
        const setColumn = (data) => {
            onChangeSorterColumn(data)
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
    }


    const dateRangeHandler = (startDate, endDate) => {
        dispatch(analyticsActions.setDateRange({startDate: startDate || 'lifetime', endDate: endDate || 'lifetime'}))

        // if (startDate === null) {
        //     setTableOptions(_.mapValues(tableOptions, (value) => ({...value, comparePreviousPeriod: false})))
        // }
    }

    const changeBlackListHandler = (list) => {
        setColumnsBlackList({
            ...columnsBlackList,
            [location]: list
        })
    }

    const paginationChangeHandler = (params) => {
        onChange({
            ...tableRequestParams,
            ...params
        })
    }

    // const getData = async () => {
    //     document.querySelector('.table-overflow').scrollTop = 0
    //
    //     setFetchingStatus(true)
    //
    //     source && source.cancel()
    //     source = CancelToken.source()
    //
    //     try {
    //         const filtersWithState = [
    //             ...filters,
    //             ...Object.keys(mainState).map(key => ({
    //                 filterBy: key,
    //                 type: 'eq',
    //                 value: mainState[key]
    //             })).filter(item => !!item.value),
    //             {
    //                 filterBy: 'datetime',
    //                 type: 'range',
    //                 value: selectedRangeDate
    //             },
    //         ]
    //
    //         if (location === 'placements') {
    //             filtersWithState.push({
    //                 filterBy: 'segment',
    //                 type: 'eq',
    //                 value: placementSegment
    //             })
    //         }
    //
    //         const res = await analyticsServices.fetchTableDataV2(location, paginationParams, localSorterColumn, filtersWithState, source.token)
    //         console.log(res)
    //         setPaginationParams({
    //             ...paginationParams,
    //             totalSize: res.total_count
    //         })
    //
    //         if (res.response) {
    //             setTableData(res.response)
    //
    //             if (localTableOptions.comparePreviousPeriod) {
    //                 getPreviousPeriodData(res.response.map(item => item[`${idKey[location]}Id`]))
    //             }
    //         }
    //         setFetchingStatus(false)
    //
    //     } catch (e) {
    //
    //     }
    // }

    // const getPreviousPeriodData = async (idList) => {
    //     source && source.cancel()
    //     source = CancelToken.source()
    //
    //     if (selectedRangeDate.startDate !== 'lifetime') {
    //         try {
    //             const dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)
    //
    //             const filtersWithState = [
    //                 ...filters,
    //                 ...Object.keys(mainState).map(key => ({
    //                     filterBy: key,
    //                     type: 'eq',
    //                     value: mainState[key]
    //                 })).filter(item => !!item.value),
    //                 {
    //                     filterBy: 'datetime',
    //                     type: 'range',
    //                     value: {
    //                         startDate: moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff),
    //                         endDate: moment(selectedRangeDate.startDate).subtract(1, 'days')
    //                     }
    //                 },
    //             ]
    //
    //             const res = await analyticsServices.fetchTableData(location, paginationParams, localSorterColumn, filtersWithState, source.token, `&${idKey[location]}Id:in=${idList.join(',')}`)
    //
    //             if (res.response) {
    //                 if (responseFilter) {
    //                     setTableData(prevState => {
    //                         return prevState.map(item => ({
    //                             ...item,
    //                             compareWithPrevious: true,
    //                             ..._.mapKeys(_.find(res.response, {placementName: item.placementName}), (value, key) => {
    //                                 return `${key}_prev`
    //                             })
    //                         }))
    //                     })
    //                 } else {
    //                     setTableData(prevState => {
    //                         return prevState.map(item => ({
    //                             ...item,
    //                             compareWithPrevious: true,
    //                             ..._.mapKeys(_.find(res.response, {[`${idKey[location]}Id`]: item[`${idKey[location]}Id`]}), (value, key) => {
    //                                 return `${key}_prev`
    //                             })
    //                         }))
    //                     })
    //                 }
    //             }
    //         } catch (e) {
    //
    //         }
    //     }
    // }

    // useEffect(() => {
    //     getData()
    // }, [location, paginationParams.page, paginationParams.pageSize, sorterColumn, mainState, selectedRangeDate, tableOptions])
    //
    // useEffect(() => {
    //     setPaginationParams({
    //         ...paginationParams,
    //         page: 1
    //     })
    //     getData()
    // }, [filters, placementSegment])

    useEffect(() => {
        localStorage.setItem('analyticsColumnsBlackList', JSON.stringify(columnsBlackList))
    }, [columnsBlackList])

    return (
        <section className={'list-section'}>
            <div className={'table-section'}>
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

                    <TableOptions
                        options={localTableOptions}
                        onChange={onChangeTableOptions}
                        selectedRangeDate={selectedRangeDate}
                    />

                    {dateRange && <DateRange
                        onChange={dateRangeHandler}
                        selectedRangeDate={selectedRangeDate}
                        tableOptions={localTableOptions}
                    />}

                    <SwitchChartVisible/>
                </div>

                <CustomTable
                    loading={fetching}
                    dataSource={tableData.response}
                    {...showTotal && {
                        totalDataSource: {
                            ..._.mapValues(metricsData, (value) => (+value.value)),
                            ...{[columns[0].dataIndex]: `Total: ${tableData.total_count}`}
                        }
                    }}
                    sorterColumn={localSorterColumn}
                    columns={columns.filter(column => !localColumnBlackList.includes(column.key))}
                    fixedColumns={fixedColumns}
                    expandedRowRender={expandedRowRender}
                    onChangeSorter={sortChangeHandler}
                />

                {tableData.total_count !== 0 && showPagination && <Pagination
                    {...{...tableRequestParams, totalSize: tableData.total_count}}

                    pageSizeOptions={[10, 30, 50, 100, 200]}
                    showQuickJumper={true}
                    listLength={tableData.response.length}
                    processing={fetching}

                    onChange={paginationChangeHandler}
                />}
            </div>
        </section>
    )
}

export default React.memo(TableList)
