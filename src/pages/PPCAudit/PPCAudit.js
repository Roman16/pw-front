import React, {useEffect, useState} from "react"
import './PPCAudit.less'
import ProductList from "./ProductList/ProductList"
import {productsServices} from "../../services/products.services"
import StartScanning from "./StartScanning/StartScanning"
import ScanningProcessingStatus from "./ScanningProcessingStatus/ScanningProcessingStatus"
import ProblemsLevel from "./ProblemsLevel/ProblemsLevel"
import ProblemsReport from "./ProblemsReport/ProblemsReport"
import ProblemsType from "./ProblemsType/ProblemsType"
import ScanningFailed from "./ScanningFailed/ScanningFailed"

export const scanningStatusEnums = {
    PROCESSING: 'processing',
    FINISHED: 'finished',
    FAILED: 'failed',
    EXPIRED: 'expired',
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
        [scanningStatus, setScanningStatus] = useState()

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
    const resetScanningStatusHandler = () => {
        setScanningStatus(undefined)

        setProducts(prevState => prevState.map(product => {
            if (product.id === selectedProduct.id) product.scanningStatus = undefined
            return product
        }))
    }

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

        setTimeout(() => {
            setScanningStatus(scanningStatusEnums.FAILED)

            setProducts(prevState => prevState.map(product => {
                if (product.id === selectedProduct.id) product.scanningStatus = scanningStatusEnums.FAILED
                return product
            }))

        }, 10000)
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
                {!scanningStatus &&
                <StartScanning
                    onStart={startScanningHandler}
                    product={selectedProduct}
                />}

                {(
                    scanningStatus === scanningStatusEnums.PROCESSING ||
                    scanningStatus === scanningStatusEnums.FINISHED
                ) && <>
                    <ScanningProcessingStatus
                        product={selectedProduct}
                        scanningStatus={scanningStatus}

                        onStop={stopScanningHandler}
                        onStart={startScanningHandler}
                    />

                    <ProblemsLevel
                        scanningStatus={scanningStatus}
                    />

                    <ProblemsType
                        scanningStatus={scanningStatus}
                    />

                    <ProblemsReport
                        scanningStatus={scanningStatus}
                    />
                </>}

                {scanningStatus === scanningStatusEnums.FAILED && <ScanningFailed
                    onResetStatus={resetScanningStatusHandler}
                />}
            </div>
        </div>
    )
}

export default PPCAudit