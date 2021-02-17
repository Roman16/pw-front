import React from "react"
import './AdGroupsList.less'
import TableList from "../../components/TableList/TableList"
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
    campaignColumn, statusColumn, renderNumberField, EditableField,
} from "../../components/TableList/tableColumns"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {analyticsActions} from "../../../../actions/analytics.actions"
import OpenCreateWindowButton from "../../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {Switch} from "antd"

const AdGroupsList = ({location}) => {
    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Active',
            dataIndex: 'state',
            key: 'state',
            width: '65px',
            noTotal: true,
            render: () => <div className="switch-block"><Switch/></div>
        },
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
                    onClick={() => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.name
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    })}
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
                onClick={() => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                })}
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
            render: (bid) => <EditableField
                type={'currency'}
                value={bid}
            />
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
        adSalesColumn,
        acosColumn,
        adCvrColumn,
        cpaColumn,
        adOrdersColumn,
        adUnitsColumn,
        roasColumn,
        salesShareColumn,
        budgetAllocationColumn,
        adProfitColumn,
    ]

    return (
        <section className={'ad-group-list list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0, 1]}
                location={location}
                moreActions={<OpenCreateWindowButton title={'Add Ad Group'} window={'adGroup'}/>}
                showRowSelection={true}
                rowKey={'adGroupId'}
            />
        </section>
    )
}

export default AdGroupsList
