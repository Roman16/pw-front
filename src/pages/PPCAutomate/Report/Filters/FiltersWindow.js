import React, {useState} from "react"
import CustomSelect from "../../../../components/Select/Select"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"
import {Input, Select} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {dashboardActions} from "../../../../actions/dashboard.actions"

const Option = Select.Option

const numberVariations = [
    {label: 'Greater than', key: 'gt'},
    {label: 'Equals', key: 'eq'},
    {label: 'Less than', key: 'lt'},
    {label: 'Greater than or equal to', key: 'gte'},
    {label: 'Less than or equal to', key: 'lte'},
    {label: 'Not equals', key: 'neq'}
]

const reasonList = [
    {
        label: 'Added Created Keyword As Negative',
        value: 'AddedCreatedKeywordAsNegative'
    },
    {
        label: 'Added Created PAT As Negative',
        value: 'AddedCreatedPATAsNegative'
    },
    {
        label: 'Changed Keyword Bid ACoS',
        value: 'ChangedKeywordBidACoS'
    },
    {
        label: 'Changed Keyword Bid Impressions',
        value: 'ChangedKeywordBidImpressions'
    },
    {
        label: 'Changed PAT Bid ACoS',
        value: 'ChangedPATBidACoS'
    },
    {
        label: 'Changed PAT Bid Impressions',
        value: 'ChangedPATBidImpressions'
    },
    {
        label: 'Created Ad Group',
        value: 'CreatedAdGroup'
    },
    {
        label: 'Created Campaign',
        value: 'CreatedCampaign'
    },
    {
        label: 'Created Keyword From CST',
        value: 'CreatedKeywordFromCST'
    },
    {
        label: 'Created Negative Keyword From CST High ACoS',
        value: 'CreatedNegativeKeywordFromCSTHighACoS'
    },
    {
        label: 'Created Negative Keyword From CST No Sales',
        value: 'CreatedNegativeKeywordFromCSTNoSales'
    },
    {
        label: 'Created Negative PAT From CST High ACoS',
        value: 'CreatedNegativePATFromCSTHighACoS'
    },
    {
        label: 'Created Negative PAT From CST No Sales',
        value: 'CreatedNegativePATFromCSTNoSales'
    },
    {
        label: 'Created PAT From CST',
        value: 'CreatedPATFromCST'
    },
    {
        label: 'Created Product Ad',
        value: 'CreatedProductAd'
    },
    {
        label: 'Paused Keyword Duplicate From Customer Search Term',
        value: 'PausedKeywordDuplicateFromCustomerSearchTerm'
    },
    {
        label: 'Paused Keyword Duplicate Of PAT',
        value: 'PausedKeywordDuplicateOfPAT'
    },
    {
        label: 'Paused Keyword Duplicate',
        value: 'PausedKeywordDuplicate'
    },
    {
        label: 'Paused Keyword High ACoS',
        value: 'PausedKeywordHighACoS'
    },
    {
        label: 'Paused Keyword No Sales',
        value: 'PausedKeywordNoSales'
    },
    {
        label: 'Paused PAT High ACoS',
        value: 'PausedPATHighACoS'
    },
    {
        label: 'Paused PAT No Sales',
        value: 'PausedPATNoSales'
    },
    {
        label: 'Paused PAT Duplicate',
        value: 'PausedPATDuplicate'
    },
    {
        label: 'Revert Last Change Keyword No Sales',
        value: 'RevertLastChangeKeywordNoSales'
    },
    {
        label: 'Revert Las tChange PAT No Sales',
        value: 'RevertLastChangePATNoSales'
    }
]


const containsVariations = {
    'datetime': [{label: 'In', key: 'in'}],
    'object': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'object_type': [{label: 'Is one of', key: 'one_of'}],
    'keyword_pt': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'match_type': [{label: 'Is one of', key: 'one_of'}],
    'campaign_name': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'ad_group_name': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'impressions': numberVariations,
    'clicks': numberVariations,
    'spend': numberVariations,
    'sales': numberVariations,
    'acos': numberVariations,
    'type': [{label: 'Is one of', key: 'one_of'}]

}

const FilterWindow = ({columns, onClose, onAddFilter, filters, currentTab}) => {
    const [filterBy, setFilterBy] = useState(),
        [filterType, setFilterType] = useState(),
        [filterValue, setFilterValue] = useState()


    const multiSelectVariations = {
        'object_type': [
            {title: 'Keyword', key: 'keyword', value: 'keyword'},
            {title: 'PT', key: 'pt', value: 'pt'},
            {title: 'Campaign', key: 'campaign', value: 'campaign'},
            {title: 'Ad Group', key: 'ad_group', value: 'ad_group'},
            {title: 'Product Ad', key: 'product_ad', value: 'product_ad'},
        ],
        'match_type': [
            {title: 'Keyword', key: 'keyword', value: 'keyword'},
            {title: 'PT', key: 'pt', value: 'pt'},
        ],
        'type':
            currentTab === 'targeting-improvements' ? [
                    {title: 'Adjusted bid', key: 'adjusted_bid', value: 'adjusted_bid'},
                    {title: 'Activating keyword / PT', key: 'activating_keyword', value: 'activating_keyword'},
                    {title: 'Not profitable keyword / PT', key: 'not_profitable_keyword_pt', value: 'not_profitable_keyword_pt'},
                    {title: 'Duplicate keyword / PT', key: 'duplicate_keyword_pt', value: 'duplicate_keyword_pt'},
                ] :
                currentTab === 'search-terms' ? [
                        {title: 'Created keyword / PT', key: 'created_keyword_pt', value: 'created_keyword_pt'},
                        {title: 'Created negative keyword / PT', key: 'created_negative_keyword_pt', value: 'created_negative_keyword_pt'},
                        {title: 'Created campaign', key: 'created_campaign', value: 'created_campaign'},
                        {title: 'Created ad group', key: 'created_ad_group', value: 'created_ad_group'},
                        {title: 'Created product ad', key: 'created_product_ad', value: 'created_product_ad'},
                    ] :
                    [
                        {title: 'Adjusted bid', key: 'adjusted_bid', value: 'adjusted_bid'},
                        {title: 'Activating keyword / PT', key: 'activating_keyword', value: 'activating_keyword'},
                        {title: 'Not profitable keyword / PT', key: 'not_profitable_keyword_pt', value: 'not_profitable_keyword_pt'},
                        {title: 'Created keyword / PT', key: 'created_keyword_pt', value: 'created_keyword_pt'},
                        {title: 'Created negative keyword / PT', key: 'created_negative_keyword_pt', value: 'created_negative_keyword_pt'},
                        {title: 'Duplicate keyword / PT', key: 'duplicate_keyword_pt', value: 'duplicate_keyword_pt'},
                        {title: 'Created campaign', key: 'created_campaign', value: 'created_campaign'},
                        {title: 'Created ad group', key: 'created_ad_group', value: 'created_ad_group'},
                        {title: 'Created product ad', key: 'created_product_ad', value: 'created_product_ad'},
                    ]
    }

    const changeFilterByHandler = (value) => {
        setFilterBy(value)
        setFilterType(containsVariations[value][0])
        setFilterValue(null)
    }

    const changeTypeHandler = (value) => {
        setFilterType(containsVariations[filterBy].find(item => item.key === value))

    }
    const changeDateHandler = (startDate, endDate) => {
        if (startDate) {
            setFilterValue({
                startDate,
                endDate
            })
        } else {
            setFilterValue({
                startDate: 'lifetime',
                endDate: 'lifetime'
            })
        }
    }

    const changeValueHandler = (value) => {
        setFilterValue(value)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        onAddFilter({
            filterBy: filterBy,
            type: filterType,
            value: filterValue
        })

        setFilterBy(undefined)
        setFilterType(undefined)
        setFilterValue(undefined)
    }

    return (<form className="filter-variables" onSubmit={submitHandler}>
        <div className="row">
            <div className="form-group">
                <CustomSelect
                    required={true}
                    placeholder={'Filter by'}
                    value={filterBy}
                    onChange={changeFilterByHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                >
                    <Option value={'datetime'}
                            disabled={filters.find(item => item.filterBy === 'datetime')}>Date</Option>
                    {columns.map(column => (column.filter &&
                        <Option value={column.dataIndex}
                                disabled={filters.find(item => item.filterBy === column.dataIndex)}>{column.title}</Option>
                    ))}

                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    required
                    value={filterBy && filterType.key}
                    placeholder={'Contains'}
                    onChange={changeTypeHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterBy}
                >
                    {filterBy && containsVariations[filterBy].map((item, index) => (
                        <Option value={item.key} title={item.label}>{item.label}</Option>
                    ))}
                </CustomSelect>
            </div>

            <div className="form-group">
                {filterBy === 'datetime' &&
                <DatePicker
                    timeRange={(startDate, endDate) => changeDateHandler(startDate, endDate)}
                />}

                {(!filterType ||
                    filterBy === 'object' ||
                    filterBy === 'keyword_pt' ||
                    filterBy === 'campaign_name' ||
                    filterBy === 'ad_group_name'
                ) &&
                <Input
                    disabled={!filterBy}
                    placeholder={'Type'}
                    value={filterValue}
                    onChange={(e) => changeValueHandler(e.target.value)}
                />}

                {(filterBy === 'clicks' || filterBy === 'impressions') &&
                <Input
                    disabled={!filterBy}
                    value={filterValue}
                    placeholder={'Type'}
                    type={'number'}
                    onChange={(e) => changeValueHandler(e.target.value)}
                />}

                {(filterBy === 'acos') &&
                <InputCurrency
                    typeIcon='percent'
                    placeholder={'Type'}
                    value={filterValue}
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'spend' || filterBy === 'sales') &&
                <InputCurrency
                    value={filterValue}
                    placeholder={'Type'}
                    onChange={changeValueHandler}
                />}

                {filterBy && filterType.key === 'one_of' &&
                <TreeSelect
                    treeData={multiSelectVariations[filterBy]}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={filterValue}
                    treeCheckable={true}
                    showSearch={false}
                    placeholder={'Type'}
                    onChange={changeValueHandler}
                />}
            </div>
        </div>

        <div className="buttons">
            <button type={'button'} className="btn white" onClick={onClose}>Cancel</button>
            <button className="btn default" disabled={!filterValue}>Add Filter</button>
        </div>
    </form>)
}

export default FilterWindow
