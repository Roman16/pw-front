import React, {useEffect, useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import {columnList} from "../../Analytics/Campaigns/tableComponents/columnList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import TableFilters from "../../Analytics/components/TableFilters/TableFilters"
import Pagination from "../../../components/Pagination/Pagination"


export const AttachCampaigns = ({data, onChange}) => {
    const [campaigns, setCampaigns] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
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
            setCampaigns(result.data)
            setTotalSize(result.total_count)
        } catch (e) {

        }

        setProcessing(false)
    }

    const changePagination = (data) => {
        setRequestParams(prevState => ({
            ...prevState,
            ...data
        }))
    }

    const rowSelection = {
        onChange: (rowsList) => {
            onChange({campaignsId: rowsList})
        }
    }


    useEffect(() => {
        getCampaigns()
    }, [requestParams])

    return (<div className="attach-campaigns">
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
                rowKey="campaignId"
                dataSource={campaigns}
                columns={columnList().allColumns}
                loading={processing}
                fixedColumns={[0]}
                selectedRows={data.campaignsId}
                rowSelection={rowSelection}
            />

            <Pagination
                onChange={changePagination}
                page={requestParams.page}
                pageSizeOptions={[10, 30, 50]}
                pageSize={requestParams.pageSize}
                totalSize={totalSize}
                listLength={campaigns.length}
                processing={processing}
            />

        </div>
    </div>)
}