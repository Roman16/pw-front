import React, {useEffect, useState} from 'react'
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

let prevActiveMetrics = []

const SearchTerms = () => {
    const location = 'searchTerms',
        availableMetrics = [...metricsKeysWithoutOrganic]

    const dispatch = useDispatch()

    const sorterColumnFromLocalStorage = localStorage.getItem('analyticsSorterColumn') ? JSON.parse(localStorage.getItem('analyticsSorterColumn')) : {},
        segmentValueFromLocalStorage = localStorage.getItem('analyticsSTSegmentValue') ? localStorage.getItem('analyticsSTSegmentValue') : 'none',
        tableOptionsFromLocalStorage = localStorage.getItem('analyticsTableOptions') ? JSON.parse(localStorage.getItem('analyticsTableOptions')) : {}

    const [pageData, setPageData] = useState({
            metrics: {},
            chart: [],
            table: {
                response: []
            }
        }),
        [tableRequestParams, setTableRequestParams] = useState({
            page: 1,
            pageSize: 30,
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

    const getPageData = debounce(50, false, async (pageParts) => {
        try {
            if (pageParts.includes('table')) setTableFetchingStatus(true)
            if (pageParts.includes('chart')) setChartFetchingStatus(true)

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

            const res = await analyticsServices.getSearchTermsData({
                ...tableRequestParams,
                sorterColumn: localSorterColumn,
                segment:localSegmentValue,
                pageParts,
                filtersWithState,
                activeMetrics,
            })

            setPageData(prevState => ({
                metrics: res.metrics || prevState.metrics,
                chart: res.chart || prevState.chart,
                table: res.table || prevState.table
            }))

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

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const getTargetingsDetails = async () => {
        try {
            setTableFetchingStatus(true)

            const res = analyticsServices.fetchTargetingsDetails(pageData.table.response.map(i => i.queryCRC64), selectedRangeDate)

            setTableFetchingStatus(false)
        } catch (e) {

        }
    }

    useEffect(() => {
        if (localSegmentValue === 'targetings') getTargetingsDetails()
    }, [localSegmentValue, pageData.table])

    useEffect(() => {
        if (JSON.stringify(prevActiveMetrics) !== JSON.stringify(activeMetrics.filter(item => item !== null))) {
            getPageData(['chart'])
            prevActiveMetrics = [...activeMetrics]
        }
    }, [activeMetrics])

    useEffect(() => {
        getPageData(['table'])
    }, [tableRequestParams, localSegmentValue])

    useEffect(() => {
        getPageData(['metrics', 'table', 'chart'])
    }, [selectedRangeDate, filters])

    const columns = STColumnsList(localSegmentValue, setStateHandler)

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
                moreActions={<SegmentFilter segment={localSegmentValue} onChange={changeSegmentHandler}/>}

                onChange={(data) => setTableRequestParams(data)}
                onChangeSorterColumn={changeSorterColumnHandler}
                onChangeTableOptions={changeTableOptionsHandler}
            />
        </div>
    )
}

export default SearchTerms
