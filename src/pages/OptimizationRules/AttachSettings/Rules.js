import React, {useEffect, useState} from "react"
import {CampaignsList} from "../RuleSettings/CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"

export const Rules = ({attachedList, filters, onChangeAttachedList, onChangeFilters}) => {
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
            const {result} = await optimizationRulesServices.getRules({...requestParams, filters})

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
    }, [requestParams, filters])

    useEffect(() => {
        onChangeAttachedList(attachedList, totalSize)
    }, [totalSize])

    return (<div className={`rules section`}>
        <div className="row">
            <h2>Rules</h2>
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
            requestParams={{...requestParams, filters}}
            location={'rules'}
            filters={true}
            widthDateRange={false}

            onChangeRequestParams={data => setRequestParams(prevState => ({...prevState, ...data}))}
            onChangeAttachedList={onChangeAttachedList}
            onChangeFilters={onChangeFilters}
        />

    </div>)
}