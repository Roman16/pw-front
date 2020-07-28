import React, {useState} from "react";
import './Filters.less';
import {SVG} from "../../../../utils/icons";
import {Popover} from "antd";
import FilterWindow from "./FiltersWindow";
import moment from "moment";

const valueTile = {
    'keyword': 'Keyword',
    'pt': 'PT',
    'campaign': 'Campaign',
    'ad_group': 'Ad Group',
    'product_ad': 'Product Ad',
    //---------------------------
    //reason
    'adjusted_bid': 'Adjusted bid',
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


const FilterItem = ({filter, onRemove, onEdit}) => {
    if (filter.filterBy === 'datetime') {
        return (
            <div className="filter-item">
                {`${moment(filter.value.startDate, 'D-M-YY').format('MMM DD, YYYY')} - ${moment(filter.value.endDate, 'D-M-YY').format('MMM DD, YYYY')}`}

                <i onClick={onRemove}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    } else if (filter.filterBy === 'object' || filter.filterBy === 'keyword_pt' || filter.filterBy === 'campaign_name' || filter.filterBy === 'ad_group_name') {
        return (
            <div className="filter-item">
                {`${columnTitle[filter.filterBy]} ${filter.type.key}: ${filter.value}`}
                <i onClick={onRemove}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    } else if (filter.filterBy === 'object_type' || filter.filterBy === 'match_type') {
        return (
            <div className="filter-item">
                {`${columnTitle[filter.filterBy]} is one of: ${filter.value.map(item => valueTile[item]).join(', ')}`}
                <i onClick={onRemove}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    } else if (filter.filterBy === 'impressions' || filter.filterBy === 'clicks' || filter.filterBy === 'spend' || filter.filterBy === 'sales' || filter.filterBy === 'acos') {
        return (
            <div className="filter-item">
                {`${columnTitle[filter.filterBy]} ${numberMark[filter.type.key]} ${filter.value}`}
                <i onClick={onRemove}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    } else if (filter.filterBy === 'keyword_id') {
        return (
            <div className="filter-item" onClick={onEdit}>
                {`${columnTitle[filter.filterBy]} = ${filter.value}`}
                <i onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    }else if (filter.filterBy === 'type') {
        return (
            <div className="filter-item">
                Reason is one of: {filter.value.map(item => valueTile[item]).join(', ')}
                <i onClick={onRemove}><SVG id={'remove-filter-icon'}/></i>
            </div>
        )
    }
}

const Filters = ({columns, onChange, filters, currentTab}) => {
    const [visibleFilterPopover, setVisibleFilterPopover] = useState(false),
        [visibleEditFilterPopover, setVisibleEditFilterPopover] = useState(false),
        [editFilter, setEditFilter] = useState(null);

    const editFilterHandler = (filter) => {
        setEditFilter(filter);
    }

    const addFilterHandler = (filter) => {
        onChange([...filters, filter])
    }

    const resetFiltersHandler = () => {
        onChange([])
    };

    const removeFilterHandler = (index) => onChange(filters.filter((item, itemIndex) => itemIndex !== index));


    return (
        <div className="report-filter">
            <p>Filters: </p>

            {filters.map((filter, index) => (
                <FilterItem
                    filter={filter}
                    onRemove={() => removeFilterHandler(index)}
                    onEdit={() => editFilterHandler(filter)}
                />
            ))}

            {((currentTab === 'all-reports' && filters.length < 3) ||
                (currentTab === 'targeting-improvements' && filters.length < 10) ||
                (currentTab === 'search-terms' && filters.length < 7)) && <Popover
                content={<FilterWindow
                    filters={filters}
                    columns={columns}
                    onClose={() => setVisibleFilterPopover(false)}
                    onAddFilter={(filter) => {
                        addFilterHandler(filter)
                        setVisibleFilterPopover(false)
                    }}
                />}
                placement="bottomLeft"
                overlayClassName={'filter-popover'}
                trigger="click"
                visible={visibleFilterPopover}
                onVisibleChange={() => {
                    setVisibleFilterPopover(prevState => !prevState)
                }}
            >
                <button className={'btn default add-filter'}>
                    <SVG id={'plus-icon'}/>
                </button>
            </Popover>}

            {filters.length > 0 && <button className={'reset-btn'} onClick={resetFiltersHandler}>
                Reset
            </button>}
        </div>
    )
};

export default Filters;