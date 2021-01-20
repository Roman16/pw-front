import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import SegmentFilter from "./SegmentFilter"
import _ from 'lodash'
import {chartAreaKeys} from "../PlacementsStatistics/Chart"

const advertisingOrder = ['SponsoredProducts', 'SponsoredBrands'],
    advertisingTitle = {
        SponsoredProducts: 'Sponsored Products',
        SponsoredBrands: 'Sponsored Brands',
    }

const PlacementsList = ({location}) => {
    const {selectedCampaign, placementSegment, mainState} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        placementSegment: state.analytics.placementSegment,
        mainState: state.analytics.mainState
    }))

    const showGroupAdvertising = mainState.campaignId == undefined || mainState.campaignId == null


    const placementResponseFilter = (response) => {
        if (placementSegment === 'advertisingType' && showGroupAdvertising) {
            return Object.values(chartAreaKeys).map(key => {
                const advertisingGroup = advertisingOrder.map(advertisingKey => _.find(response, item => item.placementName === key && item.advertisingType && item.advertisingType === advertisingKey)).filter(item => item)

                const resultObj = {
                    advertisingGroup,
                    placementName: key,
                }

                _.forIn(_.find(response, {placementName: key}), function (value, key) {
                    if (key !== 'placementName') {
                        resultObj[key] = +advertisingGroup[0][key] + (advertisingGroup[1] ? +advertisingGroup[1][key] : 0)
                    }
                })

                resultObj.ctr = resultObj.impressions === 0 || resultObj.impressions == null ? null : resultObj.clicks / resultObj.impressions
                resultObj.cpc = resultObj.clicks === 0 || resultObj.clicks == null ? null : resultObj.cost / resultObj.clicks
                resultObj.acos = resultObj.attributedSales30d === 0 || resultObj.attributedSales30d == null ? null : resultObj.cost / resultObj.attributedSales30d
                resultObj.roas = resultObj.acos === 0 || resultObj.acos == null ? null : 1 / resultObj.acos
                resultObj.conversion_rate = resultObj.clicks === 0 || resultObj.clicks == null ? null : resultObj.attributedConversions30d / resultObj.clicks
                resultObj.cpa = resultObj.attributedConversions30d === 0 || resultObj.attributedConversions30d == null ? null : resultObj.cost / resultObj.attributedConversions30d

                return resultObj
            }).filter(item => item.advertisingGroup.length > 0)
        } else {
            if (response.length > 0) {
                return Object.values(chartAreaKeys).map(key => _.find(response, {'placementName': key}) || undefined).filter(item => item)
            } else {
                return []
            }
        }
    }

    const columns = [
        {
            title: 'Placement',
            dataIndex: 'placementName',
            key: 'placementName',
            width: '250px',
            sorter: false,
            locked: true,
            filter: true,
            render: (text) => <span title={text} className={'overflow-text'}>{text}</span>
        },
        ...selectedCampaign ? [
            {
                title: 'Campaign Bidding Strategy',
                dataIndex: 'bidding_strategy',
                key: 'bidding_strategy',
                width: '250px',
                sorter: false,
                noTotal: true,
                locked: true,
                render: (text) => <>
                    {text === 'legacyForSales' && 'Legacy For Sales'}
                    {text === 'autoForSales' && 'Auto For Sales'}
                    {text === 'manual' && 'Manual'}
                    {(text !== 'manual' && text !== 'autoForSales' && text !== 'legacyForSales') && text}
                </>
            },
            {
                title: 'Bid Adjustment',
                dataIndex: 'bid_adjustment',
                key: 'bid_adjustment',
                width: '150px',
                sorter: false,
                locked: true,
                noTotal: true,
                render: (bid_adjustment) => <InputCurrency disabled
                                                           value={bid_adjustment.length > 0 && bid_adjustment[0].filter(item => typeof item == 'number')[0]}/>
            }
        ] : [],
        {...impressionsColumn, sorter: false},
        {...clicksColumn, sorter: false},
        {...ctrColumn, sorter: false},
        {...adSpendColumn, sorter: false},
        {...cpcColumn, sorter: false},
        {...adSalesColumn, sorter: false},
        {...acosColumn, sorter: false},
        {...adCvrColumn, sorter: false},
        {...cpaColumn, sorter: false},
        {...adOrdersColumn, sorter: false},
        {...adUnitsColumn, sorter: false},
        {...roasColumn, sorter: false},
        {...salesShareColumn, sorter: false},
        {...budgetAllocationColumn, sorter: false},
    ]

    const expandedRowRender = (props) => {
        const columns = [
            {
                width: '250px',
                dataIndex: 'advertisingType',
                render: (text) => advertisingTitle[text]
            },
            ...selectedCampaign ? [
                {
                    width: '250px',
                },
                {
                    width: '200px',
                }
            ] : [],
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
            props.advertisingGroup && props.advertisingGroup.map(advertisingItem => (
                    <div>
                        {columns.map((item, index) => {
                                const fieldWidth = item.width ? ({width: item.width}) : {flex: 1}
                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {item.render(advertisingItem[item.dataIndex], advertisingItem)}
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    }

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
                location={location}
                searchField={false}
                moreActions={(showGroupAdvertising) ? <SegmentFilter placementSegment={placementSegment}/> : undefined}
                responseFilter={placementResponseFilter}
                expandedRowRender={(placementSegment === 'advertisingType' && showGroupAdvertising) ? expandedRowRender : undefined}
            />
        </section>
    )
}


export default PlacementsList
