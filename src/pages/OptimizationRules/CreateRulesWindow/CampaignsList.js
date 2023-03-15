import React, {useEffect, useState} from "react"
import CustomTable from "../../../components/Table/CustomTable"
import {columnList} from "../../Analytics/Campaigns/tableComponents/columnList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import TableFilters from "../../Analytics/components/TableFilters/TableFilters"
import Pagination from "../../../components/Pagination/Pagination"
import _ from "lodash"
import {periodEnums} from "./RuleInformation"
import DateRange from "../../Analytics/components/DateRange/DateRange"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"

const ruleColumns = [
    {
        title: 'Rule name',
        key: 'name',
        dataIndex: 'name',
        search: true
    },

    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        render: (text) => <div className="description" title={text}>{text}</div>
    },
    {
        title: 'Optimization type',
        key: 'type',
        dataIndex: 'type',
        render: (type, item) => <div className="type">
            <span>{type}</span> {type === 'auto' && `• ${_.find(periodEnums, {key: item.period})?.title}`}</div>
    },

]

export const CampaignsList = ({list, totalSize, filters = true, requestParams, widthAttributionWindow = false, widthDateRange = true, attachedList, processing, onChangeRequestParams, onChangeAttachedList, location = 'campaigns'}) => {
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
        <div className="row">
            {filters && <div className="filters">
                <TableFilters
                    columns={location === 'campaigns' ? columnList().allColumns.map(i => ({
                        ...i,
                        sorter: false
                    })) : ruleColumns}
                    filters={requestParams.filters}
                    locationKey={location}
                    searchField={true}
                    onChange={changeFiltersHandler}
                />
            </div>}

            {widthAttributionWindow && <AttributionWindowSelect
                value={requestParams.attributionWindow}
                onChange={(attributionWindow) => changePagination({attributionWindow})}
            />}

            {widthDateRange && <DateRange
                tableOptions={{comparePreviousPeriod: false}}
                onChange={(startDate, endDate) => changePagination({selectedRangeDate: {startDate, endDate}})}
                selectedRangeDate={requestParams.selectedRangeDate}
            />}
        </div>
        <div className="table-block">
            <CustomTable
                key={'table'}
                rowKey={location === 'campaigns' ? "campaignId" : 'id'}
                dataSource={list}
                columns={location === 'campaigns' ? columnList().allColumns.map(i => ({
                    ...i,
                    sorter: false
                })) : ruleColumns}
                loading={processing}
                fixedColumns={[0]}
                selectedRows={attachedList === 'all' ? [] : attachedList}
                rowSelection={rowSelection}
                selectedAll={attachedList === 'all'}
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