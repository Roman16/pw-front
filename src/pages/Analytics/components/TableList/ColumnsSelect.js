import React, {useState} from "react"
import {Checkbox, Input, Popover, Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import _ from "lodash"
import {analyticsAvailableMetricsList} from "../../componentsV2/MainMetrics/metricsList"
import {tabs} from "../../componentsV2/MainMetrics/MetricModal"

const {Search} = Input

const ColumnsSelect = ({columns, columnsBlackList, onChangeBlackList}) => {
    const [visible, setVisible] = useState(false),
        [activeTab, setActiveTab] = useState('all'),
        [columnsState, setColumnsState] = useState(columns)


    const changeTabHandler = (tab) => {
        setActiveTab(tab)
    }

    const onSearch = (value) => {
        // setColumnsState(columns.filter(column => column.title.toLowerCase().includes(value.toLowerCase())))
    }

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
                onClose={() => setVisible(false)}
            >
                <div className="row">
                    <ul className={'tabs'}>
                        {tabs.map(i => <li
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
                                onChange={e => onSearch(e.target.value)}
                                data-intercom-target='search-field'
                                suffix={<SVG id={'search'}/>}
                            />

                            <button className="btn transparent">
                                Select all
                            </button>
                        </div>

                        <div className="columns-list">
                            {columnsState.map(column => (
                                <Checkbox
                                    disabled={column.locked}
                                    checked={!columnsBlackList.find(key => key === column.key)}
                                    // onChange={(e) => changeColumnHandler(e.target.checked, column.key)}
                                >
                                    {column.title}
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

export default React.memo(ColumnsSelect)
