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

const FilterWindow = ({columns, onClose, onAddFilter}) => {
    const [filterBy, setFilterBy] = useState(),
        [filterType, setFilterType] = useState(),
        [filterValue, setFilterValue] = useState();

    const changeFilterByHandler = (value) => {
        setFilterBy(value);
        setFilterType(containsVariations[value][0])
        setFilterValue(null)
    }

    const changeTypeHandler = (value) => {
        setFilterType(value)
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
        setFilterType('contains');
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
                    <Option value={'datetime'}>Date</Option>
                    {columns.map(column => (column.filter && <Option value={column.key}>{column.title}</Option>))}

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
                    timeRange={changeValueHandler}
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
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'clicks' || filterBy === 'impressions') &&
                <Input
                    disabled={!filterBy}
                    type={'number'}
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'acos') &&
                <InputCurrency
                    typeIcon='percent'
                    onChange={changeValueHandler}
                />}

                {(filterBy === 'spend' || filterBy === 'sales') &&
                <InputCurrency
                    onChange={changeValueHandler}
                />}

                {filterBy && filterType.key === 'one_of' &&
                <TreeSelect
                    treeData={[
                        {
                            title: 'filter1',
                            value: '1',
                            key: '1',
                        },
                        {
                            title: 'filter2',
                            value: '2',
                            key: '2',
                        },
                        {
                            title: 'filter3',
                            value: '3',
                            key: '3',
                        },
                        {
                            title: 'filter4',
                            value: '4',
                            key: '4',
                        },
                        {
                            title: 'filter5',
                            value: '5',
                            key: '5',
                        },
                    ]}
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
