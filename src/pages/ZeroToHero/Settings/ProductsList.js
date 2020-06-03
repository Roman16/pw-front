import React, {useState} from "react";
import CustomTable from "../../../components/Table/CustomTable";
import {Input} from "antd";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";
import {SVG} from "../../../utils/icons";


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

    const defaultColumns = [
        {
            title: 'Product Name',
            dataIndex: 'id',
            key: 'id',
            width: '35.714285714285715rem',
            render: (id, product) => (<ProductItem
                product={product}
                openedProduct={openedProduct}
                onOpenVariations={openProductVariationsHandler}
            />)
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '10.714285714285714rem',
            render: (date) => (
                <div className='date-field'>
                    {moment(date).format('DD MMM YYYY')}
                </div>
            )
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
        }
    ];
    const columns = {
        'zth-products': [
            ...defaultColumns,
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                minWidth: '200px',
                render: (status) => (
                    /*  <div className="status-field loading">
                          <div />
                          <span>Loading ...</span>
                      </div>*/

                    <div className="status-field created">
                        <span>Created</span>
                    </div>
                )
            },
            {
                title: 'Problems',
                dataIndex: 'problems',
                key: 'problems',
                minWidth: '150px',
            },
            {
                title: 'Campaign Type',
                dataIndex: 'campaign_type',
                key: 'campaign_type',
                minWidth: '150px',
                render: () => <span>SP</span>
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
        ],
        'other-products': [
            ...defaultColumns,
            {
                title: 'Zero To Hero Status',
                dataIndex: 'zth_status',
                key: 'zth_status',
                render: (status) => (
                    <div className="zth-status-field">
                        <button className='btn green-btn'>Start</button>
                    </div>
                )
            },
            {
                title: 'Optimization Status',
                dataIndex: 'under_optimization',
                key: 'under_optimization',
                render: (status) => (
                    <div className="optimization-field">
                        {status ? <span>On Optimization</span> : <button className='btn default'>Start</button>}
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