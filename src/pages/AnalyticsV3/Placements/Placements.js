import React, {useEffect, useState} from "react"
import PlacementsStatistics from "./PlacementsStatistics/PlacementsStatistics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import {useDispatch, useSelector} from "react-redux"
import queryString from "query-string"
import {history} from "../../../utils/history"
import {analyticsServices} from "../../../services/analytics.v3.services"
import {debounce} from "throttle-debounce"
import moment from "moment"
import _ from "lodash"
import TableList from "../components/TableList/TableList"
import MainMetrics from "../components/MainMetrics/MainMetrics"
import MainChart from "../components/MainChart/MainChart"
import {PColumnsList} from "./PTableComponents/columnsList"
import SegmentFilter from "./PTableComponents/SegmentFilter"
import {expandedRowRender} from "./PTableComponents/expandRowRender"
import {chartAreaKeys} from "./PlacementsStatistics/Chart"
import {diffPercent} from "../components/RenderPageParts/RenderPageParts"

let prevActiveMetrics = undefined,
    sorterTimeoutId = null


const Placements = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'placements'

    const dispatch = useDispatch()

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        segmentValueFromLocalStorage = localStorage.getItem('analyticsPSegmentValue') ? localStorage.getItem('analyticsPSegmentValue') : 'none',
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') ? JSON.parse(localStorage.getItem('analyticsTableOptions')) : {},
        pageSizeFromLocalStorage = localStorage.getItem('analyticsPageSize') && JSON.parse(localStorage.getItem('analyticsPageSize'))

    const [pageData, setPageData] = useState({
            metrics: {},
            chart: [],
            stacked_area_chart: [],
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
        [areaChartFetchingStatus, setAreaChartFetchingStatus] = useState(false),
        [localSorterColumn, setLocalSorterColumn] = useState(sorterColumnFromLocalStorage[location]),
        [localSegmentValue, setLocalSegmentValue] = useState(segmentValueFromLocalStorage || 'none'),
        [localTableOptions, setLocalTableOptions] = useState(tableOptionsFromLocalStorage[location] || {comparePreviousPeriod: false}),
        [openedSearchTerms, setOpenedSearchTerms] = useState([]),
        [areaChartMetric, setAreaChartMetric] = useState(localStorage.getItem('placementActiveMetric') || 'impressions')

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2),
        attributionWindow = useSelector(state => state.analytics.attributionWindow)

    const columns = PColumnsList(!!mainState.campaignId, stateDetails, localSegmentValue)

    const getPageData = debounce(50, false, async (pageParts) => {
        setOpenedSearchTerms([])

        try {
            if (pageParts.includes('table')) setTableFetchingStatus(true)
            if (pageParts.includes('chart')) setChartFetchingStatus(true)
            if (pageParts.includes('stacked_area_chart')) setAreaChartFetchingStatus(true)

            const queryParams = queryString.parse(history.location.search)

            let filtersWithState = []

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
            const [prevData, currentData] = await Promise.all([analyticsServices.fetchPlacementData(
                {
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    pageParts: ['metrics'],
                    filtersWithState,
                    activeMetrics,
                    selectedRangeDate: {
                        startDate: moment(selectedRangeDate.startDate).subtract(1, 'days').subtract(dateDiff),
                        endDate: moment(selectedRangeDate.startDate).subtract(1, 'days')
                    }
                },
                undefined,
            ), analyticsServices.fetchPlacementData(
                {
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    pageParts: activeMetrics.filter(i => i !== null).length === 0 ? pageParts.filter(i => i !== 'chart') : pageParts,
                    filtersWithState,
                    activeMetrics,
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

            if (localSegmentValue === 'advertisingType') {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    stacked_area_chart: res.stacked_area_chart || prevState.stacked_area_chart,
                    table: res.table
                        ? {
                            ...res.table,
                            data: res.table.data
                                .map(item => {
                                    item.segmentData = item.advertisingType_segmented.map((key, index) => {
                                        const targetObj = {advertisingType: key}

                                        columns.columnsWithFilters.forEach(column => {
                                            targetObj[column.dataIndex] = item[`${column.dataIndex}_segmented`] ? item[`${column.dataIndex}_segmented`][index] : item[`${column.dataIndex}`] ? item[`${column.dataIndex}`][index] : null
                                        })

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
                        stacked_area_chart: res.stacked_area_chart || prevState.stacked_area_chart,
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
                        stacked_area_chart: res.stacked_area_chart || prevState.stacked_area_chart,
                        table: res.table || prevState.table,
                    }))
                }
            }

            if (localTableOptions.comparePreviousPeriod) {
                getPreviousPeriodData()
            }

            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
            setAreaChartFetchingStatus(false)
        } catch (e) {
            console.log(e)
        }
    })

    const downloadCSVHandler = () => {
        const queryParams = queryString.parse(history.location.search)

        let filtersWithState = []

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

        analyticsServices.downloadTableCSV('placements', filtersWithState, selectedRangeDate)
    }

    const changeTableOptionsHandler = (data) => {
        localStorage.setItem('analyticsTableOptions', JSON.stringify({
            ...tableOptionsFromLocalStorage,
            [location]: data
        }))

        setLocalTableOptions(data)
    }

    const getPreviousPeriodData = async () => {
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

                const res = await analyticsServices.fetchPlacementData({
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    segment: localSegmentValue,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                    areaChartMetric,
                })

                setPageData(prevState => {
                    return {
                        ...prevState,
                        table: {
                            ...prevState.table,
                            data: [...prevState.table.data.map(item => ({
                                ...item,
                                ..._.mapKeys(_.find(res.table.data, {placementName: item['placementName']}), (value, key) => {
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

    const changeSegmentHandler = (value) => {
        localStorage.setItem('analyticsPSegmentValue', value)
        setLocalSegmentValue(value)
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
            setTableRequestParams(prevState => ({...prevState, page: 1}))
        }, 300)
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
    }, [tableRequestParams, localSegmentValue, localTableOptions])

    useEffect(() => {
        getPageData(['metrics', 'table', 'chart', 'stacked_area_chart'])
    }, [selectedRangeDate, filters, attributionWindow])

    useEffect(() => {
        return () => prevActiveMetrics = undefined
    }, [])

    return (
        <div className={'placements-workplace'}>
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

            <PlacementsStatistics
                processing={areaChartFetchingStatus}
                chartData={pageData.stacked_area_chart}
                selectedMetric={areaChartMetric}

                onSelectMetric={setAreaChartMetric}
            />

            <TableList
                searchField={false}
                tableRequestParams={tableRequestParams}
                fetching={tableFetchingStatus}
                tableData={{
                    ...pageData.table,
                    data: Object.values(chartAreaKeys).map(key => _.find(pageData.table.data, {placementName: key})).filter(i => !!i)
                }}
                columns={columns}
                fixedColumns={[0]}
                location={location}
                metricsData={pageData.metrics}
                localSorterColumn={localSorterColumn}
                localTableOptions={localTableOptions}
                moreActions={<SegmentFilter
                    segment={localSegmentValue}
                    onChange={changeSegmentHandler}
                />}
                expandedRowRender={localSegmentValue === 'advertisingType' ? (props, columnsBlackList, columnsOrder) => expandedRowRender(props, columnsBlackList, !!mainState.campaignId, stateDetails, columnsOrder) : undefined}

                onChange={(data) => setTableRequestParams(data)}
                onDownloadCSV={downloadCSVHandler}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}
            />
        </div>
    )
}

export default Placements
