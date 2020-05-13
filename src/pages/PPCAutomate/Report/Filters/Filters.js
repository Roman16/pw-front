import React, {useState} from "react";
import './Filters.less';
import {SVG} from "../../../../utils/icons";
import {Popover, Select} from "antd";
import FilterWindow from "./FiltersWindow";



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
                content={<FilterWindow
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