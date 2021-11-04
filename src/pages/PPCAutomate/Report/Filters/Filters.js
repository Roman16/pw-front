import React, {useState} from "react"
import './Filters.less'
import {SVG} from "../../../../utils/icons"
import {Popover} from "antd"
import FilterWindow from "./FiltersWindow"
import {FilterItem} from "./FilterItem"

const Filters = ({columns, onChange, filters, currentTab}) => {
    const [visibleFilterPopover, setVisibleFilterPopover] = useState(false),
        [indexSelectedFilter, setIndexSelectedFilter] = useState(null),
        [editFilter, setEditFilter] = useState(undefined)

    const editFilterHandler = (filter, index) => {
        setIndexSelectedFilter(index)
        setEditFilter(filter)
    }

    const addFilterHandler = (filter) => {
        if (indexSelectedFilter != null) {
            onChange([...filters.map((item, index) => {
                if (index === indexSelectedFilter) {
                    item = filter
                }

                return item
            })])
        } else {
            onChange([...filters, filter])
        }

        setVisibleFilterPopover(false)
        setIndexSelectedFilter(null)
        setEditFilter(undefined)
    }

    const resetFiltersHandler = () => {
        onChange([])
    }

    const removeFilterHandler = (index) => onChange(filters.filter((item, itemIndex) => itemIndex !== index))


    return (
        <div className="report-filter filters-list">
            <p>Filters: </p>

            {filters.map((filter, index) => (
                <Popover
                    content={<FilterWindow
                        filters={filters}
                        columns={columns}
                        currentTab={currentTab}
                        onClose={() => setIndexSelectedFilter(null)}
                        editFilter={editFilter}
                        onAddFilter={(filter) => {
                            addFilterHandler(filter)
                        }}
                    />}
                    destroyTooltipOnHide={true}
                    placement="bottomLeft"
                    overlayClassName={'filter-popover'}
                    trigger="click"
                    visible={indexSelectedFilter === index}
                >
                    <div className="filter-item" onClick={() => editFilterHandler(filter, index)}>
                        <FilterItem
                            filter={filter}
                        />

                        <i onClick={(e) => {
                            e.stopPropagation()
                            removeFilterHandler(index)
                        }}>
                            <SVG id={'remove-filter-icon'}/>
                        </i>
                    </div>
                </Popover>
            ))}

            {((currentTab === 'all-reports' && filters.length < 4) ||
                (currentTab === 'targeting-improvements' && filters.length < 10) ||
                (currentTab === 'search-terms' && filters.length < 7)) && <Popover
                content={<FilterWindow
                    filters={filters}
                    columns={columns}
                    currentTab={currentTab}
                    onClose={() => setVisibleFilterPopover(false)}
                    editFilter={editFilter}
                    onAddFilter={(filter) => {
                        addFilterHandler(filter)
                        setVisibleFilterPopover(false)
                    }}
                />}
                destroyTooltipOnHide={true}
                placement="bottomLeft"
                overlayClassName={'filter-popover'}
                trigger="click"
                visible={visibleFilterPopover}
            >
                <button type={'button'} className={'btn blue add-filter'} onClick={() => {
                    setVisibleFilterPopover(prevState => !prevState)
                    setIndexSelectedFilter(null)
                    setEditFilter(undefined)
                }}>
                    <PlusButton/>
                </button>
            </Popover>}

            {filters.length > 0 && <button className={'reset-btn'} onClick={resetFiltersHandler}>
                Reset
            </button>}
        </div>
    )
}


const PlusButton = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16"/>
    <rect width="10" height="10" transform="translate(11 11)"/>
    <mask id="mask0_20400:68194" maskUnits="userSpaceOnUse" x="11" y="11" width="10" height="10">
        <rect x="11" y="11" width="10" height="10" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_20400:68194)">
        <path d="M16 11.5V16M16 16H20.5M16 16H11.5M16 16V20.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
</svg>


export default Filters
