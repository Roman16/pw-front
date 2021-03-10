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


let prevActiveMetrics = []

const RenderPageParts = ({
                             location,
                             availableMetrics,
                             availableParts,
                             moreActions,
                             columns,
                             fixedColumns,
                             rowKey,
                             showRowSelection
                         }) => {

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        segmentValueFromLocalStorage = localStorage.getItem('analyticsSTSegmentValue') ? localStorage.getItem('analyticsSTSegmentValue') : 'none',
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
        [localSegmentValue, setLocalSegmentValue] = useState(segmentValueFromLocalStorage || 'none'),
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
        setTableRequestParams(prevState => ({...prevState, page: 1}))
    }

    const changeTableOptionsHandler = (data) => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify({
            ...tableOptionsFromLocalStorage,
            [location]: data
        }))

        setLocalTableOptions(data)
    }

    const getPageData = debounce(50, false, async (pageParts) => {
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


            const res = await analyticsServices.fetchPageData(
                location,
                {
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    segment: localSegmentValue,
                    pageParts,
                    filtersWithState,
                    activeMetrics,
                }
            )

            if (localTableOptions.comparePreviousPeriod) {
                getPreviousPeriodData(res.table.response.map(item => item['queryCRC64']))
            }

            if (localSegmentValue === 'targetings') {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: res.table
                        ? {
                            ...res.table,
                            response: res.table.response.map(item => {
                                item.targetingsData = item.targetingId.map((target, index) => {
                                    const targetObj = {targetingId: target}

                                    columns.forEach(column => {
                                        targetObj[column.dataIndex] = item[`${column.dataIndex}_segmented`] ? item[`${column.dataIndex}_segmented`][index] : item[`${column.dataIndex}`] ? item[`${column.dataIndex}`][index] : null
                                    })

                                    targetObj.campaignId = item.campaignId[index]
                                    targetObj.adGroupId = item.adGroupId[index]
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
            }


            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
        } catch (e) {
            console.log(e)
        }
    })

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

                const res = await analyticsServices.fetchPageData({
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    segment: localSegmentValue,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                    page: 1
                }, `&id:in=${idList.join(',')}`)

                setPageData(prevState => {
                    return {
                        ...prevState,
                        table: {
                            ...prevState.table,
                            response: [...prevState.table.response.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.table.response, {queryCRC64: item['id']}), (value, key) => {
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
            getPageData(['chart'])
            prevActiveMetrics = [...activeMetrics]
        }
    }, [activeMetrics])

    useEffect(() => {
        localStorage.setItem('analyticsPageSize', tableRequestParams.pageSize)
        getPageData(['table'])
    }, [tableRequestParams, localSegmentValue, localTableOptions])

    useEffect(() => {
        getPageData(['metrics', 'table', 'chart'])
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

                metricsData={pageData.metrics}
                localSorterColumn={localSorterColumn}
                localTableOptions={localTableOptions}

                moreActions={moreActions}

                onChange={(data) => setTableRequestParams(data)}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}

                showRowSelection={showRowSelection}
                rowKey={rowKey}
            />}
        </>
    )
}

export default RenderPageParts
