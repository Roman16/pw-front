import React, {useState} from "react";
import CustomSelect from "../../../../components/Select/Select";
import DatePicker from "../../../../components/DatePicker/DatePickerRange";
import TreeSelect from "../../../../components/TreeSelect/TreeSelect";
import {Input, Select} from "antd";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const Option = Select.Option;

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
        label: 'AddedCreatedKeywordAsNegative',
        value: 'AddedCreatedKeywordAsNegative'
    },
    {
        label: 'AddedCreatedPATAsNegative',
        value: 'AddedCreatedPATAsNegative'
    },
    {
        label: 'ChangedKeywordBidACoS',
        value: 'ChangedKeywordBidACoS'
    },
    {
        label: 'ChangedKeywordBidImpressions',
        value: 'ChangedKeywordBidImpressions'
    },
    {
        label: 'ChangedPATBidACoS',
        value: 'ChangedPATBidACoS'
    },
    {
        label: 'ChangedPATBidImpressions',
        value: 'ChangedPATBidImpressions'
    },
    {
        label: 'CreatedAdGroup',
        value: 'CreatedAdGroup'
    },
    {
        label: 'CreatedCampaign',
        value: 'CreatedCampaign'
    },
    {
        label: 'CreatedKeywordFromCST',
        value: 'CreatedKeywordFromCST'
    },
    {
        label: 'CreatedNegativeKeywordFromCSTHighACoS',
        value: 'CreatedNegativeKeywordFromCSTHighACoS'
    },
    {
        label: 'CreatedNegativeKeywordFromCSTNoSales',
        value: 'CreatedNegativeKeywordFromCSTNoSales'
    },
    {
        label: 'CreatedNegativePATFromCSTHighACoS',
        value: 'CreatedNegativePATFromCSTHighACoS'
    },
    {
        label: 'CreatedNegativePATFromCSTNoSales',
        value: 'CreatedNegativePATFromCSTNoSales'
    },
    {
        label: 'CreatedPATFromCST',
        value: 'CreatedPATFromCST'
    },
    {
        label: 'CreatedProductAd',
        value: 'CreatedProductAd'
    },
    {
        label: 'PausedKeywordDuplicateFromCustomerSearchTerm',
        value: 'PausedKeywordDuplicateFromCustomerSearchTerm'
    },
    {
        label: 'PausedKeywordDuplicateOfPAT',
        value: 'PausedKeywordDuplicateOfPAT'
    },
    {
        label: 'PausedKeywordDuplicate',
        value: 'PausedKeywordDuplicate'
    },
    {
        label: 'PausedKeywordHighACoS',
        value: 'PausedKeywordHighACoS'
    },
    {
        label: 'PausedKeywordNoSales',
        value: 'PausedKeywordNoSales'
    },
    {
        label: 'PausedPATHighACoS',
        value: 'PausedPATHighACoS'
    },
    {
        label: 'PausedPATNoSales',
        value: 'PausedPATNoSales'
    },
    {
        label: 'PausedPATDuplicate',
        value: 'PausedPATDuplicate'
    },
    {
        label: 'RevertLastChangeKeywordNoSales',
        value: 'RevertLastChangeKeywordNoSales'
    },
    {
        label: 'RevertLastChangePATNoSales',
        value: 'RevertLastChangePATNoSales'
    }
]

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
}

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
    'type': [{label: 'Contains', key: 'contains'}]

}

const FilterWindow = ({columns, onClose, onAddFilter, filters}) => {
    const [filterBy, setFilterBy] = useState(),
        [filterType, setFilterType] = useState(),
        [filterValue, setFilterValue] = useState();

    const changeFilterByHandler = (value) => {
        setFilterBy(value);
        setFilterType(containsVariations[value][0])
        setFilterValue(null)
    }

    const changeTypeHandler = (value) => {
        setFilterType(containsVariations[filterBy].find(item => item.key === value))

    }
    const changeValueHandler = (value) => {
        setFilterValue(value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        onAddFilter({
            filterBy: filterBy,
            type: filterType,
            value: filterValue
        })

        setFilterBy(undefined);
        setFilterType(undefined);
        setFilterValue(undefined);
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
                    timeRange={(startDate, endDate) => changeValueHandler({startDate, endDate})}
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

                {filterBy === 'type' &&
                <CustomSelect
                    // value={filterValue}
                    onChange={changeValueHandler}
                    placeholder={'Type'}
                    getPopupContainer={trigger => trigger.parentNode}
                >
                    {reasonList.map((item, index) => (
                        <Option value={item.value} title={item.label}>{item.label}</Option>
                    ))}
                </CustomSelect>}
            </div>
        </div>

        <div className="buttons">
            <button type={'button'} className="btn white" onClick={onClose}>Cancel</button>
            <button className="btn default" disabled={!filterValue}>Add Filter</button>
        </div>
    </form>)
}

export default FilterWindow;
