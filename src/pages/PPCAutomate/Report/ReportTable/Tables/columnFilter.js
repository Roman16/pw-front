import React, {useState, useEffect} from "react";
import {Input, Checkbox, Select, Popover} from "antd";
import icon from '../../../../../assets/img/icons/filter-icon.svg';
import iconHover from '../../../../../assets/img/icons/filter-icon-black.svg';
import iconActive from '../../../../../assets/img/icons/filter-icon-blue.svg';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

export const ColumnTextFilter = ({onChangeFilter, filteredColumns, dataIndex}) => {
    const [options, setOptions] = useState([]),
        [visiblePopup, switchPopup] = useState(false);

    function handleFilteredColumn() {
        onChangeFilter(dataIndex, options);
        switchPopup(false)
    }

    const menu = (
        <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
            <Input
                value={options}
                onChange={e => setOptions(e.target.value)}
                defaultValue={filteredColumns[dataIndex]}
                onPressEnter={handleFilteredColumn}
            />

            <div className="buttons">
                <button
                    className="btn default"
                    onClick={handleFilteredColumn}
                >
                    Search
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setOptions('')
        }
    }, [filteredColumns]);

    return (
        <Popover
            content={menu}
            trigger="click"
            visible={visiblePopup}
            onVisibleChange={() => switchPopup(!visiblePopup)}
            onClick={(e) => e.stopPropagation()}
            getPopupContainer={trigger => trigger.parentNode}
            placement="bottomRight"
            className='filter-popover'
        >
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Popover>
    )
};


export const ColumnMenuFilter = ({onChangeFilter, filteredColumns, menu, dataIndex}) => {
    const [options, setOptions] = useState([]),
        [visiblePopup, switchPopup] = useState(false);

    function handleFilteredColumn() {
        onChangeFilter(dataIndex, options);
        switchPopup(false)
    }

    const dropMenu = (
        <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
            <CheckboxGroup
                options={menu}
                value={options}
                onChange={(list) => setOptions(list)}
            />

            <div className="buttons">
                <button
                    className="btn default"
                    onClick={handleFilteredColumn}
                >
                    Search
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setOptions([])
        }
    }, [filteredColumns]);

    return (
        <Popover
            content={dropMenu}
            trigger="click"
            visible={visiblePopup}
            onVisibleChange={() => switchPopup(!visiblePopup)}
            onClick={(e) => e.stopPropagation()}
            getPopupContainer={trigger => trigger.parentNode}
            placement="bottomRight"
            className='filter-popover'
        >
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Popover>
    )
};

export const ColumnNumberFilter = ({onChangeFilter, filteredColumns, dataIndex, percent}) => {
    const [searchType, setType] = useState('eq'),
        [searchValue, setValue] = useState(''),
        [visiblePopup, switchPopup] = useState(false);

    function handleFilteredColumn() {
        onChangeFilter(dataIndex, {
            type: searchType,
            value: percent && searchValue ? searchValue / 100 : searchValue
        }, 'number');
        switchPopup(false)
    }

    const menu = (
        <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
            <Select
                onChange={(e) => setType(e)}
                value={searchType}
            >
                <Option value={'eq'}> {'='} </Option>
                <Option value={'neq'}> {'!='} </Option>
                <Option value={'gt'}> {'>'} </Option>
                <Option value={'lt'}> {'<'} </Option>
                <Option value={'gte'}> {'>='} </Option>
                <Option value={'lte'}> {'<='} </Option>
            </Select>

            <Input
                value={searchValue}
                type={'number'}
                onChange={e => setValue(e.target.value)}
                onPressEnter={handleFilteredColumn}
            />

            <div className="buttons">
                <button
                    className="btn default"
                    onClick={handleFilteredColumn}
                >
                    Search
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setType('eq');
            setValue('');
        }
    }, [filteredColumns]);

    return (
        <Popover
            content={menu}
            trigger="click"
            visible={visiblePopup}
            onVisibleChange={() => switchPopup(!visiblePopup)}
            onClick={(e) => e.stopPropagation()}
            getPopupContainer={trigger => trigger.parentNode}
            placement="bottomRight"
            className='filter-popover'
        >
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Popover>
    )
};