import React, {useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import moment from "moment"
import Pagination from "../../../components/Pagination/Pagination"
import {SVG} from "../../../utils/icons"
import {history} from "../../../utils/history"
import {zthActions} from "../../../actions/zth.actions"
import {useDispatch} from "react-redux"
import InformationTooltip from "../../../components/Tooltip/Tooltip"
import {amazonDefaultImageUrls} from "../../../components/ProductList/ProductItem"
import noImage from '../../../assets/img/no-image-available.svg'


const ProductItem = ({product, openedProduct, onOpenVariations}) => {
    return (
        <div className='product-block'>
            <div className="image">
                <img src={amazonDefaultImageUrls.includes(product.image_url) ? noImage : product.image_url} alt=""/>
            </div>

            <div className="col">
                <a href={`https://www.amazon.com/dp/${product.asin}`} className="name" title={product.name}>
                    {product.name}
                </a>

                {!product.variations ?
                    <div className="row">
                        {(product.item_price !== null && product.item_price !== 0) && <div className="price">
                            ${product.item_price}
                        </div>}

                        <div className="stock">
                            {product.status_on_amazon === 'Active' ?
                                <span className={'in'}>In Stock</span>
                                :
                                <span className={'out'}>Stock Out</span>
                            }
                        </div>
                    </div>
                    :
                    <div className="row">
                        {(product.item_price !== null && product.item_price !== 0) && <div className="price">
                            ${product.item_price}
                        </div>}

                        <div className="stock">
                            {product.variations.every(item => item.status_on_amazon === 'Active') &&
                            <span className={'in'}>All in Stock</span>}
                            {(product.variations.some(item => item.status_on_amazon === 'Active') && product.variations.some(item => item.status_on_amazon !== 'Active')) &&
                            <span className={'some'}>Some Stock Out</span>}
                            {product.variations.every(item => item.status_on_amazon !== 'Active') &&
                            <span className={'out'}>All Stock Out</span>}
                        </div>
                    </div>
                }
            </div>

            <div
                className={`open-children-list-button ${product.variations ? 'has-variations' : ''} ${(openedProduct === product.id) ? 'opened' : ''}`}
                onClick={() => product.variations && onOpenVariations(product.id)}
            >
                {product.variations && <SVG id='select-icon'/>}
            </div>

        </div>
    )
}

const jobStatus = ({job}) => {
    if (job) {
        if (job.status === 'DONE') {
            return (
                <div className="status-field finished">
                    Finished
                </div>
            )
        } else if (job.status === 'DRAFT') {
            return (
                <div className="status-field draft">
                    Draft
                </div>
            )
        } else if (job.status === 'CREATION_IN_PROGRESS' || job.status === 'UPLOAD_IN_PROGRESS') {
            return (
                <div className="status-field processing">
                    Processing...

                    <InformationTooltip
                        description={'We are in the process of creating your PPC campaigns. You’ll get an email once it done.'}
                    />
                </div>
            )
        } else if (job.status === 'PAYMENT_PENDING') {
            return (
                <div className="status-field waiting-payment">
                    Waiting for Payment
                </div>
            )
        }else if (job.status === 'PAYMENT_IN_PROGRESS') {
            return (
                <div className="status-field waiting-payment">
                    Payment interrupted. Please complete payment
                </div>
            )
        } else if (job.status === 'CREATION_PENDING' || job.status === 'UPLOAD_PENDING') {
            return (
                <div className="status-field processing">
                    Pending...
                </div>
            )
        } else if (job.status === 'CREATION_THROTTLED' || job.status === 'UPLOAD_FAILED' || job.status === 'UPLOAD_THROTTLED' || job.status === 'CREATION_FAILED') {
            return (
                <div className="status-field processing">
                    Processing...

                    <InformationTooltip
                        description={'We are in the process of creating your PPC campaigns. You’ll get an email once it done.'}
                    />
                </div>
            )
        } else {
            return (
                <div className="status-field">
                    {job.status}
                </div>
            )
        }
    }
}

const jobActions = ({job}) => {
    if (job) {
        if (job.status === 'DRAFT') {
            return (
                <div className="issues-field">
                    {/*<button className={'btn default'}*/}
                    {/*        onClick={() => history.push(`/zero-to-hero/payment/${batch.id}`)}>*/}
                    {/*    Fix Payment*/}
                    {/*</button>*/}
                </div>
            )
        } else if (job.status === 'CREATION_THROTTLED' || job.status === 'CREATION_FAILED' || job.status === 'UPLOAD_FAILED' || job.status === 'UPLOAD_THROTTLED') {
            return (
                <div className="issues-field">
                    <button className={'sds-btn white'}>
                        Help Center
                    </button>
                </div>
            )
        } else if (job.status === 'PAYMENT_PENDING') {
            return (
                <div className="issues-field">
                    <button className={'sds-btn blue'}
                            onClick={() => history.push(`/zero-to-hero/payment/${job.id}`)}>
                        Pay & Upload
                    </button>
                </div>
            )
        }  else if ( job.status === 'PAYMENT_IN_PROGRESS') {
            return (
                <div className="issues-field">
                    <button className={'sds-btn blue'}
                            onClick={() => history.push(`/zero-to-hero/payment/${job.id}`)}>
                        Complete Payment
                    </button>
                </div>
            )
        } else {
            return (
                <div className="issues-field">
                    {job.issue}
                </div>
            )
        }
    }

}

const ProductsList = ({productsList, selectedTab, paginationOptions, processing, totalSize, onChangePagination}) => {
    const [openedProduct, setOpenedProduct] = useState(null)

    const openProductVariationsHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id)
    }


    const createZthHandler = (product) => {
        const searchStr = product.sku || product.asin || product.name

        history.push(`/zero-to-hero/creating?searchStr=${searchStr}`)
    }

    const expandedRowRender = (product) => {
        const columns = {
            'zth-products': [
                {
                    width: '500px',
                    render: (props) => {
                        return (<ProductItem
                                product={props}
                            />
                        )
                    }
                },
                {
                    render: ({sku, asin}) => <div className={'sku-asin'}>
                        <div title={sku}><b>SKU:</b>{sku}</div>
                        <div title={asin}><b>ASIN:</b>
                            <a
                                target={'_blank'}
                                href={`https://www.amazon.com/dp/${asin}`}
                            >
                                {asin}
                            </a>
                        </div>
                    </div>
                },
                {
                    // render: (date) => (
                    //     <div className='date-field'>
                    //         {moment(date).format('DD MMM YYYY')}
                    //     </div>
                    // )
                    render: () => ('')

                },

                {
                    // render: (props, item) => (jobStatus(item))
                    render: () => ('')

                },

                {
                    render: () => ('')
                },
            ],
            'other-products': [
                {
                    width: '400px',
                    render: (props) => {
                        return (<ProductItem
                                product={props}
                            />
                        )
                    }
                },
                {
                    render: ({sku, asin}) => <div className={'sku-asin'}>
                        <div title={sku}><b>SKU:</b>{sku}</div>
                        <div title={asin}><b>ASIN:</b>
                            <a
                                target={'_blank'}
                                href={`https://www.amazon.com/dp/${asin}`}
                            >
                                {asin}
                            </a>
                        </div>
                    </div>
                },
                {
                    render: (product) => (
                        <div className="zth-status-field">
                            <button className='sds-btn blue' onClick={() => createZthHandler(product)}>
                                Create ZTH
                            </button>
                        </div>
                    )
                },
            ]
        }


        return (
            product.variations.map((productVariation, index) => (
                    <div>
                        {columns[selectedTab].map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1}

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 0 && <div className="variation-indicator"/>}

                                        {item.render(productVariation, product)}
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    }


    const defaultColumns = [
        {
            title: 'Product name',
            dataIndex: 'id',
            key: 'id',
            width: '500px',
            render: (id, product) => (<ProductItem
                product={product}
                openedProduct={openedProduct}
                onOpenVariations={openProductVariationsHandler}
            />)
        },
        {
            title: 'SKU/ASIN',
            dataIndex: 'id',
            key: 'id',
            render: (text, {sku, asin}) => <div className={'sku-asin'}>
                <div title={sku}><b>SKU:</b>{sku}</div>
                <div title={asin}><b>ASIN:</b>
                    <a
                        target={'_blank'}
                        href={`https://www.amazon.com/dp/${asin}`}
                    >
                        {asin}
                    </a>
                </div>
            </div>
        },

    ]
    const columns = {
        'zth-products': [
            ...defaultColumns,
            {
                title: 'Created at Date',
                dataIndex: 'date',
                key: 'date',
                render: (date, item) => {
                    return (
                        <div className='date-field'>
                            {item.job && moment(item.job.created_at).format('DD MMM YYYY')}
                        </div>
                    )
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status, item) => (jobStatus(item))
            },
            {
                title: 'Actions',
                dataIndex: 'problems',
                key: 'problems',
                render: (status, item) => (jobActions(item))
            },
        ],
        'other-products': [
            ...defaultColumns,
            {
                title: 'Actions',
                dataIndex: 'zth_status',
                key: 'zth_status',
                render: (status, product) => (
                    <div className="zth-status-field">
                        <button className='sds-btn blue' onClick={() => createZthHandler(product)}>
                            Create ZTH
                        </button>
                    </div>
                )
            },
        ]
    }

    return (
        <>
            <CustomTable
                rowKey="id"
                dataSource={productsList}
                columns={columns[selectedTab]}
                loading={processing}
                openedRow={(product) => product.id === openedProduct}
                emptyText={'image'}

                expandedRowRender={expandedRowRender}
            />

            <Pagination
                onChange={onChangePagination}
                page={paginationOptions.page}
                pageSizeOptions={[10, 25, 50]}
                pageSize={paginationOptions.pageSize}
                totalSize={totalSize}
                listLength={productsList.length}
                processing={processing}
            />
        </>
    )
}

export default ProductsList
