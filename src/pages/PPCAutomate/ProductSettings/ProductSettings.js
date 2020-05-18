import React, {useEffect, useState} from "react";

import ProductsList from "./ProductsList/ProductsList";
import "./ProductSettings.less";
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import Filters from "./Filters/Filters";
import axios from "axios";
import {productsServices} from "../../../services/products.services";

const CancelToken = axios.CancelToken;
let source = null;

const ProductSettingsMain = () => {
    const [productsList, setProductsList] = useState([]),
        // [searchStr, setSearchStr] = useState(''),
        [totalSize, setTotalSize] = useState(0),
        [onlyActive, setOnlyActive] = useState(false),
        [processing, setProcessing] = useState(false),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10
        })

    const fetchProducts = async (searchStr = '') => {
        if (processing && source) {
            source.cancel();
        }

        source = CancelToken.source();

        setProcessing(true);

        const {result, totalSize} = await productsServices.getProductsSettingsList({
            ...paginationOptions,
            searchStr,

            onlyActive: onlyActive,
            cancelToken: source.token
        });

        setProductsList(result);
        setTotalSize(totalSize);
        setProcessing(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="product-settings-page">
            <Filters/>

            <ProductsList
                products={productsList}
                totalSize={totalSize}
                paginationOption={paginationOptions}
            />

            <LoadingAmazonAccount/>
        </div>
    );
};

export default ProductSettingsMain;
