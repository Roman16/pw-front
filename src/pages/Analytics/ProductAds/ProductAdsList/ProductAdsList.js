import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adGroupColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"


const ProductAdsList = () => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name',
            width: '250px',
            sorter: true,
            locked: true,
            search: true,
            render: (name, item) => <div className="product">
                <img src={item.product_image} alt=""/>

                <div className="col">
                    <h4>{item.product_name}</h4>
                    <p>{item.product_price}</p>
                </div>
            </div>
        },
        {
            title: 'SKU/ASIN',
            dataIndex: 'sku_asin',
            key: 'sku_asin',
            width: '250px',
            sorter: true,
            locked: true,
            noTotal: true,
            render: (text, item) => <div><b>SKU:</b> {item.sku} <br/> <b>ASIN:</b> {item.asin}</div>
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
            locked: true,
            width: '250px',
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                onClick={() => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                })}
            >
                {campaign}
            </Link>)
        }] : [],
        ...!selectedAdGroup ? [{
            ...adGroupColumn,
            locked: true,
            width: '250px',
            render: (adGroup, item) => (
                <Link
                    title={item.adGroupName}
                    onClick={() => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    })}
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}>
                    {item.adGroupName}
                </Link>
            )

        }] : [],
        {
            ...statusColumn,
            locked: true,
        },
        impressionsColumn,
        clicksColumn,
        ctrColumn,
        adSpendColumn,
        cpcColumn,
        adSalesColumn,
        acosColumn,
        adCvrColumn,
        cpaColumn,
        adOrdersColumn,
        adUnitsColumn,
        roasColumn,
        salesShareColumn,
        budgetAllocationColumn,
        adProfitColumn
    ]

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default ProductAdsList
