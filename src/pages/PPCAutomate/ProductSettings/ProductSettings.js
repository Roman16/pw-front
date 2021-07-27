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

let savedRow = null,
    savedValue = null

let showNotPopup = true

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
            pageSize: localStorage.getItem('productsSettingsPageSize') ?
                +localStorage.getItem('productsSettingsPageSize') : 10
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

    const showNotification = (title, type = 'success') => {
        if (showNotPopup) {
            notification[type]({
                title: title
            })

            showNotPopup = false

            setTimeout(() => {
                showNotPopup = true
            }, 3500)
        }
    }

    const updateSettingsHandlerById = async (data) => {
        try {
            await productsServices.updateProductSettings(data)
            showNotification('Changes saved')
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

            showNotification('Changes saved')

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

    const setRowData = (value, item, index, parentIndex) => {
        editableRow = parentIndex || index

        const newList = productsList.map((product, productIndex) => {
            if (productIndex === index && !parentIndex) {
                product[item] = value
            }

            if (parentIndex && parentIndex === productIndex) {
                product.product.variations = [...product.product.variations.map((child, i) => {
                    if (i === index) {
                        child[item] = value
                    }

                    return child
                })]
            }

            return (product)
        })

        setProductsList(newList)

        clearTimeout(timerId)
        timerId = setTimeout(() => {
            savedRow = parentIndex || index
            savedValue = value

            if (parentIndex) updateSettingsHandlerById(newList[parentIndex])
            else updateSettingsHandlerById(newList[index])

            editableRow = null
        }, 2000)
    }

    const blurRowHandler = (value, item, index, parentIndex) => {
        const localIndex = parentIndex || index

        clearTimeout(timerId)
        if (editableRow === localIndex) {
            if (value != savedValue || localIndex != savedRow) {
                updateSettingsHandlerById(productsList[index])
                editableRow = null
            }
        }
    }

    const changePaginationHandler = (params) => {
        setPaginationOptions(params)

        localStorage.setItem('productsSettingsPageSize', params.pageSize)
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

    useEffect(() => {
        if (productsList.length > 0) {
            document.addEventListener("mouseleave", (event) => {
                if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
                    if (editableRow !== null) {
                        clearTimeout(timerId)
                        updateSettingsHandlerById(productsList[editableRow])
                        editableRow = null
                    }
                }
            })
        }
    }, [productsList])

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
                onBlur={blurRowHandler}
                updateSettingsHandlerByIdList={updateSettingsHandlerByIdList}
            />
        </div>
    )
}

export default ProductSettingsMain
