import React, {useState} from "react";
import {Input, Table} from "antd";
import moment from "moment";

const GeneralUserInformation = ({data, onCheck}) => {
    const [fields, setFields] = useState({});


    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkUserEmail = (e) => {
        e.preventDefault();

        onCheck(fields.email);
    };

    const userInformationColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Created',
            dataIndex: 'create_at',
            key: 'create_at',
            render: (date) => (date !== null &&
                <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
        {
            title: 'Last login',
            dataIndex: 'last_login_at',
            key: 'last_login_at',
            render: (date) => (date !== null &&
                <span> {moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
        {
            title: 'Last activity',
            dataIndex: 'last_activity_at',
            key: 'last_activity_at',
            render: (date) => (date !== null &&
                <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
    ];

    return(
        <section className="user-information-section">
            <h2>General User Information</h2>

            <form className="form-group" onSubmit={checkUserEmail}>
                <Input required
                       type="email"
                       placeholder={'User E-mail'}
                       name={'email'}
                       onChange={changeFieldHandler}
                />
                <button className={'btn default'}>Check</button>
            </form>

            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={[data]}
                columns={userInformationColumns}
                pagination={false}
            />}
        </section>

    )
};

export default GeneralUserInformation;