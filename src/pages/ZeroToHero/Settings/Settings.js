import React, {useEffect, useState} from "react";
import './Settings.less';
import {Input} from "antd";
import {productsServices} from "../../../services/products.services";
import ProductsList from "./ProductsList";
import {SVG} from "../../../utils/icons";


const {Search} = Input;

const Settings = () => {
    const [selectedTab, setTab] = useState('zth-products'),
        [searchStr, setSearchStr] = useState(''),
        [productsList, setList] = useState([]);


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
        <div className="zth-settings">
            <h2>Zero to Hero Settings</h2>

            <section>
                <ul className="tabs">
                    <li
                        className={`tab ${selectedTab === 'zth-products' ? 'active' : ''}`}
                        onClick={() => changeTabHandler('zth-products')}
                    >
                        Zero to Hero Products

                        <div className="border"/>
                    </li>

                    <li
                        className={`tab ${selectedTab === 'other-products' ? 'active' : ''}`}
                        onClick={() => changeTabHandler('other-products')}
                    >
                        Other Products

                        <div className="border"/>
                    </li>
                </ul>

                <div className="filters">
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search'}
                            // onChange={e => onChangeSearch(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

                    <div className="credits-count">
                        Your Credits:

                        <span>30</span>
                    </div>
                </div>

                <ProductsList
                    productsList={productsList}
                    selectedTab={selectedTab}
                />
            </section>
        </div>
    )
};

export default Settings;