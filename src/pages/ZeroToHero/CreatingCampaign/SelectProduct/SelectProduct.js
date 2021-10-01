import React, {useEffect, useState} from "react"
import {SVG} from "../../../../utils/icons"
import {Input, Spin} from "antd"
import Pagination from "../../../../components/Pagination/Pagination"
import ProductItem from "./ProductItem"
import {zthServices} from "../../../../services/zth.services"
import './SelectProduct.less'
import moment from "moment"
import {debounce} from "throttle-debounce"

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
            const {result} = await zthServices.getAllProducts(requestParams)

            setProducts(result.products || [])
            setTotalSize(result.totalSize)
        } catch (e) {
            console.log(e)
            setProducts([])
        }

        setProcessing(false)
    }

    const changePaginationHandler = (options) => setRequestParams({...requestParams, ...options})

    const changeSearchHandler = debounce(500, false, str => {
        setRequestParams({
            ...requestParams,
            searchStr: str,
            page: 1
        })
    })

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
                        onChange={e => changeSearchHandler(e.target.value)}
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
                        {processing && <div className={'load-data'}><Spin size={'large'}/></div>}

                        {(!processing && !requestParams.searchStr && totalSize === 0) && <NoFound/>}
                        {(!processing && requestParams.searchStr && totalSize === 0) && <NoData/>}

                        {products.map(product => <ProductItem
                                key={product.id}
                                product={product}
                                isOpened={product.id === openedProduct}
                                isSelected={!!addedProducts.find(item => item.id === product.id)}
                                isDisabled={product.eligibility_status === 'INELIGIBLE'}
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
                        disabled={totalSize === 0}
                    />
                </div>
            </div>
        </div>
    </section>)
}

const NoData = () => <div className="empty no-data">
    <svg width="178" height="160" viewBox="0 0 178 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.0771 95.5398H48.7216C51.1788 95.5398 53.4562 96.8282 54.7218 98.9345L57.9589 104.322C59.4053 106.729 62.0079 108.202 64.8162 108.202H113.757C116.566 108.202 119.168 106.729 120.615 104.322L123.852 98.9345C125.117 96.8282 127.395 95.5398 129.852 95.5398H162.497L125.892 51.7988H52.682L16.0771 95.5398Z"
            fill="#D2D7E1"/>
        <rect x="37.8965" width="103.355" height="123.165" rx="4" fill="#EDF0F5"/>
        <rect x="48.2314" y="17.2656" width="82.6839" height="42.5899" rx="2" fill="#DCDFE6"/>
        <rect x="48.2314" y="73.6699" width="82.6839" height="5.75539" rx="2.8777" fill="#DCDFE6"/>
        <rect x="48.2314" y="84.0293" width="82.6839" height="5.75539" rx="2.8777" fill="#DCDFE6"/>
        <ellipse cx="89" cy="145.611" rx="89" ry="14.3885" fill="#F7F7F7"/>
        <path
            d="M16.0771 145.64V95.5391H50.4189C51.8231 95.5391 53.1244 96.2753 53.8476 97.4789L59.1245 106.261C59.8477 107.465 61.149 108.201 62.5531 108.201H116.021C117.425 108.201 118.726 107.465 119.449 106.261L124.726 97.4789C125.449 96.2753 126.751 95.5391 128.155 95.5391H162.497V145.64C162.497 147.849 160.706 149.64 158.497 149.64H20.0771C17.868 149.64 16.0771 147.849 16.0771 145.64Z"
            fill="#DCDFE6"/>
    </svg>
    <h4>No data found</h4>
    <p>There’s currently no data to display</p>
</div>

