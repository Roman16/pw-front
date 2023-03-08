import React, {useEffect, useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import {columnList} from "../../Analytics/Campaigns/tableComponents/columnList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import TableFilters from "../../Analytics/components/TableFilters/TableFilters"
import Pagination from "../../../components/Pagination/Pagination"


export const CampaignsList = ({list, totalSize, requestParams, attachedList, processing, onChangeRequestParams, onChangeAttachedList}) => {
    const changePagination = (data) => {
        onChangeRequestParams(data)
    }

    const changeFiltersHandler = (filters) => {
        onChangeRequestParams({
            page: 1,
            filters
        })
    }

    const rowSelection = {
        onChange: (rowsList) => {
            onChangeAttachedList(rowsList)
        }
    }


    return (<div className="attach-campaigns">
        <div className="filters">
            <TableFilters
                columns={columnList().columnsWithFilters}
                filters={requestParams.filters}
                locationKey={'campaigns'}
                searchField={true}
                onChange={changeFiltersHandler}
            />
        </div>

        <div className="table-block">
            <CustomTable
                key={'table'}
                rowKey="campaignId"
                dataSource={list}
                columns={columnList().allColumns.map(i => ({...i, sorter: false}))}
                loading={processing}
                fixedColumns={[0]}
                selectedRows={attachedList}
                rowSelection={rowSelection}
            />

            <Pagination
                onChange={changePagination}
                page={requestParams.page}
                pageSizeOptions={[10, 30, 50]}
                pageSize={requestParams.pageSize}
                totalSize={totalSize}
                listLength={list.length}
                processing={processing}
            />
        </div>
    </div>)
}