import React from "react"
import {SVG} from "../../../utils/icons"
import {Input} from "antd"
import {Link} from "react-router-dom"

const {Search} = Input

export const Filters = ({sortType, onChangeSort, onChangeSearch}) => {

    return (
        <div className="filters">
            <div className="search form-group">
                <Search
                    className="search-field"
                    placeholder={'Search by account alias or seller id'}
                    onChange={e => onChangeSearch(e.target.value)}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>

            <div className={`sort ${sortType ? 'active' : ''}`} onClick={onChangeSort}>
                {sortType === 'desc' ?
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8334 14.9375L14.5 19M14.5 19L14.5 1M14.5 19L10.1667 14.9375" stroke="#6959AB"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 1H10" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 19H7" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 10H10" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    :
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8334 5.0625L14.5 1M14.5 1L14.5 19M14.5 1L10.1667 5.0625" stroke=""
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 19H10" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 1H7" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 10H10" stroke-width="2" stroke-linecap="round"/>
                    </svg>}

                <p>sort z→a</p>
            </div>

            <Link to={'/connect-amazon-account'} className="btn default">
                <PlusIcon/>

                Add Account
            </Link>
        </div>
    )
}

export const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.5V10M10 17.5V10M10 10H17.5M10 10H2.5" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
</svg>