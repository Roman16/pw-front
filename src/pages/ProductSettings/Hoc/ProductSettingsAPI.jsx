import React, { Component } from 'react';
// import axios from 'axios';

const dataSource = [
    {
        id: '1',
        'net-margin': '0',
        'min-bid-manual-camping': '57',
        'max-bid-manual-camping': '57',
        'min-bid-auto-camping': '57',
        'max-bid-auto-camping': '57',
        'total-changes': '1256',
        'optimization-status': 'paused',
        product: {
            asin: 'B07QDCVZ4M',
            captions: 'PW PWtest02 (Cheerry, 1234)',
            id: 244,
            image_url: 'http://g-ecx.images-amazon.com/images/G/01/x-site/icons/no-img-sm._CB1275522461_.gif',
            sku: '9A-OETJ-0U14',
        },
    },
    {
        id: '2',
        'net-margin': '0',
        'min-bid-manual-camping': '57',
        'max-bid-manual-camping': '57',
        'min-bid-auto-camping': '57',
        'max-bid-auto-camping': '57',
        'total-changes': '1256',
        'optimization-status': 'active',
        product: {
            asin: 'B07QDCVZ4M',
            captions: 'PW PWtest02 (Cheerry, 1234)',
            id: 244,
            image_url: 'http://g-ecx.images-amazon.com/images/G/01/x-site/icons/no-img-sm._CB1275522461_.gif',
            sku: '9A-OETJ-0U14',
        },
    }, {
        id: '3',
        'net-margin': '0',
        'min-bid-manual-camping': '57',
        'max-bid-manual-camping': '57',
        'min-bid-auto-camping': '57',
        'max-bid-auto-camping': '57',
        'total-changes': '1256',
        'optimization-status': 'active',
        product: {
            asin: 'B07QDCVZ4M',
            captions: 'PW PWtest02 (Cheerry, 1234)',
            id: 244,
            image_url: 'http://g-ecx.images-amazon.com/images/G/01/x-site/icons/no-img-sm._CB1275522461_.gif',
            sku: '9A-OETJ-0U14',
        },
    },
];

const ProductSettingsApi = (ProductSettings) => (
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                dataSource: [],
            };
        }

        componentDidMount() {
            this.fetchData();
        }

        fetchData = () => {
            this.setState({ dataSource: [...dataSource] });
        };

        onChangeRow = (event, item, index) => {
            const { dataSource } = this.state;
            const { target: { value } } = event;

            dataSource[index] = {
                ...dataSource[index],
                [item]: value,
            };

            this.setState({
                dataSource: [...dataSource],
            });
        };

        render() {
            const { dataSource } = this.state;


            return (
                <ProductSettings
                    {...this.props}
                    dataSource={dataSource}
                    onChangeRow={this.onChangeRow}


                />
            );
        }
    }

);

export default ProductSettingsApi;
