import React, {Fragment, useState} from "react"
import './ProductList.less'
import Filters from "./Filters"
import ProductItem from "./ProductItem"
import Pagination from "../../../components/Pagination/Pagination"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import {SVG} from "../../../utils/icons"

const ProductList = ({
                         products,
                         totalSize,
                         processing,
                         requestParams,
                         selectedProduct,

                         onChange,
                         onSelectProduct,
                     }) => {
    const [openedProduct, setOpenedProduct] = useState(),
        [isOpenList, setIsOpenList] = useState(true)

    const openProductChildHandler = (id) => setOpenedProduct(id === openedProduct ? null : id)

    return (<>
        <div className={`${isOpenList ? 'product-list' : 'product-list closed'}`}>
            <Filters
                requestParams={requestParams}
                totalSize={totalSize}

                onSearch={onChange}
            />

            {processing && <RouteLoader/>}

            <ul>
                {products.map(product => <ProductItem
                    key={product.id}
                    product={product}
                    openedProduct={openedProduct}
                    onClick={onSelectProduct}
                    isActive={selectedProduct && selectedProduct.id === product.id}

                    onOpenChild={openProductChildHandler}
                />)}

            </ul>

            <Pagination
                page={requestParams.page}
                pageSizeOptions={[10, 30, 50]}
                pageSize={requestParams.pageSize}
                totalSize={totalSize}
                processing={processing}
                listLength={products && products.length}

                onChange={onChange}
            />
        </div>

        <div className={`switch-list ${isOpenList ? 'opened' : 'closed'}`}>
            <button onClick={() => setIsOpenList(prevState => !prevState)}>
                <div className="image">
                    <SVG id='select-icon'/>
                </div>
            </button>
        </div>
    </>)
}


export default ProductList