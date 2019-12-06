import React, {useState} from "react";
import {Icon, Input, Menu, Checkbox, Select} from "antd";

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export const columnTextFilter = (handleSearch, filteredColumns) => {
    let searchInput = null;

    return ({
        filterDropdown: (dataIndex) => (
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    // placeholder={`Search ${dataIndex}`}
                    defaultValue={filteredColumns[dataIndex]}
                    onPressEnter={() => handleSearch(dataIndex, searchInput.input.value)}
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
                        onClick={() => handleSearch(dataIndex, searchInput.input.value)}
                    >
                        Search
                    </button>
                </div>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    })
};


export const columnMenuFilter = (handleSearch, filteredColumns, menu) => {
    let searchInput = null;
    let groupRef = null;

    return ({
        filterDropdown: (dataIndex) => (
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <CheckboxGroup
                    ref={node => {
                        groupRef = node;
                    }}
                    options={menu}
                    onChange={(list) => searchInput = list}
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
                            handleSearch(dataIndex, searchInput)
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="filter" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    })
};

export const columnNumberFilter = (handleSearch, filteredColumns) => {
    let searchType = 'eq',
        searchValue = null;

    return ({
        filterDropdown: (dataIndex) => (
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <Select
                    onChange={(e) => searchType = e}
                    defaultValue={filteredColumns[dataIndex] && filteredColumns[dataIndex].type || 'eq'}
                >
                    <Option value={'eq'}> {'='} </Option>
                    <Option value={'neq'}> {'!='} </Option>
                    <Option value={'gt'}> {'>'} </Option>
                    <Option value={'lt'}> {'<'} </Option>
                    <Option value={'gte'}> {'>='} </Option>
                    <Option value={'lte'}> {'<='} </Option>
                </Select>

                <Input
                    ref={node => {
                        searchValue = node;
                    }}
                    defaultValue={filteredColumns[dataIndex] && filteredColumns[dataIndex].value}
                    onPressEnter={() => handleSearch(dataIndex, {
                        type: searchType,
                        value: searchValue.input.value
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
                        onClick={() => handleSearch(dataIndex, {
                            type: searchType,
                            value: searchValue.input.value
                        }, 'number')}
                    >
                        Search
                    </button>
                </div>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="filter" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    })
};