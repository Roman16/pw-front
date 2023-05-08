import React, {useEffect, useState, memo} from 'react'
import {metricKeys, metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import {STColumnsList} from "./STTableComponents/columnsList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import {analyticsServices} from "../../../services/analytics.v3.services"
import {useDispatch, useSelector} from "react-redux"
import TableList from "../components/TableList/TableList"
import {debounce} from "throttle-debounce"
import SegmentFilter from "./STTableComponents/SegmentFilter"
import {analyticsActions} from "../../../actions/analytics.actions"
import {expandedRowRender} from "./STTableComponents/expandRowRender"
import moment from 'moment'
import _ from 'lodash'
import queryString from "query-string"
import {history} from "../../../utils/history"
import {diffPercent} from "../components/RenderPageParts/RenderPageParts"

let prevActiveMetrics = undefined,
    sorterTimeoutId = null


const SearchTerms = () => {
    const location = 'searchTerms',
        availableMetrics = _.filter([...metricsKeysWithoutOrganic], v => v !== metricKeys['net_ad_profit'])

    const dispatch = useDispatch()

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        segmentValueFromLocalStorage = localStorage.getItem('analyticsSTSegmentValue') ? localStorage.getItem('analyticsSTSegmentValue') : 'none',
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') ? JSON.parse(localStorage.getItem('analyticsTableOptions')) : {},
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
        [localSorterColumn, setLocalSorterColumn] = useState(sorterColumnFromLocalStorage[location]),
        [localSegmentValue, setLocalSegmentValue] = useState(segmentValueFromLocalStorage || 'none'),
        [localTableOptions, setLocalTableOptions] = useState(tableOptionsFromLocalStorage[location] || {comparePreviousPeriod: false}),
        [openedSearchTerms, setOpenedSearchTerms] = useState([]),
        [processingRows, setProcessingRows] = useState([])

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        mainState = useSelector(state => state.analytics.mainState),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2),
        attributionWindow = useSelector(state => state.analytics.attributionWindow)


    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const changePaginationHandler = (data) => {
        localStorage.setItem('analyticsPageSize', data.pageSize)

        getPageData(['table'], data)
    }

    const getTargetingsDetails = async (id) => {
        if (openedSearchTerms.includes(id)) setOpenedSearchTerms(prevState => [...prevState.filter(i => i !== id)])
        else try {
            setProcessingRows(prevState => [...prevState, id])
            const queryParams = queryString.parse(history.location.search)

            const {result} = await analyticsServices.fetchTargetingsDetails(id, selectedRangeDate, localSorterColumn, [...Object.keys(queryParams).map(key => ({
                filterBy: key,
                type: 'eq',
                value: queryParams[key]
            })).filter(item => !!item.value)], attributionWindow)

            setPageData(prevState => ({
                ...prevState,
                table: {
                    ...prevState.table,
                    data: prevState.table.data.map(item => {
                        if (item.queryCRC64 === id) {
                            item.targetingsData = result.table.data
                        }

                        return item
                    })
                }
            }))
            setOpenedSearchTerms(prevState => [...prevState, id])
            setProcessingRows(prevState => [...prevState.filter(i => i !== id)])
        } catch (e) {

        }
    }

    const columns = STColumnsList(localSegmentValue, setStateHandler, getTargetingsDetails, openedSearchTerms, processingRows)

    const getPageData = debounce(50, false, async (pageParts, paginationParams, sorterParams) => {
        setOpenedSearchTerms([])
        if (paginationParams) setTableRequestParams(paginationParams)

        try {
            if (pageParts.includes('table')) setTableFetchingStatus(true)
            if (pageParts.includes('chart')) setChartFetchingStatus(true)

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

            const dateDiff = moment.duration(moment(selectedRangeDate.endDate).diff(moment(selectedRangeDate.startDate)))

            const [prevData, currentData] = await Promise.all([analyticsServices.fetchSearchTermsData(
                {
                    ...paginationParams ? paginationParams : tableRequestParams,
                    sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                    pageParts: ['metrics'],
                    filtersWithState,
                    activeMetrics,
                    segment: localSegmentValue,
                    selectedRangeDate: {
                        startDate: moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff),
                        endDate: moment(selectedRangeDate.startDate).subtract(1, 'days')
                    }
                },
                undefined,
            ), analyticsServices.fetchSearchTermsData(
                {
                    ...paginationParams ? paginationParams : tableRequestParams,
                    sorterColumn: sorterParams ? sorterParams : localSorterColumn,
                    pageParts: activeMetrics.filter(i => i !== null).length === 0 ? pageParts.filter(i => i !== 'chart') : pageParts,
                    filtersWithState,
                    activeMetrics,
                    segment: localSegmentValue,
                    selectedRangeDate
                },
                undefined,
            )])

            const res = {
                ...currentData.result,
                metrics: _.mapValues(currentData.result.metrics, (v, k) => ({
                    value: v,
                    value_diff: diffPercent(prevData.result.metrics[k], v),
                    value_prev: prevData.result.metrics[k]
                }))
            }

            prevActiveMetrics = [...activeMetrics]

            if (localTableOptions.comparePreviousPeriod) {
                getPreviousPeriodData(res.table.data.map(item => item['queryCRC64']))
            }

            if (localSegmentValue === 'targetings') {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: res.table
                        ? {
                            ...res.table,
                            data: res.table.data.map(item => {
                                item.targetingsData = item.targetingId.map((target, index) => {
                                    const targetObj = {targetingId: target}

                                    columns.columnsWithFilters.forEach(column => {
                                        targetObj[column.dataIndex] = item[`${column.dataIndex}_segmented`] ? item[`${column.dataIndex}_segmented`][index] : item[`${column.dataIndex}`] ? item[`${column.dataIndex}`][index] : null
                                    })

                                    targetObj.campaignId = item.campaignId[index]
                                    targetObj.campaignState = item.campaignState[index]

                                    targetObj.adGroupId = item.adGroupId[index]
                                    targetObj.adGroupState = item.adGroupState[index]

                                    targetObj.calculatedTargetingText = item.calculatedTargetingText_segmented[index]

                                    return targetObj
                                })

                                if (localTableOptions.comparePreviousPeriod) {
                                    item.compareWithPrevious = true
                                }

                                return item
                            })
                        } : prevState.table
                }))
            } else {
                if (localTableOptions.comparePreviousPeriod && res.table) {
                    setPageData(prevState => ({
                        metrics: res.metrics || prevState.metrics,
                        chart: res.chart || prevState.chart,
                        table: {
                            ...res.table,
                            data: res.table.data.map(item => {
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
            }


            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
        } catch (e) {

        }
    })

    const changeTableOptionsHandler = (data) => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify({
            ...tableOptionsFromLocalStorage,
            [location]: data
        }))

        setLocalTableOptions(data)
    }

    const getPreviousPeriodData = async (idList) => {
        if (selectedRangeDate.startDate !== 'lifetime') {
            try {
                const dateDiff = moment.preciseDiff(selectedRangeDate.endDate, selectedRangeDate.startDate, true)

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

                const res = await analyticsServices.fetchSearchTermsData({
                    sorterColumn: localSorterColumn,
                    segment: localSegmentValue,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                    page: 1,
                    pageSize: 200
                }, `&queryCRC64:in=${idList.join(',')}`)

                setPageData(prevState => {
                    return {
                        ...prevState,
                        table: {
                            ...prevState.table,
                            data: [...prevState.table.data.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.table.data, {queryCRC64: item['queryCRC64']}), (value, key) => {
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

        analyticsServices.downloadTableCSV('search-terms', filtersWithState, selectedRangeDate)
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
        localStorage.setItem('analyticsPageSize', tableRequestParams.pageSize)

        getPageData(['table'])

        if (localSegmentValue === 'targetings') setOpenedSearchTerms(pageData.table.data.map(i => i.queryCRC64))
        else setOpenedSearchTerms([])
    }, [localSegmentValue, localTableOptions])

    useEffect(() => {
        setTimeout(getPageData(['metrics', 'table', 'chart'], {...tableRequestParams, page: 1}), 100)
    }, [selectedRangeDate, filters, attributionWindow])

    useEffect(() => {
        return () => prevActiveMetrics = undefined
    }, [])

    return (
        <div className="search-terms-page">
            <MainMetrics
                metricsData={pageData.metrics}
                location={location}
                allMetrics={availableMetrics}
            />

            <MainChart
                chartData={pageData.chart}
                allMetrics={availableMetrics}
                activeMetrics={activeMetrics}
                location={location}
                fetching={chartFetchingStatus}
                selectedRangeDate={selectedRangeDate}
            />

            <TableList
                tableRequestParams={tableRequestParams}
                fetching={tableFetchingStatus}
                tableData={pageData.table}
                columns={columns}
                fixedColumns={[0]}
                location={location}
                metricsData={pageData.metrics}
                localSorterColumn={localSorterColumn}
                localTableOptions={localTableOptions}
                onDownloadCSV={downloadCSVHandler}
                openedRow={(row) => openedSearchTerms.includes(row.queryCRC64) || localSegmentValue === 'targetings'}
                expandedRowRender={(props, columnsBlackList, columnsOrder) => expandedRowRender(props, openedSearchTerms.length > 0 || localSegmentValue === 'targetings', setStateHandler, columnsBlackList, columnsOrder)}

                onChange={changePaginationHandler}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}
            />
        </div>
    )
}

export default memo(SearchTerms)
