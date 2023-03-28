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
    impressionsColumn, ParentStatus,
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
            if (name && name.split(':')[0] === 'Total') {
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
            </Link></div>)
    },
        {
            title: 'Campaign Status',
            dataIndex: 'campaignState',
            key: 'campaignState',
            width: '0',
            visible: false,
            sorter: false,
            locked: false,
            noTotal: true,
            filter: true,
            fastUpdating: false,
        }] : [],
    ...!selectedAdGroup ? [{
        ...adGroupColumn,
        locked: false,
        width: '250px',
        render: (adGroup, item) => (<div className={'state-link'}>
                <ParentStatus status={item.adGroupState}/>

                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.adGroupName}
                    onClick={(e) => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    }, e)}
                >
                    {item.adGroupName}
                </Link></div>
        )

    },
        {
            title: 'Ad Group Status',
            dataIndex: 'adGroupState',
            key: 'adGroupState',
            width: '0',
            visible: false,
            sorter: false,
            locked: false,
            noTotal: true,
            filter: true,
            fastUpdating: false,
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

