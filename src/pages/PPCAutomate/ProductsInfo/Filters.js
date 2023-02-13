import React, {useState} from "react"
import {Switch} from "antd"
import {SearchField} from "../../../components/SearchField/SearchField"

let timeoutId

const Filters = ({requestParams, onChangeFilter}) => {
    const [searchStr, setSearchStr] = useState(requestParams.searchStr)

    const changeSearchHandler = (value) => {
        setSearchStr(value)

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            onChangeFilter({searchStr: value})
        }, 500)
    }

    return (
        <div className="filters">
            <div className="form-group">
                <SearchField
                    placeholder={'Search'}
                    value={searchStr}
                    onSearch={changeSearchHandler}
                />
            </div>

            <div className='switch-block'>
                <Switch
                    checked={requestParams.onlyActive}
                    onChange={(e) => onChangeFilter({onlyActive: e})}
                />

                <label htmlFor="">
                    Show only active listings
                </label>
            </div>

            <div className='switch-block'>
                <Switch
                    checked={requestParams.onlyOptimization}
                    onChange={(e) => onChangeFilter({onlyOptimization: e})}
                />

                <label htmlFor="">
                    Products under optimization
                </label>
            </div>
        </div>
    )
}

export default Filters
