import React, {useState} from "react";
import CustomSelect from "../../../../components/Select/Select";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";
import TreeSelect from "../../../../components/TreeSelect/TreeSelect";
import {Select} from "antd";

const Option = Select.Option;


const FilterWindow = ({columns, onClose, onAddFilter}) => {
    const [filterBy, setFilterBy] = useState(),
        [filterType, setFilterType] = useState('contains'),
        [filterValue, setFilterValue] = useState();

    const changeFilterByHandler = (value) => {
        setFilterBy(value);
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
                    {columns.map(column => {
                            if (column.key !== 'action' && column.key !== 'type') {
                                return (
                                    <Option value={column.key}>{column.title}</Option>
                                )
                            } else {
                                return null
                            }
                        }
                    )}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    required
                    value={filterType}
                    onChange={changeTypeHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterBy}
                >
                    <Option value={'contains'}>Contains</Option>
                    <Option value={'range'}>Range</Option>
                </CustomSelect>
            </div>

            <div className="form-group">
                {filterBy === 'datetime' && <DatePicker
                    timeRange={changeValueHandler}
                />}

                {filterBy !== 'datetime' && filterBy !== 'object' && <CustomSelect
                    required
                    placeholder={'Type'}
                    value={filterValue}
                    onChange={changeValueHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterBy}
                >
                    <Option value={'all'}>all</Option>
                </CustomSelect>}

                {filterBy === 'object' && <TreeSelect
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
