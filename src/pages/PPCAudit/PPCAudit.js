import React, {useEffect, useState} from "react"
import './PPCAudit.less'
import ProductList from "./ProductList/ProductList"
import StartScanning from "./StartScanning/StartScanning"
import ScanningProcessingStatus from "./ScanningProcessingStatus/ScanningProcessingStatus"
import ProblemsLevel from "./ProblemsLevel/ProblemsLevel"
import ProblemsReport from "./ProblemsReport/ProblemsReport"
import ProblemsType from "./ProblemsType/ProblemsType"
import ScanningFailed from "./ScanningFailed/ScanningFailed"
import {history} from "../../utils/history"
import {ppcAuditServices} from "../../services/ppc.audit.services"
import {productsServices} from "../../services/products.services"
import StrategiesDescription from "../PPCAutomate/OptimizationForAdmin/StrategiesDescription/StrategiesDescription"

export const scanningStatusEnums = {
    PROCESSING: 'PENDING',
    PROGRESS: 'IN_PROGRESS',
    FINISHED: 'DONE',
    FAILED: 'FAILED',
    EXPIRED: 'EXPIRED',
    STOPPED: 'CANCELLED_BY_USER',
}

let timeoutId

function getKeyByValue(value) {
    if (value) {
        return Object.keys(scanningStatusEnums).find(key => scanningStatusEnums[key] === value)
    } else return ''
}

