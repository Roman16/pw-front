import React, {useState} from "react";
import CustomTable from "../../../components/Table/CustomTable";
import {Input} from "antd";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";
import {SVG} from "../../../utils/icons";
import InputCurrency from "../../../components/Inputs/InputCurrency";


const ProductItem = ({product, openedProduct, onOpenVariations}) => {
    return (
        <div className='product-block'>
            <div className="image">
                <img src={product.image_url} alt=""/>
            </div>

            <div className="col">
                <div className="name" title={product.name}>
                    {product.name}
                </div>

                <div className="row">
                    <span className='price'>$35.99</span>
                    <span className='stock'>In Stock</span>
                </div>
            </div>

            <div
                className={`open-children-list-button ${product.variations ? 'has-variations' : ''} ${(openedProduct === product.id) ? 'opened' : ''}`}
                onClick={() => product.variations && onOpenVariations(product.id)}
            >
                {product.variations && <SVG id='select-icon'/>}
            </div>

        </div>
    )
};

const ProductsList = ({productsList, selectedTab, paginationOptions, processing, totalSize, onChangePagination}) => {
    const [openedProduct, setOpenedProduct] = useState(null);

    const openProductVariationsHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id)
    };

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
                    width: '14.285714285714286rem',
                    render: (props) => (<span>{props.asin}</span>)
                },
                {
                    width: '14.285714285714286rem',
                    render: (props) => (<span>{props.sku}</span>)
                },
                {
                    minWidth: '200px',
                    render: (status) => (
                        <div className="status-field created">
                            <span>Created</span>
                        </div>
                    )
                }
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
                    render: (props) => ('')
                },
            ]
        };


        return (
            product.variations.map(productVariation => (
                    <div>

                        {columns[selectedTab].map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 0 && <div className="variation-indicator"/>}

                                        {item.render(productVariation)}
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    };


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
    ];
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
                width: '14.285714285714286rem',
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
                minWidth: '200px',
                render: (status, item) => (
                    <div className="status-field">
                        {item.job && item.job.status}
                    </div>
                )
            },
            {
                title: 'Issues',
                dataIndex: 'problems',
                key: 'problems',
                minWidth: '150px',
            },
            {
                title: 'PPC Automate Status',
                dataIndex: 'under_optimization',
                key: 'under_optimization',
                minWidth: '200px',
                render: (status) => (
                    <div className="optimization-field">
                        {status ? <span>On Optimization</span> : <button className='btn default'>Start</button>}
                    </div>
                )
            },
            {
                title: 'Campaign Type',
                dataIndex: 'campaign_type',
                key: 'campaign_type',
                minWidth: '150px',
                render: () => <span>SP</span>
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
                render: (status) => (
                    <div className="zth-status-field">
                        <button className='btn green-btn'>Create</button>
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
                        {status ? <span>Automation: on</span> : <button className='btn default'>Automate</button>}
                    </div>
                )
            },
        ]
    };

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
};

export default ProductsList;