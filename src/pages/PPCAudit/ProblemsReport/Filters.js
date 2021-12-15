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
                suffix={<SVG id={'search'}/>}
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

export default Filters