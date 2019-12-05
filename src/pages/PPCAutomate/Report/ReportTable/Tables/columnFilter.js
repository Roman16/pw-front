import React, {useState} from "react";
import {Icon, Input} from "antd";

let searchInput = null;

export const columnFilter = (dataIndex, handleSearch, searchValue) => {

    return ({
        filterDropdown: () => (
            <div className='search-drop-down' onClick={(e) =>  e.stopPropagation()}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    defaultValue={searchValue}
                    // onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                />

                <div className="buttons">
                    <button
                        className="btn default"
                        onClick={() => handleSearch(dataIndex, searchInput.input.value)}
                    >
                        Search
                    </button>
                    <button
                        className="btn cancel"
                        onClick={() => {
                            searchInput.handleReset();
                            handleSearch(dataIndex, null)
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
    })
};