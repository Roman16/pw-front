import React, {useState} from "react"
import {Input, Switch} from "antd"
import {SVG} from "../../utils/icons"

const {Search} = Input

let timeoutId

const ProductFilters = ({
                            pathname,
                            selectedAll,
                            selectedProduct,
                            onlyOptimization,
                            totalSize,
                            onSelectAll,
                            onSelectLastProduct,
                            onSearch,
                            onShowOnlyOnOptimization,
                            searchStr
                        }) => {

    const [search, setSearch] = useState(searchStr)

    const changeSearchHandler = (value) => {
        setSearch(value)

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            onSearch(value)
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
                {pathname !== '/ppc/scanner' && <div className="product-selected">
                    <div className="select-switch">
                        {pathname !== '/ppc/optimization' && <button
                            className={selectedAll && 'active'}
                            onClick={() => onSelectAll(true)}
                        >
                            <SVG id={'all-selected-icon'}/>
                        </button>
                        }
                        <button
                            className={!selectedAll && selectedProduct.id !== null && 'active'}
                            onClick={onSelectLastProduct}
                        >
                            <SVG id={'one-selected-icon'}/>
                        </button>
                    </div>

                    <span>
                        <b>{totalSize > 0 ? selectedAll ? totalSize : selectedProduct.id !== null ? '1' : '0' : '0'}</b> selected
                    </span>
                </div>
                }
                <div className="active-only">
                    <label htmlFor="">On optimization only</label>
                    <Switch
                        checked={onlyOptimization}
                        onChange={onShowOnlyOnOptimization}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductFilters
