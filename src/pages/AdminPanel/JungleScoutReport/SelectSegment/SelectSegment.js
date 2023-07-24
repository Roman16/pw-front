import React, {useEffect, useState} from "react"
import {Select, Spin} from "antd"
import './SelectSegment.less'
import {jungleScoutReportServices} from "../../../../services/jungle.scout.report.services"
import {adminServices} from "../../../../services/admin.services"
import CustomSelect from "../../../../components/Select/Select"
import {AttributionWindowSelect} from "../../../AnalyticsV3/components/Header/AttributionWindow"
import _ from 'lodash'
import {NewSegmentWindow} from "./NewSegmentWindow"
import {notification} from "../../../../components/Notification"
import {SVG} from "../../../../utils/icons"
import {Popconfirm} from 'antd'
import {ConfirmDeleteWindow} from "./ConfirmDeleteWindow"

const {Option} = Select
let fullUsersList = []

export const SelectSegment = ({onChangeId, onChangeAW, reportId, attributionWindow}) => {
    const [userList, setUserList] = useState([]),
        [segmentsList, setSegmentsList] = useState([]),
        [accountsList, setAccountsList] = useState([]),
        [marketplacesList, setMarketplacesList] = useState([]),
        [reportsList, setReportsList] = useState([]),

        [selectedUserId, setSelectedUserId] = useState(),
        [selectedAccountId, setSelectedAccountId] = useState(),
        [selectedMarketplaceId, setSelectedMarketplaceId] = useState(),
        [selectedSegmentId, setSelectedSegmentId] = useState(),

        [visibleWindow, setVisibleWindow] = useState(false),
        [visibleDeleteWindow, setVisibleDeleteWindow] = useState(false),
        [saveProcessing, setSaveProcessing] = useState(false),

        [activeSegment, setActiveSegment] = useState({
            name: '',
            segment_id: ''
        })

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers(false)

            setUserList(res.result.slice(0, 10))
            fullUsersList = res.result
        } catch (e) {
            console.log(e)
        }
    }

    const getAccountsList = async () => {
        try {
            const {result} = await adminServices.fetchUserARA(selectedUserId)
            setAccountsList(result[selectedUserId] || [])
        } catch (e) {
            console.log(e)
        }
    }

    const getMarketplacesList = async () => {
        try {
            const {result} = await adminServices.fetchUserARAM(selectedAccountId)
            setMarketplacesList(result[selectedAccountId] || [])
        } catch (e) {
            console.log(e)
        }
    }

    const getUserSegments = async () => {
        try {
            const {result} = await jungleScoutReportServices.getUserSegments(selectedMarketplaceId)
            setSegmentsList(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getUserReports = async () => {
        try {
            const {result} = await jungleScoutReportServices.getUserReports(selectedSegmentId)
            setReportsList(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const searchHandler = (text) => {
        setSelectedUserId(undefined)

        if (text.length > 2) {
            setUserList(fullUsersList.filter(user => {
                return `${user.name} ${user.last_name}`.toLowerCase().indexOf(text.toLowerCase()) >= 0 || user.email.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }))
        } else {
            setUserList(fullUsersList.slice(0, 10))
        }
    }

    const onChange = (value) => {
        setSelectedUserId(value)
    }

    const addNewSegmentHandler = async () => {
        setSaveProcessing(true)

        try {
            await jungleScoutReportServices.addSegment({
                name: activeSegment.name,
                segment_id: activeSegment.segment_id,
                amazon_region_account_marketplace_id: selectedMarketplaceId
            })

            getUserSegments()

            setVisibleWindow(false)
            setActiveSegment({
                name: '',
                segment_id: ''
            })
            notification.success({title: 'Segment success added'})
        } catch (e) {
            console.log(e)
        }

        setSaveProcessing(false)
    }

    const updateSegmentHandler = async () => {
        setSaveProcessing(true)

        try {
            await jungleScoutReportServices.updateSegment(activeSegment)

            getUserSegments()

            setVisibleWindow(false)
            setActiveSegment({
                name: '',
                segment_id: ''
            })
            notification.success({title: 'Segment success updated'})
        } catch (e) {
            console.log(e)
        }

        setSaveProcessing(false)
    }

    const deleteSegmentHandler = async () => {
        setSaveProcessing(true)

        try {
            await jungleScoutReportServices.deleteSegment(activeSegment.id)
            getUserSegments()

            setVisibleDeleteWindow(false)
            setActiveSegment({
                name: '',
                segment_id: ''
            })
            notification.success({title: 'Segment success deleted'})
        } catch (e) {
            console.log(e)
        }

        setSaveProcessing(false)
    }

    const selectSegmentHandler = (event, segment, actionType) => {
        event.stopPropagation()

        setActiveSegment({
            name: segment.name,
            segment_id: segment.segment_id,
            id: segment.id
        })

        if (actionType === 'edit') {
            setVisibleWindow(true)
        } else {
            setVisibleDeleteWindow(true)
        }
    }

    useEffect(() => {
        getUserList()
    }, [])

    useEffect(() => {
        selectedUserId && getAccountsList()

        setSelectedAccountId()
        setSelectedMarketplaceId()
        setSelectedSegmentId()
        onChangeId()
    }, [selectedUserId])

    useEffect(() => {
        selectedAccountId && getMarketplacesList()

        setSelectedMarketplaceId()
        setSelectedSegmentId()
        onChangeId()
    }, [selectedAccountId])

    useEffect(() => {
        selectedMarketplaceId && getUserSegments()

        setSelectedSegmentId()
        onChangeId()
    }, [selectedMarketplaceId])

    useEffect(() => {
        selectedSegmentId && getUserReports()

        onChangeId()
    }, [selectedSegmentId])


    return (<div className="select-segment-section">
        <div className="row">
            <div className={'form-group'}>
                <CustomSelect
                    showSearch
                    placeholder="Select a user"
                    optionFilterProp={false}
                    onSearch={searchHandler}
                    filterOption={false}
                    onChange={onChange}
                    value={selectedUserId}
                >
                    {userList.map(user => (
                        <Option value={user.id}>
                            <b>{`${user.name} ${user.last_name}`}</b>
                            <br/>
                            {user.email}
                        </Option>
                    ))}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={'Select a user ARA'}
                    value={selectedAccountId}
                    onChange={setSelectedAccountId}
                    disabled={!selectedUserId}
                >
                    {accountsList.map(account => <Option value={account.id}>
                            <b>{account.alias}</b>
                            <br/>
                            {account.region}
                        </Option>
                    )}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={'Select a user ARAM'}
                    value={selectedMarketplaceId}
                    onChange={setSelectedMarketplaceId}
                    disabled={!selectedAccountId}
                >
                    {marketplacesList.map(account => <Option value={account.id}>
                            {account.marketplace_name}
                        </Option>
                    )}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={'Select a segment'}
                    value={selectedSegmentId}
                    onChange={setSelectedSegmentId}
                    disabled={!selectedMarketplaceId}
                    dropdownClassName={'segment-dropdown'}
                >
                    {segmentsList.map(segment => <Option value={segment.id}>
                            <div className={'name'}>{segment.name}</div>

                            <div className="report-actions">
                                <button className="btn icon" onClick={(e) => selectSegmentHandler(e, segment, 'edit')}>
                                    <SVG id={'edit-pen-icon'}/>
                                </button>

                                <button className="btn icon" onClick={(e) => selectSegmentHandler(e, segment, 'delete')}>
                                    <SVG id={'remove'}/>
                                </button>
                            </div>
                        </Option>
                    )}
                </CustomSelect>
            </div>

            <div className="form-group report">
                <CustomSelect
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={'Select a report'}
                    value={reportId}
                    onChange={(id) => onChangeId(id, _.find(reportsList, {id: id}).approved ? 'approved' : 'disapproved')}
                    disabled={!selectedSegmentId}
                >
                    {reportsList.map(report => <Option value={report.id}>
                            {report.year_month}

                            <div
                                title={report.approved ? 'approved' : 'not-approved'}
                                className={`status ${report.approved ? 'approved' : 'not-approved'}`}
                            />
                        </Option>
                    )}
                </CustomSelect>
            </div>

            <AttributionWindowSelect
                value={attributionWindow}
                onChange={onChangeAW}
            />
        </div>

        <button className={'btn default'} disabled={!selectedMarketplaceId || saveProcessing}
                onClick={() => setVisibleWindow(true)}>
            Add a new segment
            {saveProcessing && <Spin size={'small'}/>}
        </button>

        <NewSegmentWindow
            visible={visibleWindow}
            processing={saveProcessing}
            segment={activeSegment}

            onClose={() => setVisibleWindow(false)}
            onSave={activeSegment.id ? updateSegmentHandler : addNewSegmentHandler}
            onChange={(value) => setActiveSegment(prevState => ({...prevState, ...value}))}
        />

        <ConfirmDeleteWindow
            visible={visibleDeleteWindow}
            processing={saveProcessing}

            onClose={() => setVisibleDeleteWindow(false)}
            onConfirm={deleteSegmentHandler}
        />
    </div>)
}