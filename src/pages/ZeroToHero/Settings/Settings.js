import React, {useEffect, useState} from "react";
import './Settings.less';
import {Input} from "antd";
import {productsServices} from "../../../services/products.services";
import moment from "moment";
import CustomTable from "../../../components/Table/CustomTable";


const Settings = () => {
    const [selectedTab, setTab] = useState('zth-products'),
        [searchStr, setSearchStr] = useState(''),
        [productsList, setList] = useState([]);

    const defaultColumns = [
        {
            title: () => (
                <div className="input-search">
                    <Input.Search
                        value={searchStr}
                        onChange={searchChangeHandler}
                        // onBlur={onSearchBlur}
                    />
                </div>
            ),
            dataIndex: 'id',
            key: 'id',
            width: 500,
            render: (id, product) => (
                <div className='product-block'>
                    <div className="image">
                        <img src={product.image_url} alt=""/>
                    </div>

                    <div className="col">
                        <div className="name">
                            {product.name}
                        </div>

                        <div className="row">
                            <span className='price'>$35.99</span>
                            <span className='stock'>In Stock</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
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
            width: 200,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: 200,
        }
    ];
    const columns = {
        'zth-products': [
            ...defaultColumns,
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    /*  <div className="status-field loading">
                          <div />
                          <span>Loading ...</span>
                      </div>*/

                    <div className="status-field created">
                        <div/>
                        <span>Created</span>
                    </div>
                )
            },
            {
                title: 'Optimization Status',
                dataIndex: 'optimization_status',
                key: 'optimization_status',
                render: (status) => (
                    <div className="optimization-field">
                        <button className='btn green-btn'>Start</button>
                    </div>
                )
            },
        ],
        'other-products': [
            ...defaultColumns,
            {
                title: 'ZeroToHero Status',
                dataIndex: 'zth_status',
                key: 'zth_status',
                render: (status) => (
                    <div className="zth-status-field">
                        <button className='btn default'>Start</button>
                    </div>
                )
            },
            {
                title: 'Optimization Status',
                dataIndex: 'optimization_status',
                key: 'optimization_status',
                render: (status) => (
                    <div className="optimization-field">
                        <button className='btn green-btn'>Start</button>
                    </div>
                )
            },
        ]
    };

    function searchChangeHandler(e) {
        setSearchStr(e.target.value)
    }

    function changeTabHandler(tab) {
        setTab(tab);
        setSearchStr('');
    }

    useEffect(() => {
        productsServices.getProducts({
            size: 10,
            page: 1,
            searchStr: '',
            ungroupVariations: 0
        })
            .then(res => {
                setList(res.result)
            })
    }, []);


    return (
        <div className="zero-to-hero-page zth-settings">
            <h2>Zero to Hero Settings</h2>

            <section>
                <div className="tabs">
                    <div
                        className={`tab ${selectedTab === 'zth-products' ? 'active' : ''}`}
                        onClick={() => changeTabHandler('zth-products')}
                    >
                        Zero to Hero Products
                    </div>

                    <div
                        className={`tab ${selectedTab === 'other-products' ? 'active' : ''}`}
                        onClick={() => changeTabHandler('other-products')}
                    >
                        Other Products
                    </div>

                    <div className="credits">
                        Your Credits:
                        <span>
                            5
                        </span>
                    </div>
                </div>

                <div className="table-block">
                    <CustomTable
                        rowKey="id"
                        dataSource={productsList}
                        columns={columns[selectedTab]}
                    />

                </div>
            </section>
        </div>
    )
};

export default Settings;