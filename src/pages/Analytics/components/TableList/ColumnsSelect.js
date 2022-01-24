import React, {useState} from "react"
import {Checkbox, Input, Popover, Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import _ from "lodash"
import {analyticsAvailableMetricsList} from "../../componentsV2/MainMetrics/metricsList"
import {tabs} from "../../componentsV2/MainMetrics/MetricModal"
import {EmptyData, NoFoundData} from "../../../../components/Table/CustomTable"

const {Search} = Input

const ColumnsSelect = ({columns, columnsBlackList, onChangeBlackList}) => {
    const [visible, setVisible] = useState(false),
        [activeTab, setActiveTab] = useState('all'),
        [columnsState, setColumnsState] = useState(columns),
        [searchStr, setSearchStr] = useState('')


    const changeTabHandler = (tab) => {
        setActiveTab(tab)
        setSearchStr('')
    }

    const onSearch = (value) => {
        setSearchStr(value)
    }

    const columnsBySearch = columnsState
        .filter(i => {
            if (activeTab === 'all') return true
            else {
                const column = _.find(analyticsAvailableMetricsList, {key: i.key})
                return column ? column.tabs.includes(activeTab) : false
            }

        })
        .filter(i => {
            if (searchStr) {
                const metricName = i.title

                const searchTermWords = searchStr.toLowerCase().split(' ')
                const metricNameWords = metricName.toLowerCase().split(' ')

                return searchTermWords.every(searchTermWord => metricNameWords.some(metricWord => metricWord.includes(searchTermWord)))
            } else return true
        })

    return (
        <>
            <button className={'columns-select icon-btn'} onClick={() => setVisible(true)}>
                <i className={'btn icon'}>
                    <SVG id={'table-columns'}/>
                </i>
                columns
            </button>


            <ModalWindow
                footer={false}
                className={'order-columns-window'}
                destroyOnClose={true}
                visible={visible}
                handleCancel={() => setVisible(false)}
            >
                <div className="row">
                    <ul className={'tabs'}>
                        {tabs
                            .filter(i => i === 'all' || columns.some(column => {
                                const colDes = _.find(analyticsAvailableMetricsList, {key: column.key})
                                return colDes ? colDes.tabs.includes(i) : false
                            }))
                            .map(i => <li
                                onClick={() => changeTabHandler(i)}
                                className={activeTab === i && 'active'}
                            >
                                {i}
                            </li>)}
                    </ul>

                    <div className={'col'}>
                        <h3>Available metrics</h3>
                        <p>
                            You can reorder metrics using Drag and Drop!
                            Drag and Drop can only be used in "All" category and without any search filters
                        </p>

                        <div className="form-group">
                            <Search
                                className="search-field"
                                placeholder={'Search'}
                                value={searchStr}
                                onChange={e => onSearch(e.target.value)}
                                data-intercom-target='search-field'
                                suffix={<SVG id={'search'}/>}
                            />

                            <button className="btn transparent">
                                Select all
                            </button>
                        </div>

                        <div className="columns-list">
                            {columnsBySearch.length === 0 ?
                                <NoFoundData
                                    title={'No results found'}
                                    description={`We can’t find any item matching your search. <br/> Please try adjusting your search.`}
                                />
                                :
                                columnsBySearch.map(column => (
                                    <Checkbox
                                        disabled={column.locked}
                                        checked={!columnsBlackList.find(key => key === column.key)}
                                        // onChange={(e) => changeColumnHandler(e.target.checked, column.key)}
                                    >
                                        {column.title}

                                        <MoveIcon/>
                                    </Checkbox>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn transparent">
                        Reset to default
                    </button>

                    <button className="btn white">
                        Cancel
                    </button>

                    <button className="btn default">
                        Apply
                    </button>
                </div>
            </ModalWindow>
        </>
    )
}

const MoveIcon = () => <i>
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <g>
            <circle cx="5.5" cy="1.5" r="1.5"/>
            <circle cx="5.5" cy="8.5" r="1.5"/>
            <circle cx="5.5" cy="15.5" r="1.5"/>
            <circle cx="12.5" cy="1.5" r="1.5"/>
            <circle cx="12.5" cy="8.5" r="1.5"/>
            <circle cx="12.5" cy="15.5" r="1.5"/>
        </g>
    </svg>
</i>


export default React.memo(ColumnsSelect)
