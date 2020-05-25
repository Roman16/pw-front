import React, {useCallback, useEffect, useState} from "react";

import ProductsList from "./ProductsList/ProductsList";
import "./ProductSettings.less";
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import Filters from "./Filters/Filters";
import axios from "axios";
import {productsServices} from "../../../services/products.services";
import {notification} from '../../../components/Notification';
import {debounce} from "throttle-debounce";

const CancelToken = axios.CancelToken;
let source = null;

let timerId = null;

let editableRow = null;

const ProductSettingsMain = () => {
    const [productsList, setProductsList] = useState([]),
        [searchStr, setSearchStr] = useState(''),
        [totalSize, setTotalSize] = useState(0),
        [onlyActive, setOnlyActive] = useState(false),
        [onlyOptimization, setOnlyOptimization] = useState(false),
        [processing, setProcessing] = useState(false),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10
        })

    const fetchProducts = async () => {
        if (processing && source) {
            source.cancel();
        }

        source = CancelToken.source();

        setProcessing(true);

        const {result, totalSize} = await productsServices.getProductsSettingsList({
            ...paginationOptions,
            searchStr,
            onlyActive,
            onlyOptimization,
            cancelToken: source.token
        });

        setProductsList(result || []);
        setTotalSize(totalSize);
        setProcessing(false);
    };

    const changeSwitchHandler = (type, value) => {
        if (type === 'active') {
            setOnlyActive(value);

        } else if (type === 'optimization') {
            setOnlyOptimization(value)
        }

        setOnlyActive(value);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    };

    const updateSettingsHandlerById = async (data) => {
        try {
            await productsServices.updateProductSettings(data);

            notification.success({
                title: 'Changes saved'
            });
        } catch (e) {
            console.log(e);
        }
    };

    const updateSettingsHandlerByIdList = async (data) => {
        try {
            await productsServices.updateProductSettingsByIdList({
                [data.field]: data[data.field],
                ...data.product_id && {product_id: data.product_id}
            });

            if (data.product_id) {
                const newList = [...productsList.map(item => {
                    if (data.product_id.find(id => id === item.id)) {
                        item[data.field] = data[data.field]
                    }

                    return item;
                })];

                setProductsList([...newList]);
            } else {
                const newList = [...productsList.map(item => {
                    item[data.field] = data[data.field];

                    return item;
                })];

                setProductsList([...newList]);
            }

            notification.success({
                title: 'Changes saved'
            });
        } catch (e) {
            console.log(e);
        }
    };

    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    });

    const setRowData = (value, item, index) => {
        const newList = productsList.map((product, productIndex) => {
            if (productIndex === index) {
                product[item] = value
            }

            return (product)
        })
        setProductsList(newList);


        clearTimeout(timerId);
        timerId = setTimeout(() => {
            updateSettingsHandlerById(productsList[index]);
            editableRow = null;
        }, 2000);

        if (editableRow !== null && editableRow !== index) {
            updateSettingsHandlerById(productsList[editableRow]);
            clearTimeout(timerId);
        }

        editableRow = index;
    };

    const changePaginationHandler = (params) => {
        setPaginationOptions(params)
    }

    useEffect(() => {
        fetchProducts();

        return (() => {
            if (editableRow !== null) {
                updateSettingsHandlerById(productsList[editableRow]);
            }
        })
    }, [paginationOptions])

    return (
        <div className="product-settings-page">
            <Filters
                onChangeSearch={changeSearchHandler}
                onChangeSwitch={changeSwitchHandler}
            />

            <ProductsList
                processing={processing}
                products={productsList}
                totalSize={totalSize}
                paginationOption={paginationOptions}

                changePagination={changePaginationHandler}
                setRowData={setRowData}
                updateSettingsHandlerByIdList={updateSettingsHandlerByIdList}
            />

            <LoadingAmazonAccount/>
        </div>
    );
};

export default ProductSettingsMain;
