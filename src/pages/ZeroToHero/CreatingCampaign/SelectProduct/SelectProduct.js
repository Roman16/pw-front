import React, {useEffect, useState} from "react"
import {SVG} from "../../../../utils/icons"
import {Input} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import ProductItem from "./ProductItem"
import {zthServices} from "../../../../services/zth.services"
import './SelectProduct.less'
import moment from "moment"

const {Search} = Input


const initialProductSettings = {
    portfolio: {
        type: 'CreateNew',
        no_portfolio: false
    },
    campaigns: {
        start_date: moment.tz(`${moment(new Date()).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString(),
        set_to_paused: false,
        main_keywords: [],
        bidding_strategy: 'legacyForSales',
        adjust_bid_by_placements: {},
    },
    brand: {
        competitor_brand_names: []
    },
    relevant_keywords: [],
    negative_keywords: [],
    use_existing_ppc_targetings: true,
    pause_existing_duplicates_of_zth_targetings: true
}

const SelectProduct = ({visible, addedProducts, onAddProducts}) => {
    const [products, setProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
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

            setProducts(res.result || [{
                id: 3,
                title: 'ewfw',
                portfolio: '',
                campaigns: [],
                brand: '',
                use_existing_ppc_targetings: '',
                pause_existing_duplicates_of_zth_targetings: '',
                name: 'test name',
                item_price: '43',
                asin: 'HDGHSHS',
                sku: 'JDJENEJNEN',
                ...initialProductSettings
            }])
            setTotalSize(res.totalSize)
        } catch (e) {
            console.log(e)
            setProducts([])
        }

        setProcessing(false)
    }

    const changePaginationHandler = (options) => setRequestParams({...requestParams, ...options})

    const selectProductHandler = (product, status) => {
        if (status) {
            onAddProducts(addedProducts.filter(item => item.id !== product.id))
        } else {
            onAddProducts([...addedProducts.filter(item => item.parent_id !== product.id), product])
        }
    }


    useEffect(() => {
        getProductsList()

        onAddProducts([])
    }, [requestParams])

    return (<section className={`step select-product ${visible ? 'visible' : ''}`}>
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
                            // isOpened={product.id === openedProduct}
                            isSelected={!!addedProducts.find(item => item.id === product.id)}
                            // isDisabled={!!addedProducts.find(item => item.id === product.id)}
                            // addedProducts={addedProducts}
                            // addedProducts={addedProducts}

                            onSelect={selectProductHandler}
                            // onSelectVariation={selectVariationHandler}
                            // onOpenVariations={openVariationsListHandler}
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
    </section>)
}

export default SelectProduct