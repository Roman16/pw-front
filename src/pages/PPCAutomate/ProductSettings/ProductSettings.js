import React, {useEffect, useState} from "react";

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

const ProductSettingsMain = () => {
    const [productsList, setProductsList] = useState([]),
        [searchStr, setSearchStr] = useState(''),
        [totalSize, setTotalSize] = useState(0),
        [onlyActive, setOnlyActive] = useState(false),
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
            cancelToken: source.token
        });

        setProductsList(result || []);
        setTotalSize(totalSize);
        setProcessing(false);
    };

    const changeSwitchHandler = (value) => {
        setOnlyActive(value);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    }

    const updateSettingsHandler = async (data) => {

        try {
            await productsServices.updateProductSettings(data);

            this.prevItemIndex = null;

            this.timerNotificationId = setTimeout(() => {
                notification.success({
                    title: 'Changes saved'
                });
            }, 1500)

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

    const changePaginationHandler = (params) => {
        setPaginationOptions(params)
    }

    useEffect(() => {
        fetchProducts();
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
                onUpdateSettings={updateSettingsHandler}
            />

            <LoadingAmazonAccount/>
        </div>
    );
};

export default ProductSettingsMain;
