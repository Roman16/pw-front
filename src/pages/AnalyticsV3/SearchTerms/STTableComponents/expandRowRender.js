import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    CPMColumn,
    ctrColumn,
    ICVRColumn,
    impressionsColumn,
    keywordPTColumn,
    matchTypeColumn, ParentStatus,
    roasColumn,
    RPCColumn,
    RPIColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import React from "react"
import {Link} from "react-router-dom"
import InputCurrency from "../../../../components/Inputs/InputCurrency"

const location = 'searchTerms'

export const expandedRowRender = (props, showTargetingsColumns, setStateHandler, columnsBlackList, columnsOrder) => {
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
                render: (campaign, item) => (<div className={'state-link'}>
                    <ParentStatus status={item.campaignState}/>

                    <Link
                        to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                        title={campaign}
                        onClick={() => setStateHandler('ad-groups', {
                            name: {campaignName: item.campaignName},
                            campaignId: item.campaignId
                        })}
                    >
                        {campaign}
                    </Link></div>)
            },
            {
                dataIndex: 'adGroupName',
                width: '250px',
                render: (adGroup, item) => (<div className={'state-link'}>
                        <ParentStatus status={item.adGroupState}/>

                        <Link
                            to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                            title={item.adGroupName}
                            onClick={() => setStateHandler('products', {
                                name: {
                                    campaignName: item.campaignName,
                                    adGroupName: item.adGroupName
                                }, campaignId: item.campaignId, adGroupId: item.adGroupId
                            })}
                        >
                            {item.adGroupName}
                        </Link></div>
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
    ]


    return (
        props.targetingsData && props.targetingsData.map(target => (
                <div>
                    {columns
                        .filter(column => !columnsBlackList.includes(column.dataIndex))
                        .sort((firstColumn, secondColumn) => columnsOrder[location] ? columnsOrder[location].findIndex(i => i === firstColumn.dataIndex) - columnsOrder[location].findIndex(i => i === secondColumn.dataIndex) : true)
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
