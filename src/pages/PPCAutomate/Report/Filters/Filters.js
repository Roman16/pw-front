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

            {((currentTab === 'all-reports' && filters.length < 3) ||
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
                <button type={'button'} className={'btn default add-filter'} onClick={() => {
                    setVisibleFilterPopover(prevState => !prevState)
                    setIndexSelectedFilter(null)
                    setEditFilter(undefined)
                }}>
                    <SVG id={'plus-icon'}/>
                </button>
            </Popover>}

            {filters.length > 0 && <button className={'reset-btn'} onClick={resetFiltersHandler}>
                Reset
            </button>}
        </div>
    )
}

export default Filters