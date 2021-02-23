import React, {useEffect, useState} from "react"
import PlacementsStatistics from "./PlacementsStatistics/PlacementsStatistics"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"
import queryString from "query-string"
import {history} from "../../../utils/history"
import {analyticsServices} from "../../../services/analytics.services"
import {debounce} from "throttle-debounce"
import moment from "moment"
import _ from "lodash"
import TableList from "../componentsV2/TableList/TableList"
import MainMetrics from "../componentsV2/MainMetrics/MainMetrics"
import MainChart from "../componentsV2/MainChart/MainChart"
import {PColumnsList} from "./PTableComponents/columnsList"
import SegmentFilter from "./PTableComponents/SegmentFilter"
import {expandedRowRender} from "./PTableComponents/expandRowRender"
import {chartAreaKeys} from "./PlacementsStatistics/Chart"

let prevActiveMetrics = []


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
                response: []
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
        [processingRows, setProcessingRows] = useState([]),
        [areaChartMetric, setAreaChartMetric] = useState(localStorage.getItem('placementActiveMetric') || 'impressions')

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        mainState = useSelector(state => state.analytics.mainState),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2)


    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }


    const columns = PColumnsList(!!mainState.campaignId)

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

            const res = await analyticsServices.getPlacementData({
                ...tableRequestParams,
                sorterColumn: localSorterColumn,
                segment: localSegmentValue,
                pageParts,
                filtersWithState,
                activeMetrics,
                areaChartMetric
            })

            if (localTableOptions.comparePreviousPeriod) {
                getPreviousPeriodData()
            }

            if (localSegmentValue === 'advertisingType') {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    stacked_area_chart: res.stacked_area_chart || prevState.stacked_area_chart,
                    table: res.table
                        ? {
                            ...res.table,
                            response: res.table.response
                                .map(item => {
                                    item.segmentData = item.advertisingType_segmented.map((key, index) => {
                                        const targetObj = {advertisingType: key}

                                        columns.forEach(column => {
                                            targetObj[column.dataIndex] = item[`${column.dataIndex}_segmented`] ? item[`${column.dataIndex}_segmented`][index] : item[`${column.dataIndex}`] ? item[`${column.dataIndex}`][index] : null
                                        })

                                        return targetObj
                                    })

                                    return item
                                })
                        } : prevState.table
                }))

            } else {
                setPageData(prevState => ({
                    metrics: res.metrics || prevState.metrics,
                    chart: res.chart || prevState.chart,
                    table: res.table || prevState.table,
                    stacked_area_chart: res.stacked_area_chart || prevState.stacked_area_chart,
                }))
            }


            setChartFetchingStatus(false)
            setTableFetchingStatus(false)
            setAreaChartFetchingStatus(false)
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

                const res = await analyticsServices.getPlacementData({
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
                            response: [...prevState.table.response.map(item => ({
                                ...item,
                                compareWithPrevious: true,
                                ..._.mapKeys(_.find(res.table.response, {placementName: item['placementName']}), (value, key) => {
                                    return `${key}_prev`
                                }),
                                // ...localSegmentValue === 'advertisingType' ? {
                                //     segmentData: item.advertisingType_segmented.map((key, index) => {
                                //         const targetObj = {..._.find(item.segmentData, {advertisingType: key}), compareWithPrevious: true}
                                //
                                //         columns.forEach(column => {
                                //             targetObj[`${column.dataIndex}_prev`] = _.find(res.table.response, {placementName: item['placementName']})[`${column.dataIndex}_segmented`] ? _.find(res.table.response, {placementName: item['placementName']})[`${column.dataIndex}_segmented`][index] : null
                                //         })
                                //
                                //         return targetObj
                                //     })
                                // } : {}
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
        setTableRequestParams(prevState => ({...prevState, page: 1}))
    }


    useEffect(() => {
        if (JSON.stringify(prevActiveMetrics) !== JSON.stringify(activeMetrics.filter(item => item !== null))) {
            getPageData(['chart'])
            prevActiveMetrics = [...activeMetrics]
        }
    }, [activeMetrics])

    useEffect(() => {
        getPageData(['stacked_area_chart'])
    }, [areaChartMetric])

    useEffect(() => {
        localStorage.setItem('analyticsPageSize', tableRequestParams.pageSize)

        getPageData(['table'])

        if (localSegmentValue === 'targetings') setOpenedSearchTerms(pageData.table.response.map(i => i.queryCRC64))
        else setOpenedSearchTerms([])
    }, [tableRequestParams, localSegmentValue, localTableOptions])

    useEffect(() => {
        getPageData(['metrics', 'table', 'chart', 'stacked_area_chart'])
    }, [selectedRangeDate, filters])

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
                    response: Object.values(chartAreaKeys).map(key => _.find(pageData.table.response, {placementName: key})).filter(i => !!i)
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
                expandedRowRender={localSegmentValue === 'advertisingType' ? (props, columnsBlackList) => expandedRowRender(props, columnsBlackList, !!mainState.campaignId) : undefined}

                onChange={(data) => setTableRequestParams(data)}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}
            />
        </div>
    )
}

export default Placements
