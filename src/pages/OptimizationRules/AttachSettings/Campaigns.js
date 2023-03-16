import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"


export const Campaigns = ({
                              attachedList,
                              filters,
                              attributionWindow,
                              selectedRangeDate,

                              onChangeFilters,
                              onChangeAttachedList,
                              onChangeAttributionWindow,
                              onChangeSelectedRangeDate
                          }) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
        })

    const getList = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getCampaigns({
                ...requestParams,
                filters,
                attributionWindow,
                selectedRangeDate
            })

            setList(result.data)
            setTotalSize(result.total_count)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const selectAllHandler = () => {
        onChangeAttachedList('all', totalSize)
    }

    useEffect(() => {
        getList()
    }, [requestParams, filters, attributionWindow, selectedRangeDate])

    useEffect(() => {
        onChangeAttachedList(attachedList, totalSize)
    }, [totalSize])

    return (<div className={`campaigns section `}>
        <div className="row">
            <h2>Campaigns</h2>

            <AttributionWindowSelect
                value={attributionWindow}
                onChange={onChangeAttributionWindow}
            />
        </div>

        <div className={`selected-count ${attachedList.length > 0 ? 'visible' : ''}`}>
            Selected <b>{attachedList === 'all' ? totalSize : attachedList.length}</b> (or <span
            onClick={selectAllHandler}>select all <b>{totalSize}</b></span>)
        </div>

        <CampaignsList
            attachedList={attachedList}
            list={list}
            processing={processing}
            totalSize={totalSize}
            requestParams={{...requestParams, filters, selectedRangeDate}}
            location={'campaigns'}
            filters={true}

            onChangeRequestParams={data => setRequestParams(prevState => ({...prevState, ...data}))}
            onChangeAttachedList={onChangeAttachedList}
            onChangeFilters={onChangeFilters}
            onChangeDateRange={onChangeSelectedRangeDate}
        />

    </div>)
}