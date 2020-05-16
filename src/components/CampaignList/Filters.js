import React, {useState} from "react";
import {Dropdown, Input, Menu, Switch, Select} from "antd";
import {SVG} from "../../utils/icons";
import CustomSelect from "../Select/Select";

const {Search} = Input,
    Option = Select.Option;

const Filters = ({
                     onSearch,
                 }) => {

    const [visibleDropdown, setVisibleDropdown] = useState(false),
        [campaign_type, setCampaignType] = useState('all'),
        [campaign_status, setCampaignStatus] = useState('all');

    const dropdownWindow = (
        <Menu className={'filter-dropdown-window'}>
            <div className="row">
                <div className="form-group">
                    <label htmlFor="">Campaign Type</label>

                    <CustomSelect value={campaign_type} onChange={value => setCampaignType(value)}>
                        <Option value={'all'}>All</Option>
                    </CustomSelect>
                </div>
                <div className="form-group">
                    <label htmlFor="">Campaign Status</label>

                    <CustomSelect value={campaign_status} onChange={value => setCampaignStatus(value)}>
                        <Option value={'all'}>All</Option>
                    </CustomSelect>
                </div>
            </div>

            <div className="buttons">
                <button className={'btn white'} onClick={() => setVisibleDropdown(false)}>Reset</button>
                <button className={'btn default'}>Apply</button>
            </div>
        </Menu>
    );

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


                <Dropdown
                    visible={visibleDropdown}
                    onVisibleChange={() => setVisibleDropdown(prevState => !prevState)}

                    overlay={dropdownWindow}
                    trigger={['click']}
                    placement={'bottomRight'}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                    <button className={'filters'}>
                        <SVG id={'filter-icon'}/>
                    </button>
                </Dropdown>
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