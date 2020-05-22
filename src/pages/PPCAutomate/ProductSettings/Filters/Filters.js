import React from "react";
import {SVG} from "../../../../utils/icons";
import {Input, Switch} from "antd";

const {Search} = Input;

const Filters = ({onChangeSearch, onChangeSwitch}) => {

    return (
        <div className="filters">
            <div className="form-group">
                <Search
                    className="search-field"
                    placeholder={'Search'}
                    onChange={e => onChangeSearch(e.target.value)}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>

            <div className='switch-block'>
                <Switch
                    onChange={(e) => onChangeSwitch('active', e)}
                />

                <label htmlFor="">
                    Show only Active Listings on Amazon
                </label>
            </div>

            <div className='switch-block'>
                <Switch
                    onChange={(e) => onChangeSwitch('optimization', e)}
                />

                <label htmlFor="">
                    On optimization only
                </label>
            </div>
        </div>
    )
};

export default Filters;