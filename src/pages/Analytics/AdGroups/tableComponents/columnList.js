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
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    RPCColumn, RPIColumn, ICVRColumn, CPMColumn, ParentStatus,
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"

export const columnList = (setStateHandler, selectedCampaign, setStateDetails) => {
    const columns = [
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
            title: 'Ad Group',
            dataIndex: 'name',
            key: 'name',
            width: '350px',
            sorter: true,
            locked: true,
            search: true,
            filter: true,
            editType: 'text',
            redirectLink: (item) => `/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`,
            clickEvent: (item, e) => {
                setStateHandler('products', {
                    name: {
                        campaignName: item.campaignName,
                        adGroupName: item.name
                    }, campaignId: item.campaignId, adGroupId: item.adGroupId
                }, e)
                setStateDetails(item)
            },
            render: (adGroup, item) => <div
                className={'state-link'}
                title={adGroup}
            >
                {adGroup}
            </div>
        },
        {
            ...campaignColumn,
            locked: false,
            render: (campaign, item) => (<div className={'state-link'}>
                <ParentStatus status={item.campaignState}/>

                <Link
                    to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                    title={campaign}
                    onClick={(e) => setStateHandler('ad-groups', {
                        name: {campaignName: item.campaignName},
                        campaignId: item.campaignId
                    }, e)}
                >
                    {campaign}
                </Link>
            </div>)
        },
        {...statusColumn, locked: false},
        {
            title: 'Default bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
            width: '130px',
            sorter: true,
            locked: false,
            noTotal: true,
            filter: true,
            fastUpdating: true,
            editType: 'currency',
            ...renderNumberField('currency')
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

    if (selectedCampaign) {
        return ({columnsWithFilters: columns.filter(i => i.key !== 'campaignName'), allColumns: columns})
    } else {
        return ({columnsWithFilters: columns, allColumns: columns})
    }
}
