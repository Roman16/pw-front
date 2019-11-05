import React from "react";
import CustomTable from "../../../components/Table/CustomTable";
import {Input} from "antd";
import ProductItem from "../../../components/ProductList/ProductItem";

const ProductsList = () => {
   const columns = [
        {
            title: () => (
                <div className="input-search">
                    <Input.Search
                        onChange={this.onSearchChange}
                        // onBlur={onSearchBlur}
                    />
                </div>
            ),
            dataIndex: '',
            key: 'title',
            width: '350px',
            render: (product) => (
                <ProductItem
                    product={product}
                />
            )
        },
        {
            title: 'Optimization Changes',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'Budget Allocation',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'Sales Share',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'CVR Rate',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'ACoS',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
        {
            title: 'Profit',
            dataIndex: 'cpa',
            key: 'cpa',
            width: '130px',
        },
    ];

    return(
        <div>
            <CustomTable
                // onChangePagination={handlePaginationChange}
                // loading={loading}
                // dataSource={data}
                columns={columns}
                // currentPage={currentPage}
                // totalSize={totalSize}
            />

        </div>
    )
};

export default ProductsList;