import React, {useState} from "react";
import {Input, Select, Table} from "antd";
import {adminServices} from "../../../services/admin.services";

const Option = Select.Option;

const OptimizationCondition = ({adGroupsList, adGroupsCanBeOptimized, onCheck, userId, profileId}) => {
    const [fields, setFields] = useState({});
    const [patsList, setPatsList] = useState(undefined);
    const [keywordsList, setKeywordsList] = useState(undefined);
    const [openedTable, setOpenedTable] = useState(null);

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const openTableHandler = (table) => {
        setOpenedTable(table)
    }

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
            profile_id: fields.profile_id || profileId,
            ad_groups_ids: id
        })
            .then(res => {
                if (res.data) {
                    setPatsList(res.data.pats)
                    setKeywordsList(res.data.keywords)
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setPatsList(error.response.data.message);
                    setKeywordsList(error.response.data.message);
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
            render: (id) => (
                <button className={'btn default'} onClick={() => checkGroupsPats(id)}>Get PATs/Keywords</button>)
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
            render: (sku, adGroup) => {
                return (<Select defaultValue={adGroup.skus[0]}>
                    {adGroup.skus.map(item => (
                        <Option value={item}>{item}</Option>
                    ))}
                </Select>)
            }
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
        <section className={'optimization-conditions'}>
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

            {adGroupsList && <div className="table-block">
                <h2 className="table-title" onClick={() => openTableHandler(openedTable === 'adGroups' ? null : 'adGroups')}>
                    {typeof adGroupsList === 'object' && adGroupsList.length > 0 ?
                        <i className={'success'}>&#10004;</i> :
                        <i className={'error'}>    &#10006;</i>}

                    Ad Groups
                </h2>
                {openedTable === 'adGroups' && <Table
                    dataSource={typeof adGroupsList === 'object' ? adGroupsList : []}
                    // dataSource={adGroupsList}
                    columns={columns}
                    pagination={false}
                />
                }
            </div>}

            {keywordsList && <div className="table-block">
                <h2 className="table-title" onClick={() => openTableHandler(openedTable === 'keywords' ? null : 'keywords')}>
                    {typeof keywordsList === 'object' && keywordsList.length > 0 ?
                        <i className={'success'}>&#10004;</i> :
                        <i className={'error'}>    &#10006;</i>}
                    Keywords
                </h2>

                {openedTable === 'keywords' && <Table
                    dataSource={typeof keywordsList === 'object' ? keywordsList : []}
                    columns={keywordsColumns}
                    pagination={false}
                />}
            </div>}

            {patsList && <div className="table-block">
                <h2 className="table-title" onClick={() => openTableHandler(openedTable === 'PATs' ? null : 'PATs')}>
                    {typeof patsList === 'object' && patsList.length > 0 ? <i className={'success'}>&#10004;</i> :
                        <i className={'error'}>    &#10006;</i>}
                    PATs
                </h2>

                {openedTable === 'PATs' && <Table
                    dataSource={typeof patsList === 'object' ? patsList : []}
                    columns={patsColumns}
                    pagination={false}
                />}
            </div>}

            {adGroupsCanBeOptimized && <div className="table-block">
                <h2 className="table-title" onClick={() => openTableHandler(openedTable === 'AdGroupsCanBeOptimized' ? null : 'AdGroupsCanBeOptimized')}>
                    {typeof adGroupsCanBeOptimized === 'object' && adGroupsCanBeOptimized.length > 0 ?
                        <i className={'success'}>&#10004;</i> :
                        <i className={'error'}>    &#10006;</i>}

                    Ad Groups Can Be Optimized
                </h2>

                {openedTable === 'AdGroupsCanBeOptimized' && <Table
                    dataSource={typeof adGroupsCanBeOptimized === 'object' ? adGroupsCanBeOptimized : []}
                    // dataSource={adGroupsCanBeOptimized}
                    columns={columns2}
                    pagination={false}
                />}
            </div>}
        </section>
    )
};

export default OptimizationCondition;