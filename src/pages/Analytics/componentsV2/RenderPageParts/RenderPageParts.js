import React, {useEffect, useState} from "react"
import MainMetrics from "../MainMetrics/MainMetrics"
import MainChart from "../MainChart/MainChart"
import TableList from "../TableList/TableList"
import {useSelector} from "react-redux"
import {debounce} from "throttle-debounce"
import queryString from "query-string"
import {history} from "../../../../utils/history"
import {analyticsServices} from "../../../../services/analytics.services"
import moment from "moment"
import _ from "lodash"


let prevActiveMetrics = [],
    sorterTimeoutId = null

const idSelectors = {
    'campaigns': 'campaignId',
    'ad-groups': 'adGroupId',
    'portfolios': 'portfolioId',
    'targetings': 'targetingId',
    'product-ads': 'adId',
    'products-parents': 'productId',
    'products': 'productId',
}

const RenderPageParts = ({
                             location,
                             availableMetrics = [],
                             availableParts,
                             moreActions,
                             columns,
                             fixedColumns,
                             rowKey,
                             showRowSelection,
                             productType,
                             showFilters = true
                         }) => {

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') ? JSON.parse(localStorage.getItem('analyticsTableOptions')) : {},
        pageSizeFromLocalStorage = localStorage.getItem('analyticsPageSize') && JSON.parse(localStorage.getItem('analyticsPageSize'))


    const [pageData, setPageData] = useState({
            metrics: {},
            chart: [],
            table: {
                response: []
            }
        }),
        [tableRequestParams, setTableRequestParams] = useState({
            page: 1,
            pageSize: pageSizeFromLocalStorage || 30,
        }),
        [chartFetchingStatus, setChartFetchingStatus] = useState(false),
        [tableFetchingStatus, setTableFetchingStatus] = useState(false),
        [localSorterColumn, setLocalSorterColumn] = useState(sorterColumnFromLocalStorage[location]),
        [localTableOptions, setLocalTableOptions] = useState(tableOptionsFromLocalStorage[location] || {comparePreviousPeriod: false})

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        mainState = useSelector(state => state.analytics.mainState),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2)

    const changeSorterColumnHandler = (data) => {
        localStorage.setItem('analyticsSorterColumn', JSON.stringify({
            ...sorterColumnFromLocalStorage,
            [location]: data
        }))

        setLocalSorterColumn(data)
        setTableFetchingStatus(true)

        clearTimeout(sorterTimeoutId)
        sorterTimeoutId = setTimeout(() => {
            getPageData(['table'], {...tableRequestParams, page: 1}, data)
        }, 300)
    }

    const changeTableOptionsHandler = (data) => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify({
            ...tableOptionsFromLocalStorage,
            [location]: data
        }))

        setLocalTableOptions(data)
    }

    const changePaginationHandler = (data) => {
        localStorage.setItem('analyticsPageSize', data.pageSize)

        getPageData(['table'], data)
    }

    const getPageData = debounce(50, false, async (pageParts, paginationParams, sorterParams) => {
        if (paginationParams) setTableRequestParams(paginationParams)

        if (location === 'overview') {
            if (productType === 'parent') {
                location = 'products-parents'
            } else {
                location = 'products'
            }
        }

        try {
            if (pageParts.includes('table')) setTableFetchingStatus(true)
            if (pageParts.includes('chart')) setChartFetchingStatus(true)

            const queryParams = queryString.parse(history.location.search)

            let filtersWithState = []

            if (Object.keys(queryParams).length !== 0) {
                filtersWithState = [
                    ...filters,
                    ...Object.keys(queryParams).map(key => ({
                        filterBy: key,
                        type: 'eq',
                        value: queryParams[key]
                    })).filter(item => !!item.value),
                    {
                        filterBy: 'datetime',
                        type: 'range',
                        value: selectedRangeDate
                    },
                ]
            } else {
                filtersWithState = [
                    ...filters,
                    {
                        filterBy: 'datetime',
                        type: 'range',
                        value: selectedRangeDate
                    },
                ]
            }

            if (productType === 'parent') {
                filtersWithState = [...filtersWithState.filter(item => item.filterBy !== 'productId')]

                filtersWithState.push({
                    filterBy: 'parent_productId',
                    type: 'eq',
                    value: mainState.productId
                })
            }

            let parentResponse

            let res = await analyticsServices.fetchPageData(
                location,
                {
                    ...paginationParams ? paginationParams : tableRequestParams,
                    sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                    pageParts: activeMetrics.filter(i => i !== null).length === 0 ? pageParts.filter(i => i !== 'chart') : pageParts,
                    filtersWithState,
                    activeMetrics,
                }
            )

            if (productType === 'parent') {
                parentResponse = await analyticsServices.fetchPageData(
                    'products',
                    {
                        ...paginationParams ? paginationParams : tableRequestParams,
                        sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                        pageParts: ['table'],
                        filtersWithState,
                        activeMetrics,
                    }
                )

                res.table = parentResponse.table
            }


            if (localTableOptions.comparePreviousPeriod && res.table) {
                getPreviousPeriodData(res.table.response.map(item => item[idSelectors[location]]))
            }

            if (localTableOptions.comparePreviousPeriod && res.table) {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: {
                        ...res.table,
                        response: res.table.response.map(item => {
                            item.compareWithPrevious = true

                            return item
                        })
                    }
                }))
            } else {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: res.table || prevState.table
                }))
            }


            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
        } catch (e) {
            console.log(e)
        }
    })

    const getPreviousPeriodData = async (idList) => {

        if (location === 'overview') {
            if (productType === 'parent') {
                location = 'products-parents'
            } else {
                location = 'products'
            }
        }

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

                if (productType === 'parent') {
                    filtersWithState = [...filtersWithState.filter(item => item.filterBy !== 'productId')]

                    filtersWithState.push({
                        filterBy: 'parent_productId',
                        type: 'eq',
                        value: mainState.productId
                    })
                }

                const res = await analyticsServices.fetchPageData(location, {
                    sorterColumn: localSorterColumn,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                    page: 1,
                    pageSize: idList.length
                }, `&id:in=${idList.join(',')}`)

                setPageData(prevState => {
                    return {
                        ...prevState,
                        table: {
                            ...prevState.table,
                            response: [...prevState.table.response.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.table.response, {[idSelectors[location]]: item[idSelectors[location]]}), (value, key) => {
                                    return `${key}_prev`
                                })
                            }))]
                        }
                    }
                })
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        if (JSON.stringify(prevActiveMetrics) !== JSON.stringify(activeMetrics.filter(item => item !== null))) {
            if (activeMetrics.filter(item => item !== null).length === 0) setPageData(prevState => ({
                ...prevState,
                chart: []
            }))
            else getPageData(['chart'])
            prevActiveMetrics = [...activeMetrics]
        }
    }, [activeMetrics])

    useEffect(() => {
        getPageData(['table'])
    }, [localTableOptions])

    useEffect(() => {
        getPageData(availableParts, {page: 1, pageSize: tableRequestParams.pageSize})
    }, [selectedRangeDate, filters])

    return (
        <>
            {availableParts.includes('metrics') && <MainMetrics
                metricsData={pageData.metrics}
                location={location}
                allMetrics={availableMetrics}
            />}

            {availableParts.includes('chart') && <MainChart
                chartData={pageData.chart}
                allMetrics={availableMetrics}
                activeMetrics={activeMetrics}
                location={location}
                fetching={chartFetchingStatus}
                selectedRangeDate={selectedRangeDate}
            />}

            {availableParts.includes('table') && <TableList
                location={location}
                columns={columns}
                fixedColumns={fixedColumns}
                tableData={pageData.table}
                fetching={tableFetchingStatus}
                tableRequestParams={tableRequestParams}
                showFilters={showFilters}

                metricsData={pageData.metrics}
                localSorterColumn={localSorterColumn}
                localTableOptions={localTableOptions}

                moreActions={moreActions}

                onChange={changePaginationHandler}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}

                showRowSelection={showRowSelection}
                rowKey={rowKey}

                productType={productType}
            />}
        </>
    )
}

export default RenderPageParts
