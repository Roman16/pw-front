import React, {useEffect, useState} from "react"

import ProductsList from "./ProductsList/ProductsList"
import "./ProductSettings.less"
import Filters from "./Filters/Filters"
import axios from "axios"
import {productsServices} from "../../../services/products.services"
import {notification} from '../../../components/Notification'
import {useSelector} from "react-redux"

const CancelToken = axios.CancelToken
let source = null

let timerId = null

let editableRow = null


const ProductSettingsMain = () => {
    const [productsList, setProductsList] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [requestPrams, setRequestParams] = useState(localStorage.getItem('productsSettingsRequestParams') ?
            JSON.parse(localStorage.getItem('productsSettingsRequestParams'))
            :
            {
                searchStr: '',
                onlyActive: false,
                onlyOptimization: false,
            }),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10
        })

    const {isAgencyClient} = useSelector(state => ({
            isAgencyClient: state.user.user.is_agency_client
        }
    ))

    const fetchProducts = async () => {
        if (processing && source) {
            source.cancel()
        }

        source = CancelToken.source()

        setProcessing(true)

        const {result, totalSize} = await productsServices.getProductsSettingsList({
            ...paginationOptions,
            ...requestPrams,
            cancelToken: source.token
        })

        setProductsList(result || [])
        setTotalSize(totalSize)
        setProcessing(false)
    }

    const changeSwitchHandler = (name, value) => {
        setRequestParams(prevState => ({
            ...prevState,
            [name]: value
        }))

        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    }

    const updateSettingsHandlerById = async (data) => {
        try {
            await productsServices.updateProductSettings(data)

            notification.success({
                title: 'Changes saved'
            })
        } catch (e) {
            console.log(e)
        }
    }

    const updateSettingsHandlerByIdList = async (data) => {
        try {
            await productsServices.updateProductSettingsByIdList({
                [data.field]: data[data.field],
                ...data.product_id && {product_id: data.product_id}
            })

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

            notification.success({
                title: 'Changes saved'
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeSearchHandler = searchStr => {
        setRequestParams(prevState => ({...prevState, searchStr}))

        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    }

    const setRowData = (value, item, index) => {
        const newList = productsList.map((product, productIndex) => {
            if (productIndex === index) {
                product[item] = value
            }

            return (product)
        })
        setProductsList(newList)


        clearTimeout(timerId)
        timerId = setTimeout(() => {
            updateSettingsHandlerById(productsList[index])
            editableRow = null
        }, 2000)

        if (editableRow !== null && editableRow !== index) {
            updateSettingsHandlerById(productsList[editableRow])
            clearTimeout(timerId)
        }

        editableRow = index
    }

    const changePaginationHandler = (params) => {
        setPaginationOptions(params)
    }

    useEffect(() => {
        localStorage.setItem('productsSettingsRequestParams', JSON.stringify(requestPrams))
    }, [requestPrams])

    useEffect(() => {
        fetchProducts()

        return (() => {
            if (editableRow !== null) {
                updateSettingsHandlerById(productsList[editableRow])
            }
        })
    }, [paginationOptions])

    return (
        <div className="product-settings-page">
            <Filters
                onChangeSearch={changeSearchHandler}
                onChangeSwitch={changeSwitchHandler}
                requestParams={requestPrams}
            />

            <ProductsList
                processing={processing}
                products={productsList}
                totalSize={totalSize}
                paginationOption={paginationOptions}
                isAgencyClient={isAgencyClient}

                changePagination={changePaginationHandler}
                setRowData={setRowData}
                updateSettingsHandlerByIdList={updateSettingsHandlerByIdList}
            />

        </div>
    )
}

export default ProductSettingsMain
