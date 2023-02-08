import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adGroupColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn, CPMColumn,
    ctrColumn, ICVRColumn,
    impressionsColumn,
    RenderProduct,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn,
    skuAsinColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"

const getColumns = (setStateHandler, selectedCampaign, selectedAdGroup) => ([
    {
        title: 'Active',
        dataIndex: 'state',
        key: 'state',
        width: '65px',
        noTotal: true,
        locked: true,
        editType: 'switch',
    },
    {
        title: 'Product',
        dataIndex: 'product_name_sku_asin',
        key: 'product_name_sku_asin',
        width: '300px',
        sorter: true,
        locked: true,
        search: true,
        filter: true,
        render: (name, item) => {
            if (name.split(':')[0] === 'Total') {
                return name
            } else {
                return <RenderProduct
                    product={item}
                    setState={setStateHandler}
                />
            }
        }
    },
    {
        ...skuAsinColumn,
        locked: false,
    },
    ...!selectedCampaign ? [{
        ...campaignColumn,
        locked: false,
        width: '250px',
        render: (campaign, item) => (<Link
            to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
            title={campaign}
            className={'state-link'}
            onClick={(e) => setStateHandler('ad-groups', {
                name: {campaignName: item.campaignName},
                campaignId: item.campaignId
            }, e)}
        >
            {campaign}
        </Link>)
    }] : [],
    ...!selectedAdGroup ? [{
        ...adGroupColumn,
        locked: false,
        width: '250px',
        render: (adGroup, item) => (
            <Link
                to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                title={item.adGroupName}
                className={'state-link'}
                onClick={(e) => setStateHandler('products', {
                    name: {
                        campaignName: item.campaignName,
                        adGroupName: item.adGroupName
                    }, campaignId: item.campaignId, adGroupId: item.adGroupId
                }, e)}
            >
                {item.adGroupName}
            </Link>
        )

    }] : [],
    {
        ...statusColumn,
    },
    impressionsColumn,
    clicksColumn,
    ctrColumn,
    adSpendColumn,
    cpcColumn,
    CPMColumn,
    budgetAllocationColumn,
    adOrdersColumn,
    cpaColumn,
    adCvrColumn,
    ICVRColumn,
    adUnitsColumn,
    adSalesColumn,
    acosColumn,
    roasColumn,
    RPCColumn,
    RPIColumn,
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    salesShareColumn,
    adProfitColumn
])

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})

