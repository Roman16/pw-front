import React, {useEffect, useState} from "react"
import {Input, Select} from "antd"
import './SelectSegment.less'
import {jungleScoutReportServices} from "../../../../services/jungle.scout.report.services"
import {adminServices} from "../../../../services/admin.services"
import CustomSelect from "../../../../components/Select/Select"
import {intervalEnums} from "../../../OptimizationRules/RuleSettings/CreateRulesWindow/RuleSettings"
import {AttributionWindowSelect} from "../../../AnalyticsV3/components/Header/AttributionWindow"
import _ from 'lodash'

const {Option} = Select
let fullUsersList = []

export const SelectSegment = ({onChangeId, onChangeAW, reportId, attributionWindow}) => {
    const [userList, setUserList] = useState([]),
        [segmentsList, setSegmentsList] = useState([]),
        [reportsList, setReportsList] = useState([]),

        [selectedUserId, setSelectedUserId] = useState(),
        [selectedSegmentId, setSelectedSegmentId] = useState()

    const getUserList = async () => {
        try {
            const res = await adminServices.fetchUsers(false)

            setUserList(res.result.slice(0, 10))
            fullUsersList = res.result
        } catch (e) {
            console.log(e)
        }
    }

    const getUserSegments = async () => {
        try {
            const {result} = await jungleScoutReportServices.getUserSegments(selectedUserId)
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


    useEffect(() => {
        getUserList()
    }, [])

    useEffect(() => {
        selectedUserId && getUserSegments()
    }, [selectedUserId])

    useEffect(() => {
        selectedSegmentId && getUserReports()
    }, [selectedSegmentId])


    return (<div className="select-segment-section">
        <div className={'form-group'}>
            <Select
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
            </Select>
        </div>

        <div className="form-group">
            <CustomSelect
                getPopupContainer={trigger => trigger.parentNode}
                placeholder={'Select a segment'}
                value={selectedSegmentId}
                onChange={setSelectedSegmentId}
                disabled={!selectedUserId}
            >
                {segmentsList.map(segment => <Option value={segment.id}>
                        {segment.name}
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
    </div>)
}