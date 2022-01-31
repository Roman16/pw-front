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
import {Switch} from "antd"

export const columnList = (setStateHandler, selectedCampaign, selectedAdGroup) => ([
        // {
        //     title: 'Active',
        //     dataIndex: 'state',
        //     key: 'state',
        //     width: '65px',
        //     noTotal: true,
        //     locked: true,
        //     render: (state) => <div className="switch-block">
        //         <Switch
        //             disabled={state === 'archived'}
        //             checked={state === 'enabled'}
        //         />
        //     </div>
        // },
        {
            title: 'Product',
            dataIndex: 'product_name_sku_asin',
            key: 'product_name_sku_asin',
            width: '300px',
            sorter: true,
            locked: true,
            search: true,
            totalRender: value => value,
            render: (name, item) => <RenderProduct
                product={item}
                setState={setStateHandler}
            />
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
            locked: false,
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
    ]
)
