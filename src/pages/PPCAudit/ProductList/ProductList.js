import React, {useState} from "react"
import './ProductList.less'
import Filters from "./Filters"
import ProductItem from "./ProductItem"
import Pagination from "../../../components/Pagination/Pagination"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"

const ProductList = ({
                         products,
                         totalSize,
                         processing,
                         requestParams,
                         selectedProduct,

                         onChange,
                         onSelectProduct,
                     }) => {
    const [openedProduct, setOpenedProduct] = useState()

    const openProductChildHandler = (id) => setOpenedProduct(id === openedProduct ? null : id)

    return (<div className={'product-list'}>
        <Filters
            totalSize={totalSize}
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
    </div>)
}


export default ProductList