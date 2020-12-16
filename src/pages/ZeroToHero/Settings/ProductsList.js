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
                <div className="name" title={product.name}>
                    {product.name}
                </div>

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
        } else if (job.status === 'PROCESSING') {
            return (
                <div className="status-field processing">
                    Processing...

                    <InformationTooltip
                        description={'We are in the process of creating your PPC campaigns. You’ll get an email once it done.'}
                    />
                </div>
            )
        } else if (job.status === 'PENDING') {
            return (
                <div className="status-field processing">
                    Pending...
                </div>
            )
        } else if (job.status === 'THROTTLED' || job.status === 'FAILED') {
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

const jobIssues = ({job, batch}) => {
    if (job) {
        if (batch.status === 'DRAFT') {
            return (
                <div className="issues-field">
                    <button className={'btn green-btn'}
                            onClick={() => history.push(`/zero-to-hero/payment/${batch.id}`)}>
                        Fix Payment
                    </button>
                </div>
            )
        } else if (job.status === 'THROTTLED' || job.status === 'FAILED') {
            return (
                <div className="issues-field">
                    <button className={'btn green-btn'} onClick={() => window.Intercom('show')}>
                        Help Center
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

    const dispatch = useDispatch()

    const openProductVariationsHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id)
    }

    const goOptimizationPage = () => {
        history.push('/ppc/optimization')
    }

    const createZthHandler = (product) => {
        dispatch(zthActions.addProducts([product]))

        history.push('/zero-to-hero/creating')
    }

    const expandedRowRender = (product) => {
        const columns = {
            'zth-products': [
                {
                    width: '35.714285714285715rem',
                    render: (props) => {
                        return (<ProductItem
                                product={props}
                            />
                        )
                    }
                },
                {
                    width: '10.714285714285714rem',
                    render: (date) => (
                        <div className='date-field'>
                            {moment(date).format('DD MMM YYYY')}
                        </div>
                    )
                },
                {
                    width: '150px',
                    render: (props) => (<span>{props.asin}</span>)
                },
                {
                    width: '14.285714285714286rem',
                    render: (props) => (<span>{props.sku}</span>)
                },
                {
                    minWidth: '150px',
                    render: (props, item) => (jobStatus(item))
                },
                {
                    minWidth: '170px',
                    render: (props) => ('')
                },
                {
                    minWidth: '200px',
                    render: (props) => ('')
                },
                {
                    minWidth: '200px',
                    render: (props, product) => (<div className="optimization-field">
                        {product.under_optimization ? <span>Running</span> :
                            <button className='btn default' onClick={goOptimizationPage}>Automate</button>}
                    </div>)
                },
                {
                    minWidth: '130px',
                    render: () => <span>SP</span>
                },
                {
                    minWidth: '200px',
                    render: (props) => ('')
                },
            ],
            'other-products': [
                {
                    width: '35.714285714285715rem',
                    render: (props) => {
                        return (<ProductItem
                                product={props}
                            />
                        )
                    }
                },
                {
                    minWidth: '14.285714285714286rem',
                    render: (props) => (<span>{props.asin}</span>)
                },
                {
                    minWidth: '14.285714285714286rem',
                    render: (props) => (<span>{props.sku}</span>)
                },
                {
                    minWidth: '14.285714285714286rem',
                    render: (props) => ('')
                },
                {
                    minWidth: '14.285714285714286rem',
                    render: (props, item) => {
                        return (
                            <div className="optimization-field">
                                {item.under_optimization && <span> Running</span>}
                            </div>
                        )
                    }
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
            title: 'Products with ZTH',
            dataIndex: 'id',
            key: 'id',
            width: '35.714285714285715rem',
            render: (id, product) => (<ProductItem
                product={product}
                openedProduct={openedProduct}
                onOpenVariations={openProductVariationsHandler}
            />)
        }
    ]
    const columns = {
        'zth-products': [
            ...defaultColumns,
            {
                title: 'Created Date',
                dataIndex: 'date',
                key: 'date',
                width: '10.714285714285714rem',
                render: (date, item) => {
                    return (
                        <div className='date-field'>
                            {item.job && moment(item.job.created_at).format('DD MMM YYYY')}
                        </div>
                    )
                }
            },
            {
                title: 'ASIN',
                dataIndex: 'asin',
                key: 'asin',
                width: '150px',
            },
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
                width: '14.285714285714286rem',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                minWidth: '150px',
                render: (status, item) => (jobStatus(item))
            },
            {
                title: 'Keywords Amount',
                dataIndex: 'keywords_count',
                key: 'keywords_count',
                minWidth: '170px',
                render: (date, item) => item.job && item.job.keywords_count
            },
            {
                title: 'Product Targetings Amount',
                dataIndex: 'pts_count',
                key: 'pts_count',
                minWidth: '200px',
                render: (date, item) => item.job && item.job.pts_count
            },
            {
                title: 'PPC Automate Status',
                dataIndex: 'under_optimization',
                key: 'under_optimization',
                minWidth: '200px',
                render: (status) => (
                    <div className="optimization-field">
                        {status ? <span>Running</span> :
                            <button className='btn default' onClick={goOptimizationPage}>Automate</button>}
                    </div>
                )
            },
            {
                title: 'Campaign Type',
                dataIndex: 'campaign_type',
                key: 'campaign_type',
                minWidth: '130px',
                render: () => <span>SP</span>
            },
            {
                title: 'Issues',
                dataIndex: 'problems',
                key: 'problems',
                minWidth: '200px',
                render: (status, item) => (jobIssues(item))
            },
        ],
        'other-products': [
            ...defaultColumns,
            {
                title: 'ASIN',
                dataIndex: 'asin',
                key: 'asin',
                minWidth: '14.285714285714286rem',
            },
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
                minWidth: '14.285714285714286rem',
            },
            {
                title: 'Zero To Hero Status',
                dataIndex: 'zth_status',
                key: 'zth_status',
                minWidth: '14.285714285714286rem',
                render: (status, product) => (
                    <div className="zth-status-field">
                        <button className='btn green-btn' onClick={() => createZthHandler(product)}>
                            Create
                        </button>
                    </div>
                )
            },
            {
                title: 'PPC Automate Status',
                dataIndex: 'under_optimization',
                key: 'under_optimization',
                minWidth: '14.285714285714286rem',
                render: (status) => (
                    <div className="optimization-field">
                        {status ? <span>Running</span> :
                            <button className='btn default' onClick={goOptimizationPage}>
                                Automate
                            </button>}
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
                openedRow={openedProduct}

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
