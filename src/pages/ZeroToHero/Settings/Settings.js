import React, {useEffect, useState} from "react";
import './Settings.less';
import {Input} from "antd";
import {productsServices} from "../../../services/products.services";
import ProductsList from "./ProductsList";
import {SVG} from "../../../utils/icons";
import {debounce} from "throttle-debounce";


const {Search} = Input;

const Settings = () => {
    const [selectedTab, setTab] = useState('zth-products'),
        [productsList, setList] = useState([]),
        [processing, setProcessing] = useState(false),
        [searchStr, setSearchStr] = useState(''),
        [totalSize, setTotalSize] = useState(0),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        });


    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    });


    const changePaginationHandler = (params) => setPaginationOptions(params);

    function changeTabHandler(tab) {
        setTab(tab);
        setSearchStr('');
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    }

    const getProductsList = async () => {
        setProcessing(true);

        try {
            const res = await productsServices.getProducts({
                ...paginationOptions,
                searchStr: searchStr,
                ungroupVariations: 0
            });

            setList(res.result || []);
            setTotalSize(res.totalSize);
        } catch (e) {
            setList([])
        }

        setProcessing(false);
    };


    useEffect(() => {
        getProductsList()
    }, [paginationOptions]);


    return (
        <div className="zth-settings">
            <h2>Zero to Hero Settings</h2>

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
                        onChange={e => changeSearchHandler(e.target.value)}
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
                processing={processing}
                paginationOptions={paginationOptions}
                totalSize={totalSize}
                onChangePagination={changePaginationHandler}
            />
        </div>
    )
};

export default Settings;