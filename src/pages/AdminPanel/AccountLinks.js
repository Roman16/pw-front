import React, {useState} from "react";
import {Input, Table} from "antd";
import moment from "moment";

const AccountLinks = ({data, onCheck, userId}) => {
    const [fields, setFields] = useState({});

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkAccountLinksByUserId = (e) => {
        e.preventDefault();

        onCheck({id: fields.user_id, type: 'user_id'})
    };
    const checkAccountLinksBySellerId = (e) => {
        e.preventDefault();

        onCheck({id: fields.seller_id, type: 'seller_id'})
    };

    const accountLinksColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Seller ID',
            dataIndex: 'seller_id',
            key: 'seller_id',
        },
        {
            title: 'Marketplace ID',
            dataIndex: 'marketplace_id',
            key: 'marketplace_id',
        },
        {
            title: 'MWS Status',
            dataIndex: 'mws_last_checked_status',
            key: 'mws_last_checked_status',
        },
        {
            title: 'MWS Last Checked',
            dataIndex: 'mws_last_checked_at',
            key: 'mws_last_checked_at',
            render: (date) => (date !== null &&
                <span> {moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
        {
            title: 'MWS Last Status',
            dataIndex: 'mws_last_status_streak',
            key: 'mws_last_status_streak',
        },
        {
            title: 'PPC Status',
            dataIndex: 'lwa_last_checked_status',
            key: 'lwa_last_checked_status',
        },
        {
            title: 'PPC Profile ID',
            dataIndex: 'lwa_profile_id',
            key: 'lwa_profile_id',
        },
        {
            title: 'PPC Last Checked',
            dataIndex: 'lwa_last_checked_at',
            key: 'lwa_last_checked_at',
            render: (date) => (date !== null &&
                <span> {moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
        {
            title: 'PPC Last Status',
            dataIndex: 'lwa_last_status_streak',
            key: 'lwa_last_status_streak',
        },
    ];

    return (
        <section className="account-links-section">
            <div className="fields">
                <form className={'form-group'} onSubmit={checkAccountLinksByUserId}>

                    <Input
                        required
                        type="text"
                        placeholder={`User id`}
                        name={'user_id'}
                        onChange={changeFieldHandler}
                    />

                    <button className={'btn default'}>Check</button>
                </form>

                <form className={'form-group'} onSubmit={checkAccountLinksBySellerId}>
                    <Input
                        required
                        type="text"
                        placeholder={`Seller id`}
                        name={'seller_id'}
                        onChange={changeFieldHandler}
                    />

                    <button className={'btn default'}>Check</button>
                </form>
            </div>

            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={accountLinksColumns}
                pagination={false}
                title={() => 'Account Links'}
                scroll={{x: true}}
            />}
        </section>
    )
};

export default AccountLinks;