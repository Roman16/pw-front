import React, {useState} from "react";
import {SVG} from "../../../../utils/icons";
import {Input, Popover} from "antd";
import './TableFilters.less';
import FilterWindow from "./FilterWindow";
import CustomSelect from "../../../../components/Select/Select";

const {Search} = Input;

const TableFilters = ({columns, filters=[], onChange}) => {
    const [visibleFilterPopover, setVisibleFilterPopover] = useState(false);

    // const editFilterHandler = (filter) => {
    //     setEditFilter(filter);
    // }

    const addFilterHandler = (filter) => {
        onChange([...filters, filter])
    }

    const resetFiltersHandler = () => {
        onChange([])
    };

    const removeFilterHandler = (index) => onChange(filters.filter((item, itemIndex) => itemIndex !== index));


    return (
        <div className="list-filters-block">
            <div className="row">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search'}
                        // onChange={e => onSearch(e.target.value)}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <Popover
                    content={<FilterWindow
                        filters={filters}
                        columns={columns}
                        onClose={() => setVisibleFilterPopover(false)}
                        getPopupContainer={trigger => trigger}
                        onAddFilter={(filter) => {
                            addFilterHandler(filter);
                            setVisibleFilterPopover(false)
                        }}
                    />}
                    placement="bottomLeft"
                    overlayClassName={'analytics-filter-popover'}
                    trigger="click"
                    visible={visibleFilterPopover}
                    onVisibleChange={() => {
                        setVisibleFilterPopover(prevState => !prevState)
                    }}
                >
                    <button><SVG id={'filter-icon'}/></button>
                </Popover>
            </div>

            <div className="current-filters">

            </div>
        </div>

    )
};

export default TableFilters;