import React, {useEffect, useState} from "react"
import './ProductsInfo.less'
import Filters from "./Filters"
import ProductList, {
    MAX_BID_AUTO_CAMPING,
    MAX_BID_MANUAL_CAMPING,
    MIN_BID_AUTO_CAMPING,
    MIN_BID_MANUAL_CAMPING,
    PRICE_FROM_USER
} from "./ProductList"
import {productsServices} from "../../../services/products.services"
import axios from "axios"
import {notification} from "../../../components/Notification"
import {useSelector} from "react-redux"

const CancelToken = axios.CancelToken
let source = null

const ProductsInfo = () => {
    const [productsList, setProductsList] = useState([]),
        [processing, setProcessing] = useState(false),
        [processingVariation, setProcessingVariation] = useState(false),
        [requestParams, setRequestParams] = useState({
            searchStr: '',
            onlyActive: false,
            onlyOptimization: false,
            page: 1,
            pageSize: 10,
            ...localStorage.getItem('productsSettingsRequestParams') ? JSON.parse(localStorage.getItem('productsSettingsRequestParams')) : {}
        }),
        [totalSize, setTotalSize] = useState(0)

    const isAgencyClient = useSelector(state => state.user.userDetails.is_agency_client)

    const fetchProducts = async () => {
        if (processing && source) {
            source.cancel()
        }

        source = CancelToken.source()

        setProcessing(true)

        try {
            const {result: {data, total_count}} = await productsServices.getProductsSettingsList({
                ...requestParams,
                cancelToken: source.token
            })
            setProductsList(data || [])
            setTotalSize(total_count)
        } catch (e) {
            console.log(e)
            setProductsList([])
        }

        setProcessing(false)
    }

    const setCogsHandler = async () => {
        try {
            const {result, totalSize} = await productsServices.getProductsSettingsList({
                ...requestParams,
                cancelToken: source.token
            })
            setProductsList(result || [])
            setTotalSize(totalSize)
        } catch (e) {
            console.log(e)
        }
    }

    const changeFiltersHandler = (data) => setRequestParams({...requestParams, ...data, page: 1})
    const changePaginationHandler = (data) => setRequestParams({...requestParams, ...data})

    const updateFieldHandler = async (item, column, value = null, success, error, parentId) => {
        const breakSubmit = (text) => {
            notification.warning({title: text})
            error()
        }

        if (column === PRICE_FROM_USER && value <= 0 && value !== null) {
            breakSubmit('Price should be greater than 0')
        } else if ((column === MIN_BID_MANUAL_CAMPING || column === MAX_BID_MANUAL_CAMPING || column === MIN_BID_AUTO_CAMPING || column === MAX_BID_AUTO_CAMPING) && value < 0.02 && value !== null) {
            breakSubmit('Bids should be greater than or equal to 0.02$')
        } else if (column === MIN_BID_MANUAL_CAMPING && item[MAX_BID_MANUAL_CAMPING] && value > item[MAX_BID_MANUAL_CAMPING]) {
            breakSubmit('Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)')
        } else if (column === MAX_BID_MANUAL_CAMPING && item[MIN_BID_MANUAL_CAMPING] && value < item[MIN_BID_MANUAL_CAMPING]) {
            breakSubmit('Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)')
        } else if (column === MIN_BID_AUTO_CAMPING && item[MAX_BID_AUTO_CAMPING] && value > item[MAX_BID_AUTO_CAMPING]) {
            breakSubmit('Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)')
        } else if (column === MAX_BID_AUTO_CAMPING && item[MIN_BID_AUTO_CAMPING] && value < item[MIN_BID_AUTO_CAMPING]) {
            breakSubmit('Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)')
        } else {
            try {
                if (parentId) {
                    await productsServices.updateVariationSettings({id: item.id, item_price_from_user: value})
                } else {
                    await productsServices.updateProductSettings({...item, [column]: value})
                }

                success()
                notification.success({title: 'Changes saved'})

                setProductsList([...productsList.map(product => {
                    if (parentId) {
                        if (product.id === parentId) product.product.variations = [...product.product.variations.map(child => {
                            if (child.id === item.id) child.item_price_from_user = value
                            return child
                        })]
                    } else {
                        if (product.id === item.id) product[column] = value
                    }

                    return product
                })])
            } catch (e) {
                console.log(e)
            }
        }
    }

    const setDefaultVariationHandler = async (data) => {
        setProcessingVariation(data.variation_product_id)

        try {
            await productsServices.setDefaultVariation(data)

            setProductsList([...productsList.map(item => {
                if (item.id === data.parent_product_id) {
                    item.product.variations = [...item.product.variations.map(variation => {
                        variation.is_default_variation = false
                        if (variation.id === data.variation_product_id) variation.is_default_variation = true
                        return variation
                    })]
                }

                return item
            })])
        } catch (e) {
            console.log(e)
        }

        setProcessingVariation(undefined)
    }

    const submitSettingParamsHandler = async (data, success) => {
        try {
            await productsServices.updateProductSettingsByIdList({
                [data.field]: data[data.field],
                ...data.product_id && {product_id: data.product_id}
            }, requestParams.searchStr)

            if (data.product_id) {
                const newList = [...productsList.map(item => {
                    if (data.product_id.find(id => id === item.id)) {
                        item[data.field] = data[data.field]
                    }

                    return item
                })]

                setProductsList([...newList])
            } else {
                const newList = [...productsList.map(item => {
                    item[data.field] = data[data.field]

                    return item
                })]

                setProductsList([...newList])
            }

            success()

            notification.success({title: 'Changes saved'})
        } catch (e) {
            console.log(e)

            success()
        }
    }

    useEffect(() => {
        localStorage.setItem('productsSettingsRequestParams', JSON.stringify({
            searchStr: requestParams.searchStr,
            onlyActive: requestParams.onlyActive,
            onlyOptimization: requestParams.onlyOptimization,
            pageSize: requestParams.pageSize
        }))
    }, [requestParams])

    useEffect(() => {
        fetchProducts()
    }, [requestParams])

    return (<div className="product-info-page">
        <Filters
            requestParams={requestParams}
            onChangeFilter={changeFiltersHandler}
        />

        <ProductList
            products={productsList}
            processing={processing}
            requestParams={{...requestParams, totalSize}}
            processingVariation={processingVariation}
            isAgencyClient={isAgencyClient}

            onChangePagination={changePaginationHandler}
            onUpdateField={updateFieldHandler}
            onSetCogs={setCogsHandler}
            setVariation={setDefaultVariationHandler}
            onSubmitSettingParams={submitSettingParamsHandler}
        />
    </div>)
}

export default ProductsInfo
