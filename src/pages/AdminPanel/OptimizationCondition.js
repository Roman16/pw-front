import React, {useState} from "react";
import {Input, Select, Table} from "antd";
import {adminServices} from "../../services/admin.services";

const Option = Select.Option;

const OptimizationCondition = ({adGroupsList,adGroupsCanBeOptimized, onCheck, userId, profileId}) => {
    const [fields, setFields] = useState({});
    const [patsList, setPatsList] = useState(undefined);
    const [keywordsList, setKeywordsList] = useState(undefined);

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

    const checkGroupsPats = (id) => {
        adminServices.checkPatsList({
            userId: fields.user_id || userId,
            profile_id: fields.profile_id,
            ad_groups_ids: id
        })
            .then(res => {
                if(res.data) {
                    setPatsList(res.data.pats)
                    setKeywordsList(res.data.keywords)
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setPatsList(error.response.data.message);
                }
            })
    }


    const columns = [
        {
            title: 'Ad Group ID',
            dataIndex: 'adGroupId',
            key: 'adGroupId',
        },
        {
            title: 'Ad Group Name',
            dataIndex: 'adGroupName',
            key: 'adGroupName',
        },
        {
            title: 'All SKU',
            dataIndex: 'allSKUs',
            key: 'allSKUs',
            render: (sku, adGroup) => (<Select defaultValue={adGroup.allSKUs[0]}>
                {adGroup.allSKUs.map(item => (
                    <Option value={item}>{item}</Option>
                ))}
            </Select>)
        },

        {
            title: '',
            dataIndex: 'adGroupId',
            key: 'adGroupId',
            render: (id) => (<button className={'btn default'} onClick={() => checkGroupsPats(id)}>Get PATs/Keywords</button>)
        },

    ];

    const columns2 = [
        {
            title: 'Ad Group ID',
            dataIndex: 'adGroupId',
            key: 'adGroupId',
        },
        {
            title: 'SKU',
            dataIndex: 'skus',
            key: 'skus',
            render: (sku, adGroup) => (<Select defaultValue={adGroup.skus[0]}>
                {adGroup.skus.map(item => (
                    <Option value={item}>{item}</Option>
                ))}
            </Select>)
        }
    ];

    const keywordsColumns = [
        {
            title: 'Keyword ID',
            dataIndex: 'keywordId',
            key: 'keywordId',
        },
        {
            title: 'Text',
            dataIndex: 'keywordText',
            key: 'keywordText',
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType',
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
        },
    ];
    const patsColumns = [
        {
            title: 'Keyword ID',
            dataIndex: 'keywordId',
            key: 'keywordId',
        },
        {
            title: 'Text',
            dataIndex: 'keywordText',
            key: 'keywordText',
        },
        {
            title: 'Match Type',
            dataIndex: 'matchType',
            key: 'matchType',
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
        },
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

            {typeof adGroupsList === 'string' && <h2>{adGroupsList}</h2>}
            {typeof adGroupsList === 'object' && <Table
                dataSource={adGroupsList}
                columns={columns}
                pagination={false}
                title={() => 'Ad Groups'}
            />}


            {typeof keywordsList === 'object' && <Table
                dataSource={keywordsList}
                columns={keywordsColumns}
                pagination={false}
                title={() => 'Keywords'}
            />}

            {typeof patsList === 'object' && <Table
                dataSource={patsList}
                columns={patsColumns}
                pagination={false}
                title={() => 'PATs'}
            />}

            {typeof adGroupsCanBeOptimized === 'string' && <h2>{adGroupsCanBeOptimized}</h2>}
            {typeof adGroupsCanBeOptimized === 'object' && <Table
                dataSource={adGroupsCanBeOptimized}
                columns={columns2}
                pagination={false}
                title={() => 'Ad Groups Can Be Optimized'}
            />}
        </section>
    )
};

export default OptimizationCondition;