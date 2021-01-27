import React, {useEffect, useState, memo} from 'react'
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import {STColumnsList} from "./STTableComponents/columnsList"
import MainMetrics from "../componentsV2/MainMetrics/MainMetrics"
import MainChart from "../componentsV2/MainChart/MainChart"
import {analyticsServices} from "../../../services/analytics.services"
import {useDispatch, useSelector} from "react-redux"
import TableList from "../componentsV2/TableList/TableList"
import {debounce} from "throttle-debounce"
import SegmentFilter from "./STTableComponents/SegmentFilter"
import {analyticsActions} from "../../../actions/analytics.actions"
import {expandedRowRender} from "./STTableComponents/expandRowRender"
import moment from 'moment'
import preciseDiff from "moment-precise-range-plugin"
import _ from 'lodash'
import queryString from "query-string"
import {history} from "../../../utils/history"

let prevActiveMetrics = []

const SearchTerms = () => {
    const location = 'searchTerms',
        availableMetrics = [...metricsKeysWithoutOrganic]

    const dispatch = useDispatch()

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
        [localTableOptions, setLocalTableOptions] = useState(tableOptionsFromLocalStorage[location] || {comparePreviousPeriod: false}),
        [openedSearchTerms, setOpenedSearchTerms] = useState([]),
        [processingRows, setProcessingRows] = useState([])

    const metricsState = useSelector(state => state.analytics.metricsState && state.analytics.metricsState[location] ? state.analytics.metricsState[location] : {}),
        filters = useSelector(state => state.analytics.filters[location] ? state.analytics.filters[location] : []),
        mainState = useSelector(state => state.analytics.mainState),
        selectedRangeDate = useSelector(state => state.analytics.selectedRangeDate),
        activeMetrics = (metricsState && metricsState.activeMetrics) ? metricsState.activeMetrics : availableMetrics.slice(0, 2)


    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const getTargetingsDetails = async (id) => {
        if (openedSearchTerms.includes(id)) setOpenedSearchTerms(prevState => [...prevState.filter(i => i !== id)])
        else try {
            setProcessingRows(prevState => [...prevState, id])
            const queryParams = queryString.parse(history.location.search)

            const res = await analyticsServices.fetchTargetingsDetails(id, selectedRangeDate, localSorterColumn, [...Object.keys(queryParams).map(key => ({
                filterBy: key,
                type: 'eq',
                value: queryParams[key]
            })).filter(item => !!item.value)])

            setPageData(prevState => ({
                ...prevState,
                table: {
                    ...prevState.table,
                    response: prevState.table.response.map(item => {
                        if (item.queryCRC64 === id) {
                            item.targetingsData = res.response
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

    const getPageData = debounce(50, false, async (pageParts) => {
        setOpenedSearchTerms([])

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


            const res = await analyticsServices.getSearchTermsData({
                ...tableRequestParams,
                sorterColumn: localSorterColumn,
                segment: localSegmentValue,
                pageParts,
                filtersWithState,
                activeMetrics,
            })

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

                                return item
                            })
                        } : prevState.table
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

                const res = await analyticsServices.getSearchTermsData({
                    ...tableRequestParams,
                    sorterColumn: localSorterColumn,
                    segment: localSegmentValue,
                    pageParts: ['table'],
                    filtersWithState,
                    activeMetrics,
                }, `&queryCRC64:in=${idList.join(',')}`)

                setPageData(prevState => {
                    return {
                        ...prevState,
                        table: {
                            ...prevState.table,
                            response: [...prevState.table.response.map(item => ({
                                ...item,
                                compareWithPrevious: true,
                                ..._.mapKeys(_.find(res.table.response, {queryCRC64: item['queryCRC64']}), (value, key) => {
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
        localStorage.setItem('analyticsSTSegmentValue', value)
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
        localStorage.setItem('analyticsPageSize', tableRequestParams.pageSize)

        getPageData(['table'])

        if (localSegmentValue === 'targetings') setOpenedSearchTerms(pageData.table.response.map(i => i.queryCRC64))
        else setOpenedSearchTerms([])
    }, [tableRequestParams, localSegmentValue, localTableOptions])

    useEffect(() => {
        getPageData(['metrics', 'table', 'chart'])
    }, [selectedRangeDate, filters])

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
                moreActions={<SegmentFilter
                    segment={localSegmentValue}
                    onChange={changeSegmentHandler}
                />}
                openedRow={(row) => openedSearchTerms.includes(row.queryCRC64) || localSegmentValue === 'targetings'}
                expandedRowRender={(props, columnsBlackList) => expandedRowRender(props, openedSearchTerms.length > 0 || localSegmentValue === 'targetings', setStateHandler, columnsBlackList)}

                onChange={(data) => setTableRequestParams(data)}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}
            />
        </div>
    )
}

export default memo(SearchTerms)
