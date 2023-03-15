import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import moment from "moment"
import {AttributionWindowSelect} from "../../Analytics/components/Header/AttributionWindow"

export const List = ({attachedList, label, type, onChange}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: '',
            attributionWindow: '7',
            selectedRangeDate: {
                startDate: moment().add(-29, 'days').toISOString(),
                endDate: moment().toISOString()
            }
        })


    const getList = async () => {
        setProcessing(true)

        try {
            let arr = [],
                total = 0
            if (type === 'rules') {
                const {result} = await optimizationRulesServices.getRules(requestParams)
                arr = result.data
                total = result.total_count
            } else {
                const {result} = await optimizationRulesServices.getCampaigns(requestParams)
                arr = result.data
                total = result.total_count
            }

            setList(arr)
            setTotalSize(total)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const selectAllHandler = () => {
        onChange('all', totalSize)
    }

    const changeRequestParamsHandler = (data) => {
        setRequestParams(prevState => ({...prevState, ...data}))
    }

    const changeAttachedList = (list) => {
        onChange(list)
    }

    useEffect(() => {
        getList()
    }, [requestParams])

    useEffect(() => {
        onChange(attachedList, totalSize)
    }, [totalSize])

    return (<div className={`rules section type-${type}`}>
            <div className="row">
                <h2>{label}</h2>

                {type === 'campaigns' && <AttributionWindowSelect
                    value={requestParams.attributionWindow}
                    onChange={(attributionWindow) => changeRequestParamsHandler({attributionWindow})}
                />}
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
                requestParams={requestParams}
                location={type}
                filters={true}

                onChangeRequestParams={changeRequestParamsHandler}
                onChangeAttachedList={changeAttachedList}
            />
        </div>
    )
}