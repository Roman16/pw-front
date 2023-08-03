import React from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import {columnList} from "../../../Analytics/Campaigns/tableComponents/columnList"
import TableFilters from "../../../Analytics/components/TableFilters/TableFilters"
import Pagination from "../../../../components/Pagination/Pagination"
import _ from "lodash"
import {advertisingTypeEnums, periodEnums} from "./RuleInformation"
import DateRange from "../../../Analytics/components/DateRange/DateRange"
import {AttributionWindowSelect} from "../../../Analytics/components/Header/AttributionWindow"
import {tabs} from "../RuleDetails/Attach"

const ruleColumns = [
    {
        title: 'Rule',
        key: 'name',
        dataIndex: 'name',
        search: true,
        render: text => <div title={text} className="cut-text">{text}</div>
    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        render: (text) => <div className="description" title={text}>{text}</div>
    },
    {
        title: 'Advertising Type',
        key: 'advertising_type',
        dataIndex: 'advertising_type',
        render: (value) => <div className="description" title={ _.find(advertisingTypeEnums, {key: value}).title}>{ _.find(advertisingTypeEnums, {key: value}).title}</div>
    },
    {
        title: 'Rule Type',
        key: 'rule_entity_type',
        dataIndex: 'rule_entity_type',
        render: value => value ? value === 'product_ads' ? 'Product Ads' : 'Targetings' : ''
    },
    {
        title: 'Optimization type',
        key: 'type',
        dataIndex: 'type',
        render: (type, item) => <div className="type">
            <span>{type}</span> {type === 'auto' && `• ${_.find(periodEnums, {key: item.period})?.title}`}</div>
    },

]

export const CampaignsList = ({
                                  list,
                                  totalSize,
                                  filters = true,
                                  requestParams,
                                  widthAttributionWindow = false,
                                  widthDateRange = true,
                                  selectAllBtn = false,
                                  attachedList,
                                  processing,
                                  onChangeRequestParams,
                                  onChangeAttachedList,
                                  onChangeFilters,
                                  onChangeDateRange,
                                  location = 'campaigns',
                                  activeTab,
                                  pageSizeOptions,
                                  attachedListFromRequest,
                                  totalAttached
                              }) => {

    const changePagination = (data) => {
        if (data.selectedRangeDate && onChangeDateRange) {
            onChangeDateRange({...data.selectedRangeDate})
        }

        onChangeRequestParams(data)
    }

    const changeFiltersHandler = (filters) => {
        onChangeRequestParams({
            page: 1,
            filters
        })

        onChangeFilters && onChangeFilters(filters)
    }

    const cancelAllSelectedHandler = () => {
        onChangeAttachedList(attachedListFromRequest, attachedListFromRequest, [])
    }

    const rowSelection = {
        onChange: (rowsList, attachList, detachList) => {
            onChangeAttachedList(rowsList, attachList, detachList)
        }
    }

    const selectAllHandler = () => {
        onChangeAttachedList('all')
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

            {selectAllBtn && <div className="select-all-block">
                {activeTab === tabs[0] ? attachedList === 'all' ?
                    <p><b>All {totalSize}</b> deselected <button className={'select-all-btn'}
                                                               onClick={cancelAllSelectedHandler}>(Cancel)</button></p>
                    :
                    <p><b>{totalSize - attachedList.length}</b> deselected {(totalSize > 1) && <>(
                        <button className={'select-all-btn'} onClick={selectAllHandler}>or deselect
                            all {totalSize}</button>
                        )</>}
                    </p>
                    :
                    attachedList === 'all' ?
                        <p><b>All {totalSize}</b> selected <button className={'select-all-btn'}
                                                                   onClick={cancelAllSelectedHandler}>(Cancel)</button>
                        </p>
                        :
                        <p><b>{attachedList.length}</b> selected {(totalSize > 1) && <>(
                            <button className={'select-all-btn'} onClick={selectAllHandler}>or select
                                all {totalSize}</button>
                            )</>}
                        </p>}
            </div>}
        </div>


        <div className="table-block">
            <CustomTable
                key={'table'}
                rowKey={location === 'campaigns' ? "campaignId" : 'id'}
                dataSource={list}
                columns={location === 'campaigns' ? columnList().allColumns.map(i => {

                    if (i.uniqueIndex === 'campaignName') {
                        i = {
                            title: 'Campaign',
                            dataIndex: 'name',
                            key: 'name',
                            uniqueIndex: 'campaignName',
                            width: '350px',
                            locked: true,
                            filter: true,
                            search: true,
                            render: (campaign) => <div
                                className={'state-link'}
                                title={campaign}
                            >
                                {campaign}
                            </div>
                        }
                    }

                    return ({
                        ...i,
                        sorter: false
                    })
                }) : ruleColumns}
                loading={processing}
                fixedColumns={[0]}
                selectedRows={(attachedList === 'all' && activeTab === tabs[0]) ? [] : attachedList === 'all' ? list.map(i => i[location === 'campaigns' ? "campaignId" : 'id']) : attachedList.filter(i => _.find(list, {[location === 'campaigns' ? "campaignId" : 'id']: i}))}
                rowSelection={rowSelection}
                selectedAll={attachedList === 'all' && activeTab !== tabs[0]}
            />

            <Pagination
                onChange={changePagination}
                page={requestParams.page}
                pageSizeOptions={pageSizeOptions || [10, 30, 50]}
                pageSize={requestParams.pageSize}
                totalSize={totalSize}
                listLength={list.length}
                processing={processing}
            />
        </div>
    </div>)
}