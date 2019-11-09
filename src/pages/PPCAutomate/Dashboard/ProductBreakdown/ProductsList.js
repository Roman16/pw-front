import React from "react";
import {useSelector} from 'react-redux';
import {Input} from "antd";
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import CustomTable from "../../../../components/Table/CustomTable";
import ProductItem from "../../../../components/ProductList/ProductItem";

const ProductsList = () => {
    const {products} = useSelector(state => ({
        products: state.products.productList
    }));
    const columns = [
        {
            title: (
                <div className="input-search">
                    <Input.Search
                        // onChange={this.onSearchChange}
                        // onBlur={onSearchBlur}
                    />
                </div>
            ),
            dataIndex: 'id',
            width: '350px',
            render: (text, record) => (
                <ProductItem
                    product={record}
                />
            )
        },
        {
            title: 'Number of Optimization',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '100px',
            render: (text) => (
                <div className='count-changes'>
                    {text || 123}
                </div>
            )
        },
        {
            title: 'Budget Allocation',
            dataIndex: 'cpa',
            key: 'cpa',
            // width: '100px',
            render: (text) => (
                <div className='product-params'>
                    {text || '123%'}
                    <div className='product-metric-changes up'>
                        +10%
                        <img src={upGreenIcon} alt=""/>
                    </div>
                </div>
            )
        },
        {
            title: 'Sales Share',
            dataIndex: 'cpa',
            key: 'cpa',
            // width: '10%',
            render: (text) => (
                <div className='product-params'>
                    {text || '123%'}
                    <div className='product-metric-changes up'>
                        +10%
                        <img src={upGreenIcon} alt=""/>
                    </div>
                </div>
            )
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            // width: '10%',
            render: (text) => (
                <div className='product-params'>
                    {text || '$123'}
                    <div className='product-metric-changes up'>
                        +10%
                        <img src={upGreenIcon} alt=""/>
                    </div>
                </div>
            )
        },
        {
            title: 'CVR Rate',
            dataIndex: 'cpa',
            key: 'cpa',
            // width: '10%',
            render: (text) => (
                <div className='product-params'>
                    {text || '123%'}
                    <div className='product-metric-changes up'>
                        +10%
                        <img src={upGreenIcon} alt=""/>
                    </div>
                </div>
            )
        },
        {
            title: 'ACoS',
            dataIndex: 'cpa',
            key: 'cpa',
            // width: '10%',
            render: (text) => (
                <div className='product-params'>
                    {text || '123%'}
                    <div className='product-metric-changes down'>
                        +10%
                        <img src={downBlackIcon} alt=""/>
                    </div>
                </div>
            )
        },
        {
            title: (<span>Profit <Tooltip type='warning'/></span>),
            dataIndex: 'cpa',
            key: 'cpa',
            width: '75px',
            render: (text) => (
                <div className='product-params'>
                    {text || '$123'}
                    <div className='product-metric-changes up'>
                        +10%
                        <img src={upGreenIcon} alt=""/>
                    </div>
                </div>
            )
        },
    ];

    return (
        <div>
            <CustomTable
                // onChangePagination={handlePaginationChange}
                // loading={loading}
                dataSource={products}
                columns={columns}
                // currentPage={currentPage}
                // totalSize={totalSize}
            />

        </div>
    )
};

export default ProductsList;
