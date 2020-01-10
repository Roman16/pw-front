import React from "react";
import leftIcon from "../../assets/img/icons/left-icon.svg";
import rightIcon from "../../assets/img/icons/right-icon.svg";
import {InputNumber} from "antd";

const ProductPagination = ({page, totalSize, size, onChangePagination}) => {

    function goPrevPage() {
        if (page > 1) {
            onChangePagination(page - 1)
        }
    }

    function goNextPage() {
        if (totalSize > 0 && page > Math.ceil(totalSize / size)) {
            onChangePagination(page + 1)
        }
    }

    function goToPage({target: {value}}) {
        if (totalSize > 0 && value > 0 && value < Math.ceil(totalSize / size)) {
            onChangePagination(value)
        }
    }

    return (
        <div className='product-pagination'>
            <div className='total-pages'>
                <span>{page}</span> of {totalSize > 0 ? Math.ceil(totalSize / size) : 1} pages
            </div>

            <div className='custom-pagination'>
                <div className='prev' onClick={goPrevPage}>
                    <img src={leftIcon} alt=""/>
                </div>

                <div className="line"/>

                <div className='next' onClick={goNextPage}>
                    <img src={rightIcon} alt=""/>
                </div>
            </div>

            <div className="go-to">
                Go to

                <InputNumber
                    min={1}
                    max={totalSize > 0 ? Math.ceil(totalSize / size) : 1}
                    defaultValue={1}
                    onBlur={e => {
                        onChangePagination(e.target.value)
                    }}
                    onPressEnter={goToPage}
                />
            </div>
        </div>

    )
};

export default ProductPagination;