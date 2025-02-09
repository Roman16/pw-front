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
    impressionsColumn, RenderProduct,
    roasColumn,
    salesShareColumn, skuAsinColumn,
    statusColumn
} from "../../../components/TableList/tableColumns"
import TableList from "../../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../../actions/analytics.actions"

const ProductAdsList = ({location}) => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
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
        skuAsinColumn,
        ...!selectedCampaign ? [{
            ...campaignColumn,
            locked: true,
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
            locked: true,
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
                location={location}
                // moreActions={<OpenCreateWindowButton title={'Add Product Ads'} window={'productAds'}/>}
                // showRowSelection={true}
                rowKey={'adId'}
            />
        </section>
    )
}

export default ProductAdsList
