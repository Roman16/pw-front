import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {SearchField} from "../../../components/SearchField/SearchField"

export const List = ({attachedList, label, type, onChange}) => {
    const [list, setList] = useState([]),
        [processing, setProcessing] = useState(true),
        [totalSize, setTotalSize] = useState(0),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: ''
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


    const changeRequestParamsHandler = (data) => {
        setRequestParams(prevState => ({...prevState, ...data}))
    }

    const changeAttachedList = (list) => {
        onChange(list)
    }

    useEffect(() => {
        getList()
    }, [requestParams])

    return (<div className="rules section">
            <h2>{label}</h2>

            <div className="search-block">
                <SearchField
                    placeholder={type === 'campaigns' ? 'Search by campaign name' : 'Search by rule’s name'}
                    value={requestParams.searchStr}
                    onSearch={searchStr => changeRequestParamsHandler({searchStr, page: 1})}
                />
            </div>

            <CampaignsList
                attachedList={attachedList}
                list={list}
                processing={processing}
                totalSize={totalSize}
                requestParams={requestParams}
                location={type}
                filters={false}

                onChangeRequestParams={changeRequestParamsHandler}
                onChangeAttachedList={changeAttachedList}
            />
        </div>
    )
}