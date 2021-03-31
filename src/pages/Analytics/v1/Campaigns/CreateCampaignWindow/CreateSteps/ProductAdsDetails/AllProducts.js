import React, {useEffect, useState} from "react"
import {debounce} from "throttle-debounce"
import {zthServices} from "../../../../../../../services/zth.services"
import {SVG} from "../../../../../../../utils/icons"
import {Input, Spin} from "antd"
import Pagination from "../../../../../../../components/Pagination/Pagination"
import ProductItem from "./ProductItem"
import _ from 'lodash'

const {Search} = Input;


const AllProducts = ({onChange, createData, disabledBlock}) => {
    const [allProducts, setAllProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [searchStr, setSearchStr] = useState(''),
        [processing, setProcessing] = useState(false),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        });

    const changePaginationHandler = (options) => {
        setPaginationOptions(options);
    };

    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    });


    const getProductsList = async () => {
        setProcessing(true);

        try {
            const res = await zthServices.getAllProducts({
                ...paginationOptions,
                searchStr: searchStr,
            });

            setAllProducts(res.result || []);
            setTotalSize(res.totalSize);
        } catch (e) {
            setAllProducts([])
        }

        setProcessing(false);
    };

    useEffect(() => {
        getProductsList();
    }, [paginationOptions]);

    return (
        <div className="col all-products">
            <div className="header-block">
                <h4>
                    Products
                </h4>

                <div className="filters">
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search'}
                            onChange={e => changeSearchHandler(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                            disabled={disabledBlock}
                        />
                    </div>

                    <div className="products-actions">
                        <button
                            disabled={allProducts.length === 0 || disabledBlock}
                            className={'btn default p15'}
                            onClick={() => onChange({selectedProductAds: [...createData.selectedProductAds, ...allProducts]})}
                        >
                            Add all on this page
                        </button>
                    </div>
                </div>
            </div>

            <div className="products-list">
                {allProducts.map((product, index) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        isAdded={!!_.find(createData.selectedProductAds, {id: product.id})}
                        disabledBlock={disabledBlock}

                        onAdd={() => onChange({selectedProductAds: [...createData.selectedProductAds, product]})}
                    />
                ))}
            </div>

            {processing && <div className="load-data">
                <Spin size={'large'}/>
            </div>}

            <Pagination
                onChange={changePaginationHandler}
                page={paginationOptions.page}
                pageSizeOptions={[10, 25, 50]}
                pageSize={paginationOptions.pageSize}
                totalSize={totalSize}
                listLength={allProducts.length}
                processing={processing}
                disabled={disabledBlock}
            />
        </div>
    )
};


export default AllProducts
