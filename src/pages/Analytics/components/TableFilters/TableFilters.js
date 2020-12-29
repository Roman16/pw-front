import React, {useState} from "react"
import {SVG} from "../../../../utils/icons"
import {Input, Popover} from "antd"
import './TableFilters.less'
import CustomSelect from "../../../../components/Select/Select"
import DateRange from "../DateRange/DateRange"
import {useDispatch, useSelector} from "react-redux"
import {FilterItem} from "../../../PPCAutomate/Report/Filters/FilterItem"
import {analyticsActions} from "../../../../actions/analytics.actions"
import FilterWindow from "./FilterWindow"
import _ from 'lodash'

const {Search} = Input

const TableFilters = ({columns, filters = [], locationKey, searchField}) => {
    const [visibleFilterPopover, setVisibleFilterPopover] = useState(false),
        [indexSelectedFilter, setIndexSelectedFilter] = useState(null),
        [editFilter, setEditFilter] = useState(undefined),
        [searchValue, setSearchValue] = useState(filters.find(filter => filter.type === 'search') ? filters.find(filter => filter.type === 'search').value : undefined)

    const dispatch = useDispatch()

    const editFilterHandler = (filter, index) => {
        setIndexSelectedFilter(index)
        setEditFilter(filter)
    }

    const updateFilterListHandler = (filters) => {
        dispatch(analyticsActions.updateFiltersList(filters))
    }

    const addFilterHandler = (filter) => {
        if (indexSelectedFilter != null) {
            updateFilterListHandler([...filters.map((item, index) => {
                if (index === indexSelectedFilter) {
                    item = filter
                }

                return item
            })])
        } else {
            updateFilterListHandler([...filters, filter])
        }

        setVisibleFilterPopover(false)
        setIndexSelectedFilter(null)
        setEditFilter(undefined)
    }

    const resetHandler = () => {
        const productViewFilter = _.find(filters, {filterBy: 'productView'})
        updateFilterListHandler(productViewFilter ? [productViewFilter] : [])
        setIndexSelectedFilter(null)
        setEditFilter(undefined)
    }


    const searchHandler = ({target: {value}}) => {
        const filterIndex = _.findIndex(filters, {type: 'search'})

        const filter = {
            filterBy: columns.find(column => column.search).dataIndex,
            type: 'search',
            value: value
        }

        if (filterIndex === -1 && !value) {
            return false
        } else if(filters[filterIndex] && filters[filterIndex].value === value) {
            return false
        } else if (filterIndex !== -1) {
            updateFilterListHandler([...filters.map((item, index) => {
                if (index === filterIndex) {
                    item = filter
                }
                return item
            })])
        } else {
            updateFilterListHandler([...filters, filter])
        }
    }

    const removeFilterHandler = (index) => updateFilterListHandler(filters.filter((item, itemIndex) => itemIndex !== index))


    return (
        <>
            <div className="list-filters-block">
                {searchField && <div className="form-group search-block">
                    <Search
                        className="search-field"
                        placeholder={`Search by ${columns.find(column => column.search).title}`}
                        onChange={e => setSearchValue(e.target.value)}
                        onPressEnter={searchHandler}
                        onBlur={searchHandler}
                        value={searchValue}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>}

                <Popover
                    content={<FilterWindow
                        filters={filters}
                        columns={columns}
                        onClose={() => setVisibleFilterPopover(false)}
                        editFilter={editFilter}
                        locationKey={locationKey}
                        onAddFilter={(filter) => {
                            addFilterHandler(filter)
                            setVisibleFilterPopover(false)
                        }}
                    />}
                    getPopupContainer={(node) => node.parentNode}
                    destroyTooltipOnHide={true}
                    placement="bottomLeft"
                    overlayClassName={'filter-popover analytics-filter-popover'}
                    trigger="click"
                    visible={visibleFilterPopover}
                >
                    <button
                        onClick={() => {
                            setVisibleFilterPopover(prevState => !prevState)
                            setIndexSelectedFilter(null)
                            setEditFilter(undefined)
                        }}
                    >
                        <i><SVG id={'filter-icon'}/></i>
                        <span>Add Filter</span>
                    </button>
                </Popover>
            </div>

            <div className="current-filters filters-list">
                {filters.map((filter, index) => (
                    filter.type !== 'search' && filter.filterBy !== 'productView' && <Popover
                        content={<FilterWindow
                            filters={filters}
                            columns={columns}
                            onClose={() => setIndexSelectedFilter(null)}
                            editFilter={editFilter}
                            locationKey={locationKey}
                            onAddFilter={(filter) => {
                                addFilterHandler(filter)
                            }}
                        />}
                        getPopupContainer={(node) => node.parentNode}
                        destroyTooltipOnHide={true}
                        placement="bottomLeft"
                        overlayClassName={'filter-popover analytics-filter-popover'}
                        trigger="click"
                        visible={indexSelectedFilter === index}
                    >
                        <div className="filter-item" onClick={() => editFilterHandler(filter, index)}>
                            <FilterItem
                                filter={filter}
                            />

                            <i className={'icon'} onClick={(e) => {
                                e.stopPropagation()
                                removeFilterHandler(index)
                            }}>
                                <SVG id={'remove-filter-icon'}/>
                            </i>
                        </div>
                    </Popover>
                ))}

                {filters.filter(filter => (filter.type !== 'search' && filter.filterBy !== 'productView')).length > 0 &&
                <button className={'reset-filters'} onClick={resetHandler}>Reset</button>
                }
            </div>
        </>

    )
}

export default TableFilters
