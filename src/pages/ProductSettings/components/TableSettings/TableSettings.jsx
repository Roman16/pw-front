import React, { Component } from 'react';
import { Input } from 'antd';
import Table from '../../../../components/Table';
import ProductItem from '../../../PPCAutomate/components/ProductItem';
import './TableSettings.less';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
        product: {
            asin: 'B07QDCVZ4M',
            captions: 'PW PWtest02 (Cheerry, 1234)',
            id: 244,
            image_url: 'http://g-ecx.images-amazon.com/images/G/01/x-site/icons/no-img-sm._CB1275522461_.gif',
            sku: '9A-OETJ-0U14',
            under_optimization: false,
        },
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
        product: {
            asin: 'B07QDCVZ4M',
            captions: 'PW PWtest02 (Cheerry, 1234)',
            id: 244,
            image_url: 'http://g-ecx.images-amazon.com/images/G/01/x-site/icons/no-img-sm._CB1275522461_.gif',
            sku: '9A-OETJ-0U14',
            under_optimization: false,
        },
    },
];

const columns = [
    {
        title: () => (<Input.Search />),
        dataIndex: 'product',
        key: 'product',
        width: 300,
        render: ({
            id, asin, captions, sku,
            image_url, under_optimization,
        }) => (
            <ProductItem
                asin={asin}
                captions={captions}
                imageUrl={image_url}
                underOptimization={under_optimization}
                sku={sku}
                key={id}
            />
        ),
    },

    {
        title: 'Net Margin',
        dataIndex: 'net-margin',
        key: 'net-margin',
        render: () => (<Input />),
    },
    {
        title: 'Min Bid (Manual Campaign)',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
    {
        title: 'Max Bid (Manual Campaign)',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
    {
        title: 'Min Bid (Auto Campaign)',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
    {
        title: 'Min Bid (Auto Campaign)',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
    {
        title: 'Total Changes',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
    {
        title: 'Optimization Status',
        dataIndex: 'address',
        key: 'address',
        render: () => (<Input />),

    },
];

class TableSettings extends Component {
    render() {
        return (
            <div className="TableSettings">
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

TableSettings.propTypes = {};
TableSettings.defaultProps = {};
export default TableSettings;
