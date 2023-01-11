import React, {useEffect, useState} from "react"
import CustomTable from "../../../../components/Table/CustomTable"
import {columns} from "./columns"
import {adminServices} from "../../../../services/admin.services"
import {Spin} from "antd"
import {userTypeEnums} from "../../../../constans/userTypeEnums"
import _ from 'lodash'
import {notification} from "../../../../components/Notification"


let dataFromRequest = []

export const Settings = () => {
    const [loading, setLoading] = useState(true),
        [submitProcessing, setSubmitProcessing] = useState(false),
        [updateDataRow, setUpdateDataRow] = useState(),
        [data, setData] = useState([]),
        [users, setUsers] = useState([])

    const getDataHandler = async () => {
        setLoading(true)

        try {
            const [settings, users] = await Promise.all([adminServices.getAgencyDashboardSettings(), adminServices.getUsers([userTypeEnums.ADMIN, userTypeEnums.ADVANCED_CLIENT])])

            dataFromRequest = [...settings.result]

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
                settings: updateDataRow.map(indexRow => ({
                    amazon_region_account_marketplace_id: data[indexRow].amazon_region_account_marketplace_id,
                    active: data[indexRow].active ? 1 : 0,
                    project_manager_id: data[indexRow].project_manager_id,
                    ppc_manager_id: data[indexRow].ppc_manager_id
                }))
            })

            notification.success({title: 'Success!'})
            setUpdateDataRow()
            dataFromRequest = [...data]
        } catch (e) {
            console.log(e)
        }

        setSubmitProcessing(false)
    }

    const onChangeHandler = (rowIndex, value) => {
        setData(prevState => prevState.map((i, index) => index === rowIndex ? {...i, ...value} : i))
        setUpdateDataRow((prevState = []) => [...new Set([...prevState, rowIndex])])
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

        <div className={`actions ${JSON.stringify(dataFromRequest) !== JSON.stringify(data) ? 'visible' : ''}`}>
            <button
                className="btn default"
                onClick={onSubmitHandler}
                disabled={submitProcessing}
            >
                Submit

                {submitProcessing && <Spin size={'small'}/>}
            </button>
        </div>
    </div>
}