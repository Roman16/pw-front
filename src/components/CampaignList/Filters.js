import React from "react";
import {Input, Switch} from "antd";
import {SVG} from "../../utils/icons";

const {Search} = Input;


const Filters = ({
                     onSearch,
                 }) => {

    return (
        <div className="products-filters">
            <div className="row">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by campaign name, ASIN or SKU'}
                        onChange={e => onSearch(e.target.value)}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <button className={'filters'}>
                    <SVG id={'filter-icon'}/>
                </button>
            </div>

            <div className="row">
                <div className="active-only">
                    <Switch
                        // checked={onlyOptimization}
                        // onChange={onShowOnlyOnOptimization}
                    />

                    <label htmlFor="">On day-parting only</label>
                </div>
            </div>
        </div>
    )
};

export default Filters;