import React from "react"
import {SVG} from "../../../utils/icons"
import {Input, Popover} from "antd"
import FilterWindow from "../../Analytics/components/TableFilters/FilterWindow"

const {Search} = Input

const Filters = () => {

    return (<div className="filters">
        <div className="form-group">
            <Search
                className="search-field"
                placeholder={`Search`}
                // onChange={e => setSearchValue(e.target.value)}
                // onPressEnter={searchHandler}
                // onBlur={searchHandler}
                // value={searchValue}
                suffix={<SearchIcon/>}
            />
        </div>

        <Popover
            content={<FilterWindow
                // filters={filters}
                // columns={columns}
                // onClose={() => setVisibleFilterPopover(false)}
                // editFilter={editFilter}
                // locationKey={locationKey}
                // onAddFilter={(filter) => {
                //     addFilterHandler(filter)
                //     setVisibleFilterPopover(false)
                // }}
            />}
            getPopupContainer={(node) => node.parentNode}
            destroyTooltipOnHide={true}
            placement="bottomLeft"
            overlayClassName={'filter-popover analytics-filter-popover'}
            trigger="click"
            // visible={visibleFilterPopover}
        >
            <button
                // onClick={() => {
                //     setVisibleFilterPopover(prevState => !prevState)
                //     setIndexSelectedFilter(null)
                //     setEditFilter(undefined)
                // }}
                className={'btn add-filter'}
            >
                <i><SVG id={'filter-icon'}/></i>
                <span>Add Filter</span>
            </button>
        </Popover>

    </div>)
}

const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 13L9.32215 9.32215M9.32215 9.32215C10.2043 8.43994 10.75 7.22119 10.75 5.875C10.75 3.18261 8.56739 1 5.875 1C3.18261 1 1 3.18261 1 5.875C1 8.56739 3.18261 10.75 5.875 10.75C7.22119 10.75 8.43994 10.2043 9.32215 9.32215Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


export default Filters