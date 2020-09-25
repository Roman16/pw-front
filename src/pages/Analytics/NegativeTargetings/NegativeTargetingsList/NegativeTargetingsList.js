import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"
import {adGroupColumn, campaignColumn} from "../../components/TableList/tableColumns"


const NegativeTargetingsList = () => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const columns = [
        {
            title: 'Keyword / PT',
            dataIndex: 'keyword_pt',
            key: 'keyword_pt',
            sorter: true,
            locked: true,
            search: true,
        },
        ...!selectedCampaign ? [campaignColumn] : [],
        ...!selectedAdGroup ? [adGroupColumn] : [],
        {
            title: 'Match type',
            dataIndex: 'match_type',
            key: 'match_type',
            sorter: true,
            locked: true,
        },
    ]

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                columnSelect={false}
            />
        </section>
    )
}

export default NegativeTargetingsList