import {
    acosColumn, adCvrColumn, adOrdersColumn,
    adSalesColumn,
    adSpendColumn, adUnitsColumn, budgetAllocationColumn,
    clicksColumn, cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn, keywordPTColumn, matchTypeColumn, roasColumn, salesShareColumn, statusColumn
} from "../../components/TableList/tableColumns"
import React from "react"
import {Link} from "react-router-dom"
import InputCurrency from "../../../../components/Inputs/InputCurrency"

export const expandedRowRender = (props, showTargetingsColumns, setStateHandler, columnsBlackList) => {
    const columns = [
        {
            width: '400px',
            dataIndex: 'calculatedTargetingText',
            key: 'calculatedTargetingText',
            ...keywordPTColumn
        },
        ...showTargetingsColumns ? [
            {
                dataIndex: 'campaignName',
                width: '250px',
                render: (campaign, item) => (<Link
                    to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                    title={campaign}
                    className={'state-link'}
                    onClick={() => setStateHandler('ad-groups', {
                        name: {campaignName: item.campaignName},
                        campaignId: item.campaignId
                    })}
                >
                    {campaign}
                </Link>)
            },
            {
                dataIndex: 'adGroupName',
                width: '250px',
                render: (adGroup, item) => (
                    <Link
                        to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                        title={item.adGroupName}
                        className={'state-link'}
                        onClick={() => setStateHandler('products', {
                            name: {
                                campaignName: item.campaignName,
                                adGroupName: item.adGroupName
                            }, campaignId: item.campaignId, adGroupId: item.adGroupId
                        })}
                    >
                        {item.adGroupName}
                    </Link>
                )
            },
            {
                ...matchTypeColumn
            },
            {
                ...statusColumn
            },
            {
                dataIndex: 'calculatedBid',
                key: 'calculatedBid',
                width: '150px',
                render: (bid) => <InputCurrency disabled value={bid} type={'text'}/>
            }] : [],
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
    ]


    return (
        props.targetingsData && props.targetingsData.map(target => (
                <div>
                    {columns
                        .filter(column => !columnsBlackList.includes(column.key))
                        .map((item, index) => {
                            const fieldWidth = item.width ? ({width: item.width}) : {flex: 1}
                            return (
                                <div
                                    className={`table-body__field ${item.align || ''}`}
                                    style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                >
                                    {item.render && item.render(target[item.dataIndex], target)}
                                </div>
                            )
                        }
                    )}
                </div>
            )
        )
    )
}
