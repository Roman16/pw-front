import React, {useEffect, useState} from "react";
import './Pagination.less';
import {Select} from "antd";
import CustomSelect from "../Select/Select";
import PT from 'prop-types'
import {SVG} from "../../utils/icons";

const Option = Select.Option;

const Pagination = ({
                        onChange,
                        page,
                        pageSizeOptions,
                        pageSize,
                        totalSize,
                        listLength,
                        processing
                    }) => {
    const [paginationParams, setPaginationParams] = useState({
        page,
        pageSize,
        listLength
    });

    useEffect(() => {
        if (!processing) {
            setPaginationParams({
                page,
                pageSize,
                listLength
            })
        }
    }, [listLength, processing])


    const changePageSizeHandler = (size) => {
        onChange({
            page: 1,
            pageSize: size
        })
    }

    const goPrevPage = () => {
        if (page > 1) {
            onChange({
                page: page - 1,
                pageSize
            })
        }
    }

    const goNextPage = () => {
        if (paginationParams.page < Math.ceil(totalSize / paginationParams.pageSize)) {
            onChange({
                page: page + 1,
                pageSize
            })
        }
    }

    return (
        <div className="pw-pagination">
            <div className="page-size">
                <label>
                    Items per page:
                </label>

                <CustomSelect
                    onChange={changePageSizeHandler}
                    value={pageSize}
                    dropdownClassName={'pagination-select'}
                >
                    {pageSizeOptions.map(item => (
                        <Option value={item} key={item}>{item}</Option>
                    ))}
                </CustomSelect>
            </div>

            <div className='items-count'>
                <b>{listLength ? ((paginationParams.page - 1) * paginationParams.pageSize) + 1 : '0'} - {paginationParams.listLength && paginationParams.page * paginationParams.pageSize - paginationParams.pageSize + paginationParams.listLength}</b>
                <span>of</span>
                <b>{totalSize}</b>
            </div>

            <div className="pagination-actions">
                <button
                    className={'prev-page'}
                    disabled={page === 1}
                    onClick={goPrevPage}
                >
                    <SVG id={'select-icon'}/>
                </button>

                <button
                    className={'next-page'}
                    disabled={page >= Math.ceil(totalSize / pageSize)}
                    onClick={goNextPage}
                >
                    <SVG id={'select-icon'}/>
                </button>
            </div>
        </div>
    )
};

Pagination.PT = {
    page: PT.number,
    pageSizeOptions: PT.array,
    pageSize: PT.number,
    onChange: PT.func,
    totalSize: PT.number,
    listLength: PT.number
}

export default Pagination;