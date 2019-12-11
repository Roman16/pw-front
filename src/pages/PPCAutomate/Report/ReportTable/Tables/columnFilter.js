import React, {useState, useEffect} from "react";
import {Input, Menu, Checkbox, Select, Dropdown} from "antd";
import icon from '../../../../../assets/img/icons/filter-icon.svg';
import iconHover from '../../../../../assets/img/icons/filter-icon-black.svg';
import iconActive from '../../../../../assets/img/icons/filter-icon-blue.svg';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

export const ColumnTextFilter = ({onChangeFilter, filteredColumns, dataIndex}) => {
    const [options, setOptions] = useState([]);

    const menu = (
        <Menu>
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <Input
                    // placeholder={`Search ${dataIndex}`}
                    value={options}
                    onChange={e => setOptions(e.target.value)}
                    defaultValue={filteredColumns[dataIndex]}
                    onPressEnter={() => onChangeFilter(dataIndex, options)}
                />

                <div className="buttons">
                    {/*<button*/}
                    {/*    className="btn cancel"*/}
                    {/*    onClick={() => {*/}
                    {/*        searchInput.handleReset();*/}
                    {/*        handleSearch(dataIndex, null)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Reset*/}
                    {/*</button>*/}

                    <button
                        className="btn default"
                        onClick={() => onChangeFilter(dataIndex, options)}
                    >
                        Search
                    </button>
                </div>
            </div>
        </Menu>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setOptions('')
        }
    }, [filteredColumns]);

    return (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight"
                  onClick={(e) => e.stopPropagation()}>
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Dropdown>
    )
};


export const ColumnMenuFilter = ({onChangeFilter, filteredColumns, menu, dataIndex}) => {
    const [options, setOptions] = useState([]);

    const dropMenu = (
        <Menu>
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <CheckboxGroup
                    options={menu}
                    value={options}
                    onChange={(list) => setOptions(list)}
                />

                <div className="buttons">
                    {/*<button*/}
                    {/*    className="btn cancel"*/}
                    {/*    onClick={() => {*/}
                    {/*        console.log(groupRef);*/}
                    {/*        groupRef.updater.enqueueReplaceState();*/}
                    {/*        handleSearch(dataIndex, null)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Reset*/}
                    {/*</button>*/}

                    <button
                        className="btn default"
                        onClick={() => {
                            onChangeFilter(dataIndex, options)
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </Menu>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setOptions([])
        }
    }, [filteredColumns]);

    return (
        <Dropdown overlay={dropMenu} trigger={['click']} placement="bottomRight"
                  onClick={(e) => e.stopPropagation()}>
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Dropdown>
    )
};

export const ColumnNumberFilter = ({onChangeFilter, filteredColumns, dataIndex}) => {
    const [searchType, setType] = useState('eq'),
        [searchValue, setValue] = useState('');

    const menu = (
        <Menu>
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
                    onChange={e => setValue(e.target.value)}
                    onPressEnter={() => onChangeFilter(dataIndex, {
                        type: searchType,
                        value: searchValue
                    }, 'number')}
                />

                <div className="buttons">
                    {/*<button*/}
                    {/*    className="btn cancel"*/}
                    {/*    onClick={() => {*/}
                    {/*        searchValue.handleReset();*/}
                    {/*        handleSearch(dataIndex, null)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Reset*/}
                    {/*</button>*/}

                    <button
                        className="btn default"
                        onClick={() => onChangeFilter(dataIndex, {
                            type: searchType,
                            value: searchValue
                        }, 'number')}
                    >
                        Search
                    </button>
                </div>
            </div>
        </Menu>
    );

    useEffect(() => {
        if (filteredColumns[dataIndex] === undefined) {
            setType('eq');
            setValue('');
        }
    }, [filteredColumns]);

    return (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight"
                  onClick={(e) => e.stopPropagation()}>
            <a className="ant-dropdown-link" href="#">
                <div className='filter-icon'>
                    <img src={filteredColumns[dataIndex] !== undefined ? iconActive : icon} alt="" className='default'/>
                    <img src={iconHover} alt="" className='hover'/>
                </div>
            </a>
        </Dropdown>
    )
};