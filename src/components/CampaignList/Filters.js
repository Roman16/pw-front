import React, {useState} from "react";
import {Dropdown, Input, Menu, Switch, Select} from "antd";
import {SVG} from "../../utils/icons";
import CustomSelect from "../Select/Select";

const {Search} = Input,
    Option = Select.Option;

const Filters = ({
                     onSearch,
                     onApplyFilter,
                     onlyOndayparting,
                     onChangeSwitch
                 }) => {

    const [visibleDropdown, setVisibleDropdown] = useState(false),
        [campaign_type, setCampaignType] = useState('all'),
        [campaign_status, setCampaignStatus] = useState('all');

    const applyFilterHandler = () => {
        onApplyFilter({
            campaign_type,
            campaign_status
        });

        setVisibleDropdown(false)
    }

    const resetFilterHandler = () => {
        if (campaign_type !== 'all' || campaign_status !== 'all') {
            setCampaignType('all');
            setCampaignStatus('all');
            onApplyFilter({
                campaign_type: 'all',
                campaign_status: 'all'
            })
        }

        setVisibleDropdown(false)
    }

    const dropdownWindow = (
        <Menu className={'filter-dropdown-window'}>
            <div className="row">
                <div className="form-group">
                    <label htmlFor="">Campaign Type</label>

                    <CustomSelect value={campaign_type} onChange={value => setCampaignType(value)}>
                        <Option value={'all'}>All</Option>
                        <Option value={'auto'}>Auto</Option>
                        <Option value={'manual'}>Manual</Option>
                    </CustomSelect>
                </div>
                <div className="form-group">
                    <label htmlFor="">Campaign Status</label>

                    <CustomSelect value={campaign_status} onChange={value => setCampaignStatus(value)}>
                        <Option value={'all'}>All</Option>
                        <Option value={'enabled'}>Enabled</Option>
                        <Option value={'paused'}>Paused</Option>
                    </CustomSelect>
                </div>
            </div>

            <div className="buttons">
                <button className={'btn white'} onClick={resetFilterHandler}>Reset</button>
                <button className={'btn default'} onClick={applyFilterHandler}>Apply</button>
            </div>
        </Menu>
    );

    return (
        <div className="products-filters">
            <div className="row">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by campaign name'}
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
                        checked={onlyOndayparting}
                        onChange={onChangeSwitch}
                    />

                    <label htmlFor="">On day-parting only</label>
                </div>
            </div>
        </div>
    )
};

export default Filters;