import React, {useState} from "react"
import {SVG} from "../../../utils/icons"
import {Input, Switch} from "antd"

const {Search} = Input
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
                <Search
                    className="search-field"
                    placeholder={'Search'}
                    onChange={e => changeSearchHandler(e.target.value)}
                    value={searchStr}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
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
