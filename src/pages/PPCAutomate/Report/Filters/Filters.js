import React, {useState} from "react";
import './Filters.less';
import {SVG} from "../../../../utils/icons";
import {Popover, Select} from "antd";
import DatePicker from "../../../../components/DatePicker/DatePickerOLD";

import CustomSelect from "../../../../components/Select/Select";

const Option = Select.Option;

const FilterPopover = ({columns, onClose, onAddFilter}) => {
    const [filterByValue, setFilterByValue] = useState(),
        [typeValue, setTypeValue] = useState('contains'),
        [filterValue, setFilterValue] = useState();

    const changeFilterByHandler = (value) => {
        setFilterByValue(value)
    }

    const changeTypeHandler = (value) => {
        setTypeValue(value)
    }
    const changeValueHandler = (value) => {
        setFilterValue(value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        onAddFilter({
            filterBy: filterByValue,
            type: typeValue,
            value: filterValue
        })

        setFilterByValue(undefined);
        setTypeValue('contains');
        setFilterValue(undefined);
    }

    return (<form className="filter-variables" onSubmit={submitHandler}>
        <div className="row">
            <div className="form-group">
                <CustomSelect
                    required={true}
                    placeholder={'Filter by'}
                    value={filterByValue}
                    onChange={changeFilterByHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                >
                    <Option value={'eventDateTime'}>Date</Option>
                    {columns.map(column => (
                        <Option value={column.key}>{column.title}</Option>
                    ))}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    required
                    value={typeValue}
                    onChange={changeTypeHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterByValue}
                >
                    <Option value={'contains'}>Contains</Option>
                    <Option value={'range'}>Range</Option>
                </CustomSelect>
            </div>

            <div className="form-group">
                {filterByValue === 'eventDateTime' && <DatePicker
                    timeRange={changeValueHandler}
                />}

                {filterByValue !== 'eventDateTime' && <CustomSelect
                    required
                    placeholder={'Type'}
                    value={filterValue}
                    onChange={changeValueHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterByValue}
                >
                    <Option value={'all'}>all</Option>
                </CustomSelect>}
            </div>
        </div>

        <div className="buttons">
            <button type={'button'} className="btn white" onClick={onClose}>Cancel</button>
            <button className="btn default" disabled={!filterValue}>Add Filter</button>
        </div>
    </form>)
}

const Filters = ({columns, onAddFilter, filters, onReset, onRemove}) => {
    const [visibleFilterPopover, setVisibleFilterPopover] = useState(false)

    return (
        <div className="report-filter">
            <p>Filters: </p>

                {filters.map((filter, index) => (
                    <div className="filter-items">
                        {`${filter.filterBy} ${filter.type} ${filter.value}`}

                        <i onClick={() => onRemove(index)}><SVG id={'remove-filter-icon'}/></i>
                    </div>
                ))}

            <Popover
                content={<FilterPopover
                    columns={columns}
                    onClose={() => setVisibleFilterPopover(false)}
                    onAddFilter={(filter) => {
                        onAddFilter(filter)
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
            </Popover>

            {filters.length > 0 && <button className={'reset-btn'} onClick={onReset}>
                Reset
            </button>}
        </div>
    )
};

export default Filters;