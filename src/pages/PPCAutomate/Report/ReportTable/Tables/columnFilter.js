import React, {useState} from "react";
import {Icon, Input, Radio} from "antd";

let searchInput = null;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export const columnTextFilter = (dataIndex, handleSearch, filteredColumns) => {
    return ({
        filterDropdown: () => (
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    defaultValue={filteredColumns[dataIndex]}
                    onPressEnter={() => handleSearch(dataIndex, searchInput.input.value)}
                />

                <div className="buttons">
                    <button
                        className="btn cancel"
                        onClick={() => {
                            searchInput.handleReset();
                            handleSearch(dataIndex, null)
                        }}
                    >
                        Reset
                    </button>

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


export const columnMenuFilter = (dataIndex, handleSearch, filteredColumns, menu) => {
    return ({
        filterDropdown: () => (
            <div className='search-drop-down' onClick={(e) => e.stopPropagation()}>
                <Radio.Group
                    // onChange={this.onChange}
                    // value={this.state.value}
                >
                    {menu.map(item => (
                        <Radio style={radioStyle} value={item}>
                            {item}
                        </Radio>
                    ))}
                </Radio.Group>

                <div className="buttons">
                    <button
                        className="btn cancel"
                        onClick={() => {
                            searchInput.handleReset();
                            handleSearch(dataIndex, null)
                        }}
                    >
                        Reset
                    </button>

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
            <Icon type="filter" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    })
};