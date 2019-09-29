import React, { Component } from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Input } from 'antd';
import { InputCurrency } from '../../../../components/Inputs';
import Table from '../../../../components/Table';
import ProductItem from '../../../PPCAutomate/components/ProductItem';
import './TableSettings.less';
import ProductSettingsApi from '../../Hoc/ProductSettingsAPI';

const ACTIVE = 'active';
const PRODUCT = 'product';
const NET_MARGIN = 'net-margin';
const MIN_BID_MANUAL_CAMPING = 'min-bid-manual-camping';
const MAX_BID_MANUAL_CAMPING = 'max-bid-manual-camping';
const MIN_BID_AUTO_CAMPING = 'min-bid-auto-camping';
const MAX_BID_AUTO_CAMPING = 'max-bid-auto-camping';
const TOTAL_CHANGES = 'total-changes';
const OPTIMIZATION_STATUS = 'optimization-status';


class TableSettings extends Component {
    constructor(props) {
        super(props);
        const { onChangeRow } = props;

        this.columns = [
            {
                title: () => (
                    <div className="InputSearch">
                        <Input.Search />
                    </div>
                ),
                dataIndex: PRODUCT,
                key: PRODUCT,
                width: 300,
                render: ({
                    id, asin, captions, sku,
                    image_url,
                }) => (
                    <ProductItem
                        asin={asin}
                        captions={captions}
                        imageUrl={image_url}
                        sku={sku}
                        key={id}
                    />
                ),
            },

            {
                title: 'Net Margin',
                dataIndex: NET_MARGIN,
                key: NET_MARGIN,
                render: (index, item, indexRow) => (
                    <InputCurrency
                        value={item[NET_MARGIN]}
                        onChange={(event) => onChangeRow(event, NET_MARGIN, indexRow)}
                    />
                ),
            },
            {
                title: 'Min Bid (Manual Campaign)',
                dataIndex: MIN_BID_MANUAL_CAMPING,
                key: MIN_BID_MANUAL_CAMPING,
                render: (index, item, indexRow) => (
                    <InputCurrency
                        value={item[MIN_BID_MANUAL_CAMPING]}
                        onChange={(event) => onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)}
                    />
                ),
            },
            {
                title: 'Max Bid (Manual Campaign)',
                dataIndex: MAX_BID_MANUAL_CAMPING,
                key: MAX_BID_MANUAL_CAMPING,
                render: (index, item, indexRow) => (
                    <InputCurrency
                        value={item[MAX_BID_MANUAL_CAMPING]}
                        onChange={(event) => onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)}
                    />
                ),
            },
            {
                title: 'Min Bid (Auto Campaign)',
                dataIndex: MIN_BID_AUTO_CAMPING,
                key: MIN_BID_AUTO_CAMPING,
                render: (index, item, indexRow) => (
                    <InputCurrency
                        value={item[MIN_BID_AUTO_CAMPING]}
                        onChange={(event) => onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)}
                    />
                ),
            },
            {
                title: 'Max Bid (Auto Campaign)',
                dataIndex: MAX_BID_AUTO_CAMPING,
                key: MAX_BID_AUTO_CAMPING,
                render: (index, item, indexRow) => (
                    <InputCurrency
                        value={item[MAX_BID_AUTO_CAMPING]}
                        onChange={(event) => onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)}
                    />
                ),
            },
            {
                title: 'Total Changes',
                dataIndex: TOTAL_CHANGES,
                key: TOTAL_CHANGES,
                render: (index, item) => (
                    <div style={{ fontWeight: 600 }}>
                        {item[TOTAL_CHANGES]}
                    </div>
                ),
            },
            {
                title: 'Optimization Status',
                dataIndex: OPTIMIZATION_STATUS,
                key: OPTIMIZATION_STATUS,
                render: (index, item) => (
                    <div
                        className={`settings-status ${item[OPTIMIZATION_STATUS] === ACTIVE ? 'active' : ''}`}
                    >
                        {item[OPTIMIZATION_STATUS]}
                    </div>
                ),

            },
        ];
    }


    render() {
        const { dataSource } = this.props;


        return (
            <div className="TableSettings">
                <Table rowKey="id" dataSource={dataSource} columns={this.columns} />
            </div>
        );
    }
}

TableSettings.propTypes = {
    onChangeRow: func,
    dataSource: arrayOf(object),
};
TableSettings.defaultProps = {
    onChangeRow: () => {
    },
    dataSource: [],
};
export default ProductSettingsApi(TableSettings);
