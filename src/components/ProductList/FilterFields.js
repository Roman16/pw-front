import React, {useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {Input, Select, Switch} from "antd";
import CustomSelect from "../Select/Select";
import {NavLink} from "react-router-dom";
import {SVG} from "../../utils/icons";

const {Search} = Input;
const Option = Select.Option;


const FilterFields = ({onSearch, pathname, onSelectAll, onChangeSwitch, onlyHasNew, isSelectedAll, disabled, onChangeSelect, onlyOndayparting}) => {
    const [openedWindow, switchWindow] = useState(false);
    const {onlyOptimization} = useSelector(state => ({
        onlyOptimization: state.products.onlyOptimization,
    }));

    const wrapperRef = useRef(null);

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            switchWindow(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    if (pathname === '/ppc/dayparting') {
        return (
            <div className={`${openedWindow ? 'search-product active' : 'search-product'}`} ref={wrapperRef}>
                <Search
                    className="search-field"
                    placeholder={'Search by campaign name, ASIN or SKU'}
                    onChange={e => onSearch(e.target.value)}
                    data-intercom-target='search-field'
                />

                <div className='filter-btn' onClick={() => switchWindow(!openedWindow)}
                     data-intercom-target='open-filters-button'
                >
                    <SVG id='products-filter-icon'/>
                </div>

                <div className={`${openedWindow ? 'filters-list opened' : 'filters-list closed'}`}>
                    <div className="select-block">
                        <label htmlFor="">Campaign Type</label>
                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            dropdownClassName={'full-width-menu'}
                            onChange={(e) => {
                                onChangeSelect({name: 'campaign_type', value: e})
                            }}
                            defaultValue={'all'}
                        >
                            <Option value={'all'}>
                                All
                            </Option>
                            <Option value={'auto'}>
                                Auto
                            </Option>
                            <Option value={'manual'}>
                                Manual
                            </Option>
                        </CustomSelect>
                    </div>

                    <div className="select-block">
                        <label htmlFor="">Campaign Status</label>
                        <CustomSelect
                            data-intercom-target='campaign-status-select'
                            getPopupContainer={trigger => trigger.parentNode}
                            dropdownClassName={'full-width-menu'}
                            onChange={(e) => {
                                onChangeSelect({name: 'campaign_status', value: e})
                            }}
                            defaultValue={'all'}
                        >
                            <Option value={'all'}>
                                All
                            </Option>
                            <Option value={'enabled'}>
                                Enabled
                            </Option>
                            <Option value={'paused'}>
                                Paused
                            </Option>
                        </CustomSelect>
                    </div>

                    <div className="active-only" >
                        <label htmlFor="">On day-parting only</label>

                        <Switch
                            data-intercom-target='only-on-dayparting-switch'
                            checked={onlyOndayparting}
                            onChange={e => onChangeSwitch(e, 'onlyOndayparting')}
                        />
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className={`${openedWindow ? 'search-product active' : 'search-product'}`} ref={wrapperRef}>
                <Search
                    className="search-field"
                    placeholder={"Search by product name, ASIN or SKU"}
                    onChange={e => onSearch(e.target.value)}
                />

                {pathname !== '/ppc/scanner' && <div className='filter-btn' onClick={() => switchWindow(!openedWindow)}>
                    <SVG id='products-filter-icon'/>
                </div>}

                {pathname !== '/ppc/scanner' &&
                <div className={`${openedWindow ? 'filters-list opened' : 'filters-list closed'}`}>
                    <button
                        onClick={onSelectAll}
                        type="primary"
                        disabled={disabled}
                        className='btn default selected-all-btn'
                    >
                        {isSelectedAll ? 'Deselect ' : 'Select All Products'}
                    </button>


                    <div className="active-only">
                        <label htmlFor="">On optimization only</label>
                        <Switch
                            checked={onlyOptimization}
                            onChange={e => onChangeSwitch(e, 'onlyOptimization')}
                        />
                    </div>

                    {/*{pathname === '/ppc/report' && <div className='has-new-reports-only'>*/}
                    {/*    <label htmlFor="">Has new reports only</label>*/}
                    {/*    <Switch*/}
                    {/*        checked={onlyHasNew}*/}
                    {/*        onChange={e => onChangeSwitch(e, 'onlyHasNew')}*/}
                    {/*    />*/}
                    {/*</div>}*/}
                </div>}
            </div>
        )
    }
};

export default FilterFields;