import React, {useState} from "react";
import {Input, Table} from "antd";

const OptimizationCondition = ({data, onCheck, userId, profileId}) => {
    const [fields, setFields] = useState({});

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkOptimizationCondition = (e) => {
        e.preventDefault();

        onCheck({
            userId: fields.user_id || userId,
            profileId: fields.profile_id,
            sku: fields.sku
        })
    }

    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (sku, item) => (item.data && item.data[0])
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    return (
        <section>
            <h2>Optimization Conditions</h2>
            <div className="fields">
                <form className="form-group" onSubmit={checkOptimizationCondition}>
                    <Input
                        type="text"
                        name={'user_id'}
                        onChange={changeFieldHandler}
                        placeholder={userId ? `User id: ${userId}` : `User id`}
                    />

                    <Input
                        type="text"
                        name={'profile_id'}
                        onChange={changeFieldHandler}
                        placeholder={profileId ? `Profile id: ${profileId}` : `Profile id`}
                    />

                    <Input
                        type="text"
                        name={'sku'}
                        onChange={changeFieldHandler}
                        placeholder={`SKU`}
                    />

                    <button className={'btn default'}>Check</button>
                </form>
            </div>

            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />}
        </section>
    )
};

export default OptimizationCondition;