import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import {columns} from "./columns"
import {adminServices} from "../../../../services/admin.services"
import {Spin} from "antd"
import {userTypeEnums} from "../../../../constans/userTypeEnums"
import _ from 'lodash'
import {notification} from "../../../../components/Notification"

export const Settings = () => {
    const [loading, setLoading] = useState(true),
        [submitProcessing, setSubmitProcessing] = useState(false),
        [updateData, setUpdateData] = useState(),
        [data, setData] = useState([]),
        [users, setUsers] = useState([])

    const getDataHandler = async () => {
        setLoading(true)

        try {
            const [settings, users] = await Promise.all([adminServices.getAgencyDashboardSettings(), adminServices.getUsers([userTypeEnums.ADMIN, userTypeEnums.ADVANCED_CLIENT])])

            setData(settings.result)
            setUsers(users.result)
        } catch (e) {

        }

        setLoading(false)
    }

    const onSubmitHandler = async () => {
        setSubmitProcessing(true)
        try {
            await adminServices.setAgencyDashboardSettings({
                settings: updateData.map(i => ({
                    amazon_region_account_marketplace_id: i.amazon_region_account_marketplace_id,
                    active: 1,
                    project_manager_id: i.project_manager_id === undefined ? _.find(data, {amazon_region_account_marketplace_id: i.amazon_region_account_marketplace_id}).project_manager_id : i.project_manager_id,
                    ppc_manager_id: i.ppc_manager_id === undefined ? _.find(data, {amazon_region_account_marketplace_id: i.amazon_region_account_marketplace_id}).ppc_manager_id : i.ppc_manager_id
                }))
            })

            notification.success({title: 'Success!'})
            setUpdateData()
        } catch (e) {
            console.log(e)
        }

        setSubmitProcessing(false)
    }

    const onChangeHandler = (value) => {
        if (_.findIndex(updateData, {amazon_region_account_marketplace_id: value.amazon_region_account_marketplace_id}) !== -1) {
            setUpdateData(prevState => prevState.map(i => i.amazon_region_account_marketplace_id === value.amazon_region_account_marketplace_id ? {...i, ...value} : i))
        } else {
            setUpdateData((prevState = []) => [...prevState, value])
        }
    }

    useEffect(() => {
        getDataHandler()
    }, [])

    return <div className={'settings-section'}>
        <div className="table-block">
            <CustomTable
                loading={loading}
                dataSource={data}
                columns={columns(users, onChangeHandler)}
            />
        </div>

        <div className={`actions ${updateData ? 'visible' : ''}`}>
            <button
                className="btn default"
                onClick={onSubmitHandler}
                disabled={submitProcessing || !updateData}
            >
                Submit

                {submitProcessing && <Spin size={'small'}/>}
            </button>
        </div>
    </div>
}