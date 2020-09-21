import React, {useState} from "react"
import './Filters.less'
import {SVG} from "../../../../utils/icons"
import {Popover} from "antd"
import FilterWindow from "./FiltersWindow"
import moment from "moment"

const valueTile = {
    'keyword': 'Keyword',
    'pt': 'PT',
    'campaign': 'Campaign',
    'ad_group': 'Ad Group',
    'product_ad': 'Product Ad',
    //---------------------------
    //reason
    'adjusted_bid': 'Adjusted bid',
    'activating_keyword': 'Activating keyword / PT',
    'not_profitable_keyword_pt': 'Not profitable keyword / PT',
    'created_keyword_pt': 'Created keyword / PT',
    'created_negative_keyword_pt': 'Created negative keyword / PT',
    'duplicate_keyword_pt': 'Duplicate keyword / PT',
    'created_campaign': 'Created campaign',
    'created_ad_group': 'Created ad group',
    'created_product_ad': 'Created product ad'
}

const numberMark = {
    'gt': '>',
    'eq': '=',
    'lt': '<',
    'gte': '>=',
    'lte': '<=',
    'neq': '!=',
}

const columnTitle = {
    'object': 'Object',
    'keyword_pt': 'Keyword / PT',
    'object_type': 'Object Type',
    'match_type': 'Match Type',
    'campaign_name': 'Campaign',
    'ad_group_name': 'Ad Group',
    'impressions': 'Impressions',
    'clicks': 'Clicks',
    'spend': 'Spend',
    'sales': 'Sales',
    'acos': 'ACoS',
    'keyword_id': 'Keyword ID',
}


const FilterItem = ({filter}) => {
    if (filter.filterBy === 'datetime') {
        return (
            <>
                {`${filter.value.startDate === 'lifetime' ? 'lifetime' : moment(filter.value.startDate).format('MMM DD, YYYY')} - ${filter.value.endDate === 'lifetime' ? 'lifetime' : moment(filter.value.endDate).format('MMM DD, YYYY')}`}
            </>
        )
    } else if (filter.filterBy === 'object' || filter.filterBy === 'keyword_pt' || filter.filterBy === 'campaign_name' || filter.filterBy === 'ad_group_name') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} ${filter.type.key}: ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'object_type' || filter.filterBy === 'match_type') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} is one of: ${filter.value.map(item => valueTile[item]).join(', ')}`}
            </>
        )
    } else if (filter.filterBy === 'impressions' || filter.filterBy === 'clicks' || filter.filterBy === 'spend' || filter.filterBy === 'sales' || filter.filterBy === 'acos') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} ${numberMark[filter.type.key]} ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'keyword_id') {
        return (
            <>
                {`${columnTitle[filter.filterBy]} = ${filter.value}`}
            </>
        )
    } else if (filter.filterBy === 'type') {
        return (
            <>
                Reason is one of: {filter.value.map(item => valueTile[item]).join(', ')}
            </>
        )
    }
}

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
        <div className="report-filter">
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