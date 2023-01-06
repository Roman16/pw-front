import React from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Select} from "antd"

const Option = Select.Option

export const columns = (users, onChange) => [
    {
        title: 'Account Name',
        dataIndex: 'marketplace_name',
        key: 'marketplace_name',
        render: (name, item) => <b>{name} <br/> {item.account_name}</b>
    },
    {
        title: 'Project Manager',
        dataIndex: 'project_manager_id',
        key: 'project_manager_id',
        width: '300px',
        render: (id, item) => <CustomSelect
            getPopupContainer={trigger => trigger}
            defaultValue={id}
            onChange={(value) => onChange({
                amazon_region_account_marketplace_id: item.amazon_region_account_marketplace_id,
                project_manager_id: value
            })}
        >
            <Option value={null}>No Manager</Option>

            {users.map(user => (
                <Option value={user.id}>
                    <b>{`${user.name} ${user.last_name}`}</b>
                    <br/>
                    {user.email}
                </Option>
            ))}
        </CustomSelect>
    },
    {
        title: 'PPC Manager',
        dataIndex: 'ppc_manager_id',
        key: 'ppc_manager_id',
        width: '300px',
        render: (id, item) => <CustomSelect
            getPopupContainer={trigger => trigger}
            defaultValue={id}
            onChange={(value) => onChange({
                amazon_region_account_marketplace_id: item.amazon_region_account_marketplace_id,
                ppc_manager_id: value
            })}
        >
            <Option value={null}>No Manager</Option>

            {users.map(user => (
                <Option value={user.id}>
                    <b>{`${user.name} ${user.last_name}`}</b>
                    <br/>
                    {user.email}
                </Option>
            ))}
        </CustomSelect>
    },
]