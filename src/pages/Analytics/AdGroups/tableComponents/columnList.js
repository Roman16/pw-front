import React from "react"
import {
    budgetAllocationColumn,
    impressionsColumn,
    salesShareColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    clicksColumn,
    adCvrColumn,
    roasColumn,
    acosColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    campaignColumn,
    statusColumn,
    renderNumberField,
    EditableField,
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    RPCColumn, RPIColumn, ICVRColumn, CPMColumn,
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"
import {Switch} from "antd"

export const columnList = (setStateHandler, selectedCampaign) => ([
        // {
        //     title: 'Active',
        //     dataIndex: 'state',
        //     key: 'state',
        //     width: '65px',
        //     noTotal: true,
        //     render: (state) => <div className="switch-block">
        //         <Switch
        //             disabled={state === 'archived'}
        //             checked={state === 'enabled'}
        //         />
        //     </div>
        // },
        {
            title: 'Ad Group',
            dataIndex: 'name',
            key: 'name',
            width: '350px',
            sorter: true,
            locked: true,
            search: true,
            render: (adGroup, item) => (
                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.name}
                    className={'state-link'}
                    onClick={(e) => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.name
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    }, e)}
                >
                    {adGroup}
                </Link>
            )
        },
        ...selectedCampaign ? [] : [{
            ...campaignColumn,
            locked: true,
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                className={'state-link'}
                title={campaign}
                onClick={(e) => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                }, e)}
            >
                {campaign}
            </Link>)
        }],
        {...statusColumn, locked: true},
        {
            title: 'Default bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
            width: '130px',
            sorter: true,
            locked: true,
            noTotal: true,
            filter: true,
            fastUpdating: true,
            editType: 'currency',
            disableField: () => true
        },
        {
            title: 'Total Targets',
            dataIndex: 'targetings_count',
            key: 'targetings_count',
            width: '200px',
            sorter: true,
            noTotal: true,
            align: 'right',
            ...renderNumberField()
        },
        {
            title: 'Products',
            dataIndex: 'product_ads_count',
            key: 'product_ads_count',
            width: '200px',
            sorter: true,
            noTotal: true,
            align: 'right',
            ...renderNumberField()
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
        adProfitColumn,
    ]
)
