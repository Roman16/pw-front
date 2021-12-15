import React, {useEffect, useState} from "react"
import './PPCAudit.less'
import ProductList from "./ProductList/ProductList"
import {productsServices} from "../../services/products.services"
import StartScanning from "./StartScanning/StartScanning"
import ScanningProcessingStatus from "./ScanningProcessingStatus/ScanningProcessingStatus"
import ProblemsCount from "./ProblemsCount/ProblemsCount"
import ProblemsReport from "./ProblemsReport/ProblemsReport"
import PartProblemsCount from "./PartProblemsCount/PartProblemsCount"

export const scanningStatusEnums = {
    PROCESSING: 'processing',
    FINISHED: 'finished'
}

const PPCAudit = () => {
    const [productsRequestParams, setProductsRequestParams] = useState({
            page: 1,
            pageSize: 10,
            searchStr: ''
        }),
        [productsFetchProcessing, setProductsFetchProcessing] = useState(true),
        [products, setProducts] = useState([]),
        [productsTotalSize, setProductsTotalSize] = useState(0),
        [selectedProduct, setSelectedProduct] = useState(),
        [scanningStatus, setScanningStatus] = useState('')

    const getProducts = async () => {
        setProductsFetchProcessing(true)

        try {
            const {result} = await productsServices.getProducts(productsRequestParams)

            setProducts(result.products)
            setProductsTotalSize(result.total_count)
            if (result.products.length > 0) setSelectedProduct(result.products[0])
        } catch (e) {

        }

        setProductsFetchProcessing(false)
    }

    const changeProductsParamsHandler = (data) => setProductsRequestParams(prevState => ({...prevState, ...data}))
    const selectProductHandler = product => setSelectedProduct(product)

    const startScanningHandler = async () => {
        setScanningStatus(scanningStatusEnums.PROCESSING)

        setProducts(prevState => prevState.map(product => {
            if (product.id === selectedProduct.id) product.scanningStatus = scanningStatusEnums.PROCESSING
            return product
        }))

        setTimeout(() => {
            setScanningStatus(scanningStatusEnums.FINISHED)

            setProducts(prevState => prevState.map(product => {
                if (product.id === selectedProduct.id) product.scanningStatus = scanningStatusEnums.FINISHED
                return product
            }))

        }, 5000)
    }

    const stopScanningHandler = async () => {
        setScanningStatus('')

        setProducts(prevState => prevState.map(product => {
            if (product.id === selectedProduct.id) product.scanningStatus = undefined
            return product
        }))
    }

    useEffect(() => {
        getProducts()
    }, [productsRequestParams])

    return (
        <div className="scanner-page">
            <ProductList
                products={products}
                totalSize={productsTotalSize}
                requestParams={productsRequestParams}
                processing={productsFetchProcessing}
                selectedProduct={selectedProduct}

                onChange={changeProductsParamsHandler}
                onSelectProduct={selectProductHandler}
            />

            <div className={`page-workspace ${scanningStatus}`}>
                {!scanningStatus ?
                    <StartScanning
                        onStart={startScanningHandler}
                    />
                    :
                    <>
                        <ScanningProcessingStatus
                            scanningStatus={scanningStatus}
                            onStop={stopScanningHandler}
                        />

                        <ProblemsCount
                            scanningStatus={scanningStatus}
                        />

                        <PartProblemsCount
                            scanningStatus={scanningStatus}
                        />

                        <ProblemsReport
                            scanningStatus={scanningStatus}
                        />
                    </>}
            </div>
        </div>
    )
}

export default PPCAudit