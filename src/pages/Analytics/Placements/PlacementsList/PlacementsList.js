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
                const advertisingGroup = advertisingOrder.map(advertisingKey => _.find(response, item => item.placementName === key && item.advertisingType === advertisingKey))

                return ({
                    advertisingGroup,
                    ..._.mapValues(_.find(response, {placementName: key}), (value, key) => _.reduce(advertisingGroup, (total, current) => {
                        return +total[key] + +current[key]
                    })),
                    placementName: key,
                })
            })
        } else {
            if (response.length > 0) {
                return Object.values(chartAreaKeys).map(key => _.find(response, {'placementName': key}))
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
            sorter: true,
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
                sorter: true,
                noTotal: true,
                locked: true,
            },
            {
                title: 'Bid Adjustment',
                dataIndex: 'bid_adjustment',
                key: 'bid_adjustment',
                width: '200px',
                sorter: true,
                locked: true,
                noTotal: true,
                render: () => <InputCurrency disabled/>
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
                moreActions={showGroupAdvertising ? <SegmentFilter placementSegment={placementSegment}/> : undefined}
                responseFilter={placementResponseFilter}
                expandedRowRender={showGroupAdvertising ? expandedRowRender : undefined}
            />
        </section>
    )
}


export default PlacementsList
