import React, {useEffect, useState} from "react"
import MainMetrics from "../MainMetrics/MainMetrics"
import MainChart from "../MainChart/MainChart"
import TableList from "../TableList/TableList"
import {useSelector} from "react-redux"
import {debounce} from "throttle-debounce"
import queryString from "query-string"
import {history} from "../../../../utils/history"
import {analyticsServices} from "../../../../services/analytics.v3.services"
import moment from "moment"
import _ from "lodash"
import {notification} from "../../../../components/Notification"
import axios from "axios"


let prevActiveMetrics = undefined,
    sorterTimeoutId = null

const CancelToken = axios.CancelToken
let source = null

const idSelectors = {
    'campaigns': 'campaign_id',
    'ad-groups': 'ad_group_id',
    'portfolios': 'portfolio_id',
    'targetings': 'targeting_id',
    'negative-targetings': 'targeting_id',
    'product-ads': 'ad_id',
    'products-parents': 'product_id',
    'products': 'product_id',
}

const idSelectorsEntity = {
    'campaigns': 'campaignId',
    'ad-groups': 'adGroupId',
    'portfolios': 'portfolioId',
    'targetings': 'targetingId',
    'negative-targetings': 'targetingId',
    'product-ads': 'adId',
    'products-parents': 'productId',
    'products': 'productId',
}

export const updateResponseHandler = (res) => {
    const success = res.result.success,
        failed = res.result.failed,
        notApplicable = res.result.notApplicable

    if (failed === 0 && success === 0 && notApplicable > 0) {
        notification.warning({title: 'Your change was not applicable to any selected entities.'})
    } else {
        notification[success > 0 && failed > 0 ? 'warning' : success === 0 && failed > 0 ? 'error' : success === 0 && failed === 0 && notApplicable > 0 ? 'warning' : 'success']({
            title: `${success > 0 ? `${success} ${success > 1 ? 'entities' : 'entity'} updated <br/>` : ''}  
                        ${failed > 0 ? `${failed} ${failed > 1 ? 'entities' : 'entity'} failed to update <br/>` : ''} 
                        ${notApplicable > 0 ? `Change was not applicable for ${notApplicable} ${notApplicable > 1 ? 'entities' : 'entity'}` : ''}`
        })
    }
}

export const diffPercent = (prevValue = 0, value) => {
    if (prevValue === null) prevValue = 0

    if (prevValue != 0 && value / prevValue != Math.abs(value) / Math.abs(prevValue)) {
        return null
    }

    if (value > prevValue) {
        if (prevValue === 0 && value > 0) {
            return 1
        } else {
            return prevValue != 0 ? ((value / prevValue) - 1) : null
        }
    }

    return prevValue != 0 ? -(1 - (value / prevValue)) : null
}

