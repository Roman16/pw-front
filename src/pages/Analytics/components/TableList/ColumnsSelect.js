import React, {useRef, useState} from "react"
import {Checkbox, Input} from "antd"
import {SVG} from "../../../../utils/icons"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import _ from "lodash"
import {analyticsAvailableMetricsList} from "../../componentsV2/MainMetrics/metricsList"
import {tabs} from "../../componentsV2/MainMetrics/MetricModal"
import {NoFoundData} from "../../../../components/Table/CustomTable"
import DraggableList from 'react-draggable-list'

const {Search} = Input

const ColumnsSelect = ({columns, columnsOrder, columnsBlackList, onChangeBlackList, onChangeColumnsOrder}) => {
    const [visible, setVisible] = useState(false)

    const closeHandler = () => {
        setVisible(false)
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
                handleCancel={() => setVisible(false)}
            >
                <WindowContent
                    columns={columns}
                    columnsOrder={columnsOrder}
                    columnsBlackList={columnsBlackList}

                    onChangeBlackList={onChangeBlackList}
                    onChangeColumnsOrder={onChangeColumnsOrder}

                    onClose={closeHandler}
                />
            </ModalWindow>
        </>
    )
}


const WindowContent = ({columns, columnsOrder, columnsBlackList, onChangeBlackList, onChangeColumnsOrder, onClose}) => {

    const [activeTab, setActiveTab] = useState('all'),
        [columnsState, setColumnsState] = useState([...columnsOrder.map(i => ({
            ..._.find(columns, {key: i})
        }))]),
        [searchStr, setSearchStr] = useState(''),
        [localBlackList, setLocalBlackList] = useState([...columnsBlackList])

    const _container = useRef(null)


    const changeTabHandler = (tab) => {
        setActiveTab(tab)
        setSearchStr('')
    }

    const onSearch = (value) => {
        setSearchStr(value)
    }

    const changeVisibleColumnHandler = (checked, key) => {
        if (checked) {
            setLocalBlackList(prevState => [...prevState.filter(i => i !== key)])
        } else {
            setLocalBlackList(prevState => [...prevState, key])
        }
    }

    const changeAllHandler = (key) => {
        if (key === 'select') setLocalBlackList([])
        else setLocalBlackList([...columns.filter(i => !i.locked).map(i => i.key)])
    }

    const setNewOrder = (list) => {
        setColumnsState([...columns.filter(i => i.locked), ...list])
    }

    const resetSettings = () => {
        setLocalBlackList([])
        setColumnsState([...columns])
    }

    const applyChangesHandler = () => {
        onChangeBlackList(localBlackList)
        onChangeColumnsOrder(columnsState.map(i => i.key))
        onClose()
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


    return (<>
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


                    {localBlackList.length > 0 ?
                        <button className="btn transparent" onClick={() => changeAllHandler('select')}>
                            Select all
                        </button>
                        :
                        <button className="btn transparent" onClick={() => changeAllHandler('deselect')}>
                            Deselect all
                        </button>}
                </div>

                <div
                    ref={_container}
                    className="columns-list">

                    {columnsBySearch.length === 0 ?
                        <NoFoundData
                            title={'No results found'}
                            description={`We can’t find any item matching your search. <br/> Please try adjusting your search.`}
                        />
                        :
                        searchStr || activeTab !== 'all' ?
                            columnsBySearch.map(item => <div className={`item disabled`}>
                                <Checkbox
                                    disabled={item.locked}
                                    checked={!localBlackList.find(key => key === item.key)}
                                    onChange={(e) => changeVisibleColumnHandler(e.target.checked, item.key)}
                                >
                                    {item.title}
                                </Checkbox>
                            </div>)
                            :
                            <>
                                {columnsBySearch
                                    .filter(i => i.locked)
                                    .map(item => <div className={`item disabled`}>
                                        <Checkbox
                                            disabled={true}
                                            checked={true}
                                        >
                                            {item.title}
                                        </Checkbox>
                                    </div>)}

                                <DraggableList
                                    disabled={true}
                                    itemKey="key"
                                    template={props => <ColumnItem {...props}
                                                                   localBlackList={localBlackList}
                                                                   onChange={changeVisibleColumnHandler}/>}
                                    list={columnsBySearch.filter(i => !i.locked)}

                                    onMoveEnd={setNewOrder}
                                    container={() => _container.current}
                                />
                            </>
                    }
                </div>
            </div>
        </div>

        <div className="actions">
            <button className="btn transparent" onClick={resetSettings}>
                Reset to default
            </button>

            <button className="btn white" onClick={onClose}>
                Cancel
            </button>

            <button className="btn default" onClick={applyChangesHandler}>
                Apply
            </button>
        </div>
    </>)
}

const ColumnItem = ({item, itemSelected, dragHandleProps, localBlackList, onChange}) => {
    const scale = itemSelected * 0.05 + 1
    const dragged = itemSelected !== 0

    return (<div
        className={`item ${dragged ? 'moved' : ''} `}
        {...dragHandleProps}
        style={{
            transform: `scale(${scale})`,
        }}>

        <Checkbox
            disabled={item.locked}
            checked={!localBlackList.find(key => key === item.key)}
            onChange={(e) => onChange(e.target.checked, item.key)}
        >
            {item.title}

            <MoveIcon/>
        </Checkbox>
    </div>)
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
