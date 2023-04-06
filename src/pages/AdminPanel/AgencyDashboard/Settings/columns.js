import React from "react"
import CustomSelect from "../../../../components/Select/Select"
import {Select, Switch} from "antd"

const Option = Select.Option

export const columns = (users, onChange) => [
    {
        title: 'Account Name',
        dataIndex: 'marketplace_name',
        key: 'marketplace_name',
        render: (name, item) => <div className={'account-name'}>
            <div className="col">
                <span title={name}><b>{name}</b></span>
                <span title={item.account_name}><b>{item.account_name}</b></span>
                <span title={item.user_email}>{item.user_email}</span>
            </div>
        </div>
    },
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        width: '13rem',
        render: (value, item, rowIndex) => <div className={'switch-block'}>
            <span>Inactive</span>
            <Switch
                checked={value}
                onChange={checked => onChange(rowIndex, {active: checked})}
            />
            <span>Active</span>
        </div>
    },
    {
        title: 'Project Manager',
        dataIndex: 'project_manager_id',
        key: 'project_manager_id',
        width: '300px',
        render: (id, item, rowIndex) => <CustomSelect
            getPopupContainer={trigger => trigger}
            value={id}
            onChange={(value) => onChange(rowIndex, {project_manager_id: value})}
        >
            <Option value={null}><b>No Manager</b></Option>

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
        render: (id, item, rowIndex) => <CustomSelect
            getPopupContainer={trigger => trigger}
            value={id}
            onChange={(value) => onChange(rowIndex, {ppc_manager_id: value})}
        >
            <Option value={null}><b>No Manager</b></Option>

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
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        width: '300px',
        render: (comment, item, rowIndex) => <div className="form-group">
            <textarea
                value={comment}
                onChange={({target: {value}}) => onChange(rowIndex, {comment: value})}
            />
        </div>
    },
]