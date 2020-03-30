import React, {useState} from "react";
import {Input} from "antd";
import {SVG} from "../../utils/icons";

const ProductPagination = ({page, totalSize, size, onChangePagination}) => {
    const [pageNumber, setPageNumber] = useState(null);

    function goPrevPage() {
        if (page > 1) {
            onChangePagination(page - 1)
        }
    }

    function goNextPage() {
        if (totalSize > 0 && page < Math.ceil(totalSize / size)) {
            onChangePagination(page + 1)
        }
    }

    function goToPage(value) {
        if (totalSize > 0 && value > 0 && value < Math.ceil(totalSize / size) + 1 && value !== page && value !== null) {
            onChangePagination(value);
            setPageNumber(null);
        }
    }

    return (
        <div className='product-pagination'>
            <div className='total-pages'>
                <span>{page}</span> of {totalSize > 0 ? Math.ceil(totalSize / size) : 1} pages
            </div>

            <div className='custom-pagination'>
                <div className={page > 1 ? 'prev' : 'prev disabled'} onClick={goPrevPage}>
                    <SVG id='left-icon'/>
                </div>

                <div className="line"/>

                <div className={totalSize > 0 && page < Math.ceil(totalSize / size) ? 'next' : 'next disabled'}
                     onClick={goNextPage}>
                    <SVG id='right-icon'/>
                </div>
            </div>

            <div className="go-to">
                Go to

                <Input
                    type={'number'}
                    min={1}
                    value={pageNumber}
                    onBlur={e => {
                        if (e.target.value > Math.ceil(totalSize / size)) {
                            setPageNumber(null)
                        }

                        goToPage(e.target.value)
                    }}
                    onChange={e => {
                        setPageNumber(e.target.value);
                    }}
                    onPressEnter={(e) => {
                        goToPage(e.target.value)
                    }}
                />
            </div>
        </div>

    )
};

export default ProductPagination;