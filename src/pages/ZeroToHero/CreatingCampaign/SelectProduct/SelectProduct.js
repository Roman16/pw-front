import React, {useEffect, useState} from "react"
import {SVG} from "../../../../utils/icons"
import {Input} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import ProductItem from "./ProductItem"
import {zthServices} from "../../../../services/zth.services"
import './SelectProduct.less'
import moment from "moment"

const {Search} = Input


const SelectProduct = ({visible, addedProducts, onAddProducts}) => {
    const [products, setProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [openedProduct, setOpenedProduct] = useState(null),
        [requestParams, setRequestParams] = useState({
            searchStr: '',
            page: 1,
            pageSize: 10,
            sorting: 'desc'
        })

    const getProductsList = async () => {
        setProcessing(true)

        try {
            const res = await zthServices.getAllProducts(requestParams)

            setProducts(res.result)
            setTotalSize(res.totalSize)
        } catch (e) {
            console.log(e)
            setProducts([])
        }

        setProcessing(false)
    }

    const changePaginationHandler = (options) => setRequestParams({...requestParams, ...options})
    const openVariationsListHandler = (id) => setOpenedProduct(prevState => prevState === id ? null : id)

    const selectVariationHandler = (product, variationStatus, parentStatus) => {
        if (variationStatus) {
            // onAddProducts(addedProducts.filter(item => item.id !== product.id))
            onAddProducts([])
        } else {
            // onAddProducts([...addedProducts.filter(item => item.parent_id !== product.id), product])
            onAddProducts([product])
        }
    }


    const selectProductHandler = (product, status) => {
        if (status) {
            // onAddProducts(addedProducts.filter(item => item.id !== product.id))
            onAddProducts([])
        } else {
            // onAddProducts([...addedProducts.filter(item => item.parent_id !== product.id), product])
            onAddProducts([product])
        }
    }

    useEffect(() => {
        getProductsList()

        onAddProducts([])
    }, [requestParams])

    return (<section className={`step select-product ${visible ? 'visible' : ''}`}>
        <div className="bg-container">
            <div className="container">
                <h2 className={'step-title'}>Choose the product you want to create campaigns for</h2>

                <div className="form-group search">
                    <Search
                        className="search-field"
                        placeholder={'Search by product name, ASIN or SKU'}
                        // onChange={e => changeSearchHandler(e.target.value)}
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <div className="products">
                    <div className="block-header">
                        Products

                        <button className={`sds-btn icon ${requestParams.sorting}`}
                                onClick={() => changePaginationHandler({sorting: requestParams.sorting === 'desc' ? 'asc' : 'desc'})}>
                            <SVG id={'sorter-arrow'}/>
                        </button>
                    </div>

                    <ul>
                        {products.map((product, index) => <ProductItem
                                key={product.id}
                                product={product}
                                isOpened={product.id === openedProduct}
                                isSelected={!!addedProducts.find(item => item.id === product.id)}
                                isDisabled={false}
                                selectedProducts={addedProducts}
                                type={'all_products'}

                                onSelect={selectProductHandler}
                                onSelectVariation={selectVariationHandler}
                                onOpenVariations={openVariationsListHandler}
                            />
                        )}
                    </ul>

                    <Pagination
                        onChange={changePaginationHandler}
                        page={requestParams.page}
                        pageSizeOptions={[10, 25, 50]}
                        pageSize={requestParams.pageSize}
                        totalSize={totalSize}
                        listLength={products.length}
                        processing={processing}
                    />
                </div>
            </div>
        </div>
    </section>)
}

export default SelectProduct