import React, {useEffect, useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import {columnList} from "../../Analytics/Campaigns/tableComponents/columnList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import TableFilters from "../../Analytics/components/TableFilters/TableFilters"


export const CompareCampaigns = ({data, onChange}) => {
    const [campaigns, setCampaigns] = useState([]),
        [processing, setProcessing] = useState(true),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: ''
        })

    const getCampaigns = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getCampaigns(requestParams)
            setCampaigns(result.response)
        } catch (e) {

        }

        setProcessing(false)
    }

    useEffect(() => {
        getCampaigns()
    }, [requestParams])

    return (<div className="compare-campaigns">
        <div className="filters">
            <TableFilters
                columns={columnList().columnsWithFilters}
                filters={requestParams.filters}
                locationKey={'campaigns'}
                searchField={true}
            />
        </div>

        <div className="table-block">
            <CustomTable
                key={'table'}
                rowKey="id"
                dataSource={campaigns}
                columns={columnList().allColumns}
                loading={processing}
                fixedColumns={[0]}
                // rowSelection={rowSelection}
            />
        </div>
    </div>)
}