const RenderPageParts = (props) => {

    let {
        location,
        availableMetrics = [],
        availableParts,
        moreActions,
        columns,
        fixedColumns,
        rowKey,
        showRowSelection,
        productType,
        showFilters = true,
        disabledRow,
        dateRange,
        showOptions,
    } = props

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        pageSizeFromLocalStorage = localStorage.getItem('analyticsPageSize') && JSON.parse(localStorage.getItem('analyticsPageSize'))


    const [pageData, setPageData] = useState({
            metrics: {},
            chart: [],
            table: {
                data: []
            }
        }),
        [tableRequestParams, setTableRequestParams] = useState({
            page: 1,
            pageSize: pageSizeFromLocalStorage || 30,
        }),
        [chartFetchingStatus, setChartFetchingStatus] = useState(false),
        [tableFetchingStatus, setTableFetchingStatus] = useState(false),
        [localSorterColumn, setLocalSorterColumn] = useState(sorterColumnFromLocalStorage[location])

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        tableOptions = useSelector(state => state.analytics.tableOptions[location] ? state.analytics.tableOptions[location] : {}),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        compareDate = useSelector(state => state.analytics.compareDate),
        stateInformation = useSelector(state => state.analytics.stateDetails),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2),
        attributionWindow = useSelector(state => state.analytics.attributionWindow)

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

    const changePaginationHandler = (data) => {
        localStorage.setItem('analyticsPageSize', data.pageSize)

        getPageData(['table'], data)
    }

    const fieldsValidation = (field, value) => {
        if (field === 'calculatedBudget' && value < 1) {
            notification.error({title: 'Campaign budget should be at least $1.00'})
            return false
        } else if (field === 'calculatedBudget' && value > 1000000) {
            notification.error({title: 'Campaign budget should not be more than $1,000,000'})
            return false
        } else if (field === 'calculatedBid' && value < 0.02) {
            notification.error({title: 'Targeting bid should be at least $0.02'})
            return false
        } else if (field === 'calculatedBid' && value > 1000) {
            notification.error({title: 'Targeting bid should not be more than $1,000'})
            return false
        } else if (field === 'defaultBid' && value < 0.02) {
            notification.error({title: 'Ad Group bid should be at least $0.02'})
            return false
        } else if (field === 'defaultBid' && value > 1000) {
            notification.error({title: 'Ad Group bid should not be more than $1,000'})
            return false
        }

        return true
    }

    const updateFieldHandler = async (item, column, value, success, error) => {
        if (fieldsValidation(column, value)) {
            try {
                const res = await analyticsServices.exactUpdateField(location, {
                    [idSelectorsEntity[location]]: item[idSelectorsEntity[location]],
                    advertisingType: item.advertisingType,
                    [column]: value,
                    ...location === 'targetings' && {
                        entityType: item.entityType,
                        ...((stateInformation.advertisingType && stateInformation.advertisingType === 'SponsoredBrands') || item.advertisingType === 'SponsoredBrands') && {
                            adGroupId: item.adGroupId
                        }
                    }
                })

                updateResponseHandler(res)

                if (res.result.failed > 0) {
                    error()
                    return
                }

                setPageData({
                    ...pageData,
                    table: {
                        ...pageData.table,
                        response: [...pageData.table.data.map(i => {
                            if (i[idSelectorsEntity[location]] === item[idSelectorsEntity[location]]) item[column] = value === 'null' ? undefined : value

                            return i
                        })]
                    }
                })
                success()
            } catch (e) {
                console.log(e)
                error()
            }

        } else error()
    }

    const updateColumnHandler = async (changeData, idList, selectedAllRows, cb, failedCb) => {
        let filtersWithState = []
        const queryParams = queryString.parse(history.location.search)

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

        try {
            const res = await analyticsServices.bulkUpdate(
                location,
                changeData,
                selectedAllRows ? undefined : `&${idSelectors[location]}[]=${idList.join(`&${idSelectors[location]}[]=`)}`,
                filtersWithState,
                attributionWindow
            )

            updateResponseHandler(res)

            if (res.result.success > 0) getPageData(['table'])

            cb()
        } catch (e) {
            console.log(e)
            failedCb()
        }
    }

    const downloadCSVHandler = () => {
        const queryParams = queryString.parse(history.location.search)

        let filtersWithState = [...filters]

        if (Object.keys(queryParams).length !== 0) {
            filtersWithState = [
                ...filters,
                ...Object.keys(queryParams).map(key => ({
                    filterBy: key,
                    type: 'eq',
                    value: queryParams[key]
                })).filter(item => !!item.value)
            ]
        }

        analyticsServices.downloadTableCSV(location, filtersWithState, selectedRangeDate)
    }

    const getPageData = debounce(100, false, async (pageParts, paginationParams, sorterParams) => {
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

            source && source.cancel()
            source = CancelToken.source()

            const queryParams = queryString.parse(history.location.search)

            let filtersWithState = [...filters]

            if (Object.keys(queryParams).length !== 0) {
                filtersWithState = [
                    ...filters,
                    ...Object.keys(queryParams).map(key => ({
                        filterBy: key,
                        type: 'eq',
                        value: queryParams[key]
                    })).filter(item => !!item.value),
                ]
            }

            let parentResponse

            let res

            if (pageParts.length === 1 && pageParts[0] === 'table' && productType === 'parent') {
                res = {
                    table: null
                }
            } else {
                const dateDiff = moment.duration(moment(selectedRangeDate.endDate).diff(moment(selectedRangeDate.startDate)))

                const [prevData, currentData] = await Promise.all([analyticsServices.fetchPageData(
                    location,
                    {
                        ...paginationParams ? paginationParams : tableRequestParams,
                        sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                        pageParts: ['metrics'],
                        filtersWithState,
                        activeMetrics,
                        selectedRangeDate: {
                            startDate: compareDate.startDate ? compareDate.startDate : moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff),
                            endDate: compareDate.startDate ? compareDate.endDate : moment(selectedRangeDate.startDate).subtract(1, 'days')
                        }
                    },
                    undefined,
                    source.token
                ), analyticsServices.fetchPageData(
                    location,
                    {
                        ...paginationParams ? paginationParams : tableRequestParams,
                        sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                        pageParts: activeMetrics.filter(i => i !== null).length === 0 ? pageParts.filter(i => i !== 'chart') : productType === 'parent' ? pageParts.filter(i => i !== 'table') : pageParts,
                        filtersWithState,
                        activeMetrics,
                        selectedRangeDate
                    },
                    undefined,
                    source.token
                )])

                res = {
                    ...currentData.result,
                    metrics: currentData.result.metrics ? _.mapValues(currentData.result.metrics, (v, k) => ({
                        value: v,
                        value_diff: diffPercent(prevData.result.metrics[k], v),
                        value_prev: prevData.result.metrics[k]
                    })) : pageData.metrics
                }
            }

            prevActiveMetrics = [...activeMetrics]

            if (productType === 'parent') {
                parentResponse = await analyticsServices.fetchPageData(
                    'products',
                    {
                        ...paginationParams ? paginationParams : tableRequestParams,
                        sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                        pageParts: ['table'],
                        filtersWithState,
                        activeMetrics,
                        selectedRangeDate
                    },
                    undefined,
                    source.token
                )

                res.table = parentResponse.result.table
            }


            if (tableOptions.comparePreviousPeriod && res.table) {
                getPreviousPeriodData(res.table.data.map(item => item[idSelectorsEntity[location]]), paginationParams ? paginationParams : tableRequestParams)

                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: {
                        ...res.table,
                        response: res.table.data.map(item => {
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

            setPageData(prevState => ({
                metrics: prevState.metrics,
                chart: prevState.chart,
                table: {
                    ...prevState.table,
                    response: [],
                }
            }))
        }
    })

    const getPreviousPeriodData = async (idList, paginationParams) => {
        const queryParams = queryString.parse(history.location.search)

        if (selectedRangeDate.startDate !== 'lifetime') {
            try {
                let filtersWithState = [
                    ...filters,
                    ...Object.keys(queryParams).map(key => ({
                        filterBy: key,
                        type: 'eq',
                        value: queryParams[key]
                    })).filter(item => !!item.value)
                ]

                const {result} = await analyticsServices.fetchPageData(location, {
                    sorterColumn: localSorterColumn,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                    page: 1,
                    pageSize: paginationParams.pageSize,
                    selectedRangeDate: {
                        startDate: compareDate.startDate,
                        endDate: compareDate.endDate
                    }
                }, `&${idSelectors[location]}[]=${idList.join(`&${idSelectors[location]}[]=`)}`)

                setPageData(prevState => ({
                    ...prevState,
                    table: {
                        ...prevState.table,
                        data: [...prevState.table.data.map(item => ({
                            ...item,
                            ..._.mapKeys(_.find(result.table.data, {[idSelectorsEntity[location]]: item[idSelectorsEntity[location]]}), (value, key) => {
                                return `${key}_prev`
                            })
                        }))]
                    }
                }))
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        if (prevActiveMetrics) {
            if (JSON.stringify(prevActiveMetrics) !== JSON.stringify(activeMetrics.filter(item => item !== null))) {
                if (activeMetrics.filter(item => item !== null).length === 0) setPageData(prevState => ({
                    ...prevState,
                    chart: []
                }))
                else getPageData(['chart'])
                prevActiveMetrics = [...activeMetrics]
            }
        }
    }, [activeMetrics])


    useEffect(() => {
        getPageData(availableParts, {page: 1, pageSize: tableRequestParams.pageSize})
    }, [selectedRangeDate, filters, history.location.search, attributionWindow])

    useEffect(() => {
        prevActiveMetrics = undefined
    }, [location])

    useEffect(() => {
        if(tableOptions.comparePreviousPeriod) {
            getPageData(availableParts)
        }
    }, [tableOptions, compareDate])

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
                showOptions={showOptions}
                selectedRangeDate={selectedRangeDate}
                compareDate={compareDate}
                tableOptions={tableOptions}
                dateRange={dateRange}

                metricsData={pageData.metrics}
                localSorterColumn={localSorterColumn}

                moreActions={moreActions}

                onChange={changePaginationHandler}
                onChangeSorterColumn={changeSorterColumnHandler}
                onUpdateField={updateFieldHandler}
                onUpdateColumn={updateColumnHandler}
                disabledRow={disabledRow}
                onDownloadCSV={downloadCSVHandler}
                showRowSelection={showRowSelection}
                rowKey={rowKey}

                productType={productType}
            />}

            {props.children && props.children(() => getPageData(['table']))}
        </>
    )
}

export default RenderPageParts