const NoFound = () => <div className="empty no-f0und">
    <svg width="178" height="128" viewBox="0 0 178 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="89" cy="109.169" rx="89" ry="15.831" fill="#F7F7F7"/>
        <path
            d="M33.1543 101.368H144.787C146.996 101.368 148.787 99.5769 148.787 97.3677V21.0625C148.787 18.8534 146.996 17.0625 144.787 17.0625H65.8483H33.1543C30.9452 17.0625 29.1543 18.8534 29.1543 21.0625V97.3677C29.1543 99.5769 30.9452 101.368 33.1543 101.368Z"
            fill="#D2D7E1"/>
        <path
            d="M44.4679 87.0732L135.955 84.3862C138.163 84.3213 139.9 82.4787 139.835 80.2705L137.587 3.99825C137.522 1.79007 135.679 0.0525602 133.471 0.117416L68.5001 2.02566L41.9846 2.80444C39.7764 2.8693 38.0391 4.71196 38.1042 6.92014L40.3518 83.1924C40.4169 85.4005 42.2598 87.1381 44.4679 87.0732Z"
            fill="#EDF0F5"/>
        <path opacity="0.3"
              d="M33.1543 104.377H144.787C146.996 104.377 148.787 102.587 148.787 100.377V32.1013C148.787 29.8922 146.996 28.1013 144.787 28.1013H75.223C73.7789 28.1013 72.447 27.323 71.7381 26.0649L69.509 22.1087C68.8002 20.8506 67.4682 20.0723 66.0241 20.0723H33.1543C30.9452 20.0723 29.1543 21.8631 29.1543 24.0723V100.377C29.1543 102.587 30.9452 104.377 33.1543 104.377Z"
              fill="#C9CEDA"/>
        <path
            d="M33.1543 110.399H144.787C146.996 110.399 148.787 108.608 148.787 106.399V34.1228H72.7097C71.2656 34.1228 69.9337 33.3445 69.2248 32.0864L66.9957 28.1302C66.2869 26.8721 64.9549 26.0938 63.5108 26.0938H29.1543V106.399C29.1543 108.608 30.9452 110.399 33.1543 110.399Z"
            fill="#DCDFE6"/>
        <path
            d="M155.811 118.718C157.739 120.695 157.702 123.862 155.728 125.792C153.753 127.723 150.589 127.686 148.66 125.709L155.811 118.718ZM137.121 99.5651L155.811 118.718L148.66 125.709L129.971 106.556L137.121 99.5651Z"
            fill="#CFD4DF"/>
        <path
            d="M148.51 114.703C149.667 115.888 149.644 117.789 148.46 118.947C147.275 120.105 145.377 120.083 144.219 118.897L148.51 114.703ZM129.82 95.5492L148.51 114.703L144.219 118.897L125.53 99.7437L129.82 95.5492Z"
            fill="#CFD4DF"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
              fill="#C0C7D3"/>
        <mask id="mask0" maskUnits="userSpaceOnUse" x="93" y="61" width="41" height="42">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.476C124.632 102.476 133.69 93.409 133.69 82.2243C133.69 71.0396 124.632 61.9727 113.459 61.9727C102.285 61.9727 93.2275 71.0396 93.2275 82.2243C93.2275 93.409 102.285 102.476 113.459 102.476Z"
                  fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0)">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.476C124.632 102.476 133.69 93.409 133.69 82.2243C133.69 71.0396 124.632 61.9727 113.459 61.9727C102.285 61.9727 93.2275 71.0396 93.2275 82.2243C93.2275 93.409 102.285 102.476 113.459 102.476Z"
                  fill="#D2D7E1"/>
            <path d="M135.277 61.9727L101.955 108.432" stroke="#EDF0F5" stroke-width="3" stroke-linecap="round"/>
            <path d="M140.831 66.0039L107.509 112.464" stroke="#EDF0F5" stroke-width="7" stroke-linecap="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M113.459 102.475C124.632 102.475 133.69 93.4085 133.69 82.2238C133.69 71.0391 124.632 61.9721 113.459 61.9721C102.286 61.9721 93.228 71.0391 93.228 82.2238C93.228 93.4085 102.286 102.475 113.459 102.475ZM113.459 107.241C127.261 107.241 138.45 96.0402 138.45 82.2238C138.45 68.4074 127.261 57.207 113.459 57.207C99.6568 57.207 88.4678 68.4074 88.4678 82.2238C88.4678 96.0402 99.6568 107.241 113.459 107.241Z"
                  fill="#DCDFE6"/>
        </g>
    </svg>
    <h4>No results found</h4>
    <p>Please select products you want to create <br/> campaigns for</p>
</div>

export default SelectProduct