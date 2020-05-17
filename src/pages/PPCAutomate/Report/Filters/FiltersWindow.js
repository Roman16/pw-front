import React, {useState} from "react";
import CustomSelect from "../../../../components/Select/Select";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import TreeSelect from "../../../../components/TreeSelect/TreeSelect";
import {Input, Select} from "antd";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const Option = Select.Option;

const numberVariations = [
    {label: 'Greater than', key: 'greater'},
    {label: 'Equals', key: 'equals'},
    {label: 'Less than', key: 'less'},
    {label: 'Greater than or equal to', key: 'greater_or_equals'},
    {label: 'Less than or equal to', key: 'Less_or_equals'},
    {label: 'Not equals', key: 'not_equals'}
]

const multiSelectVariations = {
    'object_type': [
        {title: 'Keyword', key: 'keyword', value: 'keyword'},
        {title: 'PT', key: 'pt', value: 'pt'},
        {title: 'Campaign', key: 'campaign', value: 'campaign'},
        {title: 'Ad Group', key: 'ad_group', value: 'ad_group'},
        {title: 'Product Ad', key: 'product_ad', value: 'product_ad'},
    ]
}

const containsVariations = {
    'datetime': [{label: 'In', key: 'in'}],
    'object': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'object_type': [{label: 'Is one of', key: 'one_of'}],
    'keyword_PT': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'match_type': [{label: 'Is one of', key: 'one_of'}],
    'campaign_name': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'ad_group_name': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}],
    'impressions': numberVariations,
    'clicks': numberVariations,
    'spend': numberVariations,
    'sales': numberVariations,
    'acos': numberVariations,

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
                        <Option value={column.key}
                                disabled={filters.find(item => item.filterBy === column.key)}>{column.title}</Option>
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
                        <Option value={item.key}>{item.label}</Option>
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
                    filterBy === 'keyword_PT' ||
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
                    type={'number'}
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'acos') &&
                <InputCurrency
                    typeIcon='percent'
                    value={filterValue}
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'spend' || filterBy === 'sales') &&
                <InputCurrency
                    value={filterValue}
                    onChange={changeValueHandler}
                />}

                {filterBy && filterType.key === 'one_of' &&
                <TreeSelect
                    treeData={multiSelectVariations[filterBy]}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={filterValue}
                    treeCheckable={true}
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

export default FilterWindow;
