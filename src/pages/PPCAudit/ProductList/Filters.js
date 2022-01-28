import React, {useState} from "react"
import {Input, Switch} from "antd"
import {SVG} from "../../../utils/icons"

const {Search} = Input

let timeoutId

const Filters = ({
                     totalSize,
                     requestParams,

                     onSearch
                 }) => {

    const [search, setSearch] = useState(requestParams.searchStr)
    const changeSearchHandler = (value) => {
        setSearch(value)

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            onSearch({searchStr: value})
        }, 500)
    }

    return (
        <div className="products-filters">
            <div className="form-group">
                <Search
                    className="search-field"
                    placeholder={'Search by product name, ASIN or SKU'}
                    onChange={e => changeSearchHandler(e.target.value)}
                    value={search}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>

            <div className="row">
                <div className="product-selected">
                    <div className="select-switch">
                        <button className={'active'}>
                            <SVG id={'one-selected-icon'}/>
                        </button>
                    </div>

                    <span>
                        <b>{totalSize > 0 ? '1' : '0'}</b> selected
                    </span>
                </div>

                {/*<div className="active-only">*/}
                {/*    <label htmlFor="">Scanned only</label>*/}
                {/*    <Switch*/}
                {/*        // checked={onlyOptimization}*/}
                {/*        // onChange={onShowOnlyOnOptimization}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Filters