const PPCAudit = () => {
    const
        [visibleDrawer, setVisibleDrawer] = useState(false),
        [productsRequestParams, setProductsRequestParams] = useState({
            page: 1,
            pageSize: 10,
            searchStr: ''
        }),
        [productsFetchProcessing, setProductsFetchProcessing] = useState(true),
        [products, setProducts] = useState([]),
        [startRequestProcessing, setStartRequestProcessing] = useState(false),
        [stopRequestProcessing, setStopRequestProcessing] = useState(false),
        [productsTotalSize, setProductsTotalSize] = useState(0),
        [selectedProduct, setSelectedProduct] = useState({
            id: undefined
        }),
        [scanningStatus, setScanningStatus] = useState(''),

        [filters, setFilters] = useState([]),
        [issuesRequestParams, setIssuesRequestParams] = useState({
            page: 1,
            pageSize: 10
        }),
        [sorterColumn, setSorterColumn] = useState(),
        [auditIssues, setAuditIssues] = useState([])

    const getProducts = async () => {
        setProductsFetchProcessing(true)

        try {
            const {result} = await ppcAuditServices.getProducts(productsRequestParams)

            setProducts(result.products)
            setProductsTotalSize(result.total_count)
            if (result.products.length > 0) selectProductHandler(result.products[0])
        } catch (e) {
            console.log(e)
        }

        setProductsFetchProcessing(false)
    }

    const getActualCogs = async () => {
        if (selectedProduct.id) {
            try {
                const res = await productsServices.getActualCogs(selectedProduct.id)
                if (res.result.length === 0) {
                    setSelectedProduct(prevState => ({...prevState, cogs_value: undefined}))
                } else {
                    setSelectedProduct(prevState => ({...prevState, ...res.result}))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const changeProductsParamsHandler = (data) => setProductsRequestParams(prevState => ({...prevState, ...data}))

    const selectProductHandler = product => {
        setSelectedProduct(product)
        clearTimeout(timeoutId)

        if (product.ppc_audit_indicator_state) {
            const state = product.ppc_audit_indicator_state.state

            if (state === scanningStatusEnums.PROCESSING || state === scanningStatusEnums.PROGRESS) {
                setScanningStatus(scanningStatusEnums.PROCESSING)

                getAuditDetails(product.id)
            } else if (state === scanningStatusEnums.FAILED) {
                setScanningStatus(scanningStatusEnums.FAILED)
            }
        } else {
            setScanningStatus(undefined)
        }
    }
    const resetScanningStatusHandler = () => {
        setScanningStatus(undefined)

        setProducts(prevState => prevState.map(product => {
            if (product.id === selectedProduct.id) product.scanningStatus = undefined
            return product
        }))
    }

    const startScanningHandler = async (data) => {
        setStartRequestProcessing(true)

        try {
            const res = await ppcAuditServices.startScanning({
                id: selectedProduct.id,
                ...data
            })

            setProducts(prevState => prevState.map(product => {
                if (product.id === selectedProduct.id) product.ppc_audit_indicator_state = {state: scanningStatusEnums.PROCESSING}
                return product
            }))


            setScanningStatus(scanningStatusEnums.PROCESSING)
        } catch (e) {
            console.log(e)
        }

        setStartRequestProcessing(false)
    }

    const stopScanningHandler = async () => {
        setStopRequestProcessing(true)

        try {
            await ppcAuditServices.stopScanning(selectedProduct.id)
            clearTimeout(timeoutId)

            setProducts(prevState => prevState.map(product => {
                if (product.id === selectedProduct.id) product.ppc_audit_indicator_state = {state: scanningStatusEnums.STOPPED}
                return product
            }))

            setScanningStatus(undefined)
        } catch (e) {
            console.log(e)
        }

        setStopRequestProcessing(false)
    }

    const getAuditIssues = async () => {
        try {
            const res = await ppcAuditServices.getAuditIssues({
                id: selectedProduct.id, ...issuesRequestParams,
                sorterColumn
            })
            setScanningStatus(scanningStatusEnums.FINISHED)

            setAuditIssues(res)
        } catch (e) {
            console.log(e)
        }
    }

    const getAuditDetails = async (id) => {
        try {
            const {result: {ppc_audit_job}} = await ppcAuditServices.getAuditDetails(id)

            if (ppc_audit_job.status === scanningStatusEnums.PROCESSING || ppc_audit_job.status === scanningStatusEnums.PROGRESS) {
                timeoutId = setTimeout(() => getAuditDetails(id), 5000)
            } else {
                setSelectedProduct(prevState => ({
                    ...prevState,
                    ...ppc_audit_job
                }))
                getAuditIssues()
            }
        } catch (e) {
            console.log(e)
        }
    }
    const fixProblemsHandler = () => {
        const searchStr = selectedProduct.sku || selectedProduct.asin || selectedProduct.name

        history.push(`/ppc/automation?searchStr=${searchStr}`)
    }

    useEffect(() => {
        getProducts()
    }, [productsRequestParams])

    useEffect(() => {
        getActualCogs()
    }, [selectedProduct.id])

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

            <div className={`page-workspace ${getKeyByValue(scanningStatus).toLowerCase()}`}>
                {!scanningStatus &&
                <StartScanning
                    product={selectedProduct}
                    startProcessing={startRequestProcessing}

                    onUpdateCogs={getActualCogs}
                    onStart={startScanningHandler}
                    onOpenStrategyDescription={() => setVisibleDrawer(true)}
                />}

                {(
                    scanningStatus === scanningStatusEnums.PROCESSING ||
                    scanningStatus === scanningStatusEnums.FINISHED
                ) && <>
                    <ScanningProcessingStatus
                        product={selectedProduct}
                        scanningStatus={scanningStatus}
                        stopProcessing={stopRequestProcessing}

                        onStop={stopScanningHandler}
                        onStart={startScanningHandler}
                    />

                    <ProblemsLevel
                        product={selectedProduct}
                        scanningStatus={scanningStatus}
                        filters={filters}

                        onSetFilters={setFilters}
                    />

                    <ProblemsType
                        product={selectedProduct}
                        scanningStatus={scanningStatus}
                    />

                    <ProblemsReport
                        product={selectedProduct}
                        scanningStatus={scanningStatus}
                        filters={filters}
                        data={auditIssues}
                        paginationParams={issuesRequestParams}
                        sorterColumn={sorterColumn}

                        onSetFilters={setFilters}
                        onSetSorterColumn={setSorterColumn}
                        fixProblemsHandler={fixProblemsHandler}
                        onChangePagination={setIssuesRequestParams}
                    />
                </>}

                {scanningStatus === scanningStatusEnums.FAILED && <ScanningFailed
                    onResetStatus={resetScanningStatusHandler}
                />}


                <StrategiesDescription
                    visible={visibleDrawer}
                    onClose={() => setVisibleDrawer(false)}
                />
            </div>
        </div>
    )
}

export default PPCAudit