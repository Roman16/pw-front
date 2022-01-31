import React, {useState} from "react"
import {SVG} from "../../../utils/icons"
import {Input, Popover} from "antd"
import FilterWindow from "../../Analytics/components/TableFilters/FilterWindow"
import {FilterItem} from "../../PPCAutomate/Report/Filters/FilterItem"

const {Search} = Input

const Filters = ({filters, columns, processing, onSetFilters, onFixProblems}) => {
    const [visiblePopover, setVisiblePopover] = useState(false),
        [editFilter, setEditFilter] = useState(),
        [indexSelectedFilter, setIndexSelectedFilter] = useState()


    const addFilterHandler = (filter) => {
        if (indexSelectedFilter != null) {
            onSetFilters([...filters.map((item, index) => {
                if (index === indexSelectedFilter) {
                    item = filter
                }

                return item
            })])
        } else {
            onSetFilters([...filters, filter])
        }

        setVisiblePopover(false)
        setIndexSelectedFilter(null)
        setEditFilter(undefined)
    }

    const removeFilterHandler = (index) => onSetFilters([...filters.filter((item, itemIndex) => itemIndex !== index)])

    const editFilterHandler = (filter, index) => {
        setIndexSelectedFilter(index)
        setEditFilter(filter)
    }

    const resetHandler = () => onSetFilters([])

    return (<div className="filters">
        <div className="row">
            <Popover
                content={<FilterWindow
                    filters={filters}
                    columns={columns}
                    onClose={() => setVisiblePopover(false)}
                    editFilter={editFilter}
                    onAddFilter={(filter) => {
                        addFilterHandler(filter)
                        setVisiblePopover(false)
                    }}
                />}
                getPopupContainer={(node) => node.parentNode}
                destroyTooltipOnHide={true}
                placement="bottomLeft"
                overlayClassName={'filter-popover analytics-filter-popover'}
                trigger="click"
                visible={visiblePopover}
            >
                <button
                    onClick={() => setVisiblePopover(prevState => !prevState)}
                    className={'btn add-filter'}
                >
                    <i><SVG id={'filter-icon'}/></i>
                    <span>Add Filter</span>
                </button>
            </Popover>

            {!processing && <button className="btn default fix" onClick={onFixProblems}>
                Fix All Problems
            </button>}
        </div>

        {filters.filter(item => item.type !== 'search').length > 0 && <div className="current-filters filters-list">
            {filters.map((filter, index) => (
                filter.type !== 'search' && filter.filterBy !== 'productView' && <Popover
                    content={<FilterWindow
                        filters={filters}
                        columns={columns}
                        onClose={() => setIndexSelectedFilter(null)}
                        editFilter={editFilter}
                        // locationKey={locationKey}
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
                    <div
                        className="filter-item"
                        onClick={() => editFilterHandler(filter, index)}
                    >
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
        }
    </div>)
}

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M13 13L9.32215 9.32215M9.32215 9.32215C10.2043 8.43994 10.75 7.22119 10.75 5.875C10.75 3.18261 8.56739 1 5.875 1C3.18261 1 1 3.18261 1 5.875C1 8.56739 3.18261 10.75 5.875 10.75C7.22119 10.75 8.43994 10.2043 9.32215 9.32215Z"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


export default Filters