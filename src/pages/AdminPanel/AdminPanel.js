import React, {useState} from "react";
import {Input, Table} from "antd";
import './AdminPanel.less';
import {adminServices} from "../../services/admin.services";
import moment from "moment";

const AdminPanel = () => {
    const [userInformation, setUserInformation] = useState(undefined);
    const [accountLinks, setAccountLinks] = useState(undefined);
    const [optimizationJobs, setOptimizationJobs] = useState(undefined);
    // const [productInformation, setProductInformation] = useState(undefined);
    const [fields, setFields] = useState({});

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkUserEmail = (e) => {
        e.preventDefault();

        adminServices.checkUserEmail(fields.email)
            .then(res => {
                setUserInformation(res.data.user);
                checkAccountLinks(res.data.user.id);
                checkOptimizationJobs(res.data.user.id);
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data) {
                    setUserInformation(error.response.data.message);
                }
            })
    };

    const checkAccountLinks = (id) => {
        adminServices.checkAccountLinks(id)
            .then(res => {
                setAccountLinks(res.data['linked-accounts']);
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data) {
                    setAccountLinks(error.response.data.message);
                }
            })
    };

    const checkOptimizationJobs = (id) => {
        adminServices.checkOptimizationJobs(id)
            .then(res => {
                setOptimizationJobs(res.data);
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data) {
                    setOptimizationJobs(error.response.data.message);
                }
            })
    };

    // const checkProductByAsin = (asin) => {
    //     adminServices.checkProductByAsin({
    //         asin,
    //         user_id: userInformation[0].id,
    //         marketplace_id: accountLinks[0].marketplace_id
    //     })
    //         .then(res => {
    //             setProductInformation(res.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             if (error.response && error.response.data) {
    //                 setProductInformation(error.response.data.message);
    //             }
    //         })
    // };

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
            title: 'Email verified',
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            render: (date) => (date !== null &&
                <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        },
        {
            title: 'Trial ends',
            dataIndex: 'trial_ends_at',
            key: 'trial_ends_at',
            render: (date) => (date !== null ?
                <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span> :
                <span>Ended</span>)
        },

    ];

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
        // {
        //     title: 'MWS Expires',
        //     dataIndex: 'mws_expires_at',
        //     key: 'mws_expires_at',
        //     render: (date) => (date !== null &&
        //         <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        // },
        {
            title: 'PPC Status',
            dataIndex: 'lwa_last_checked_status',
            key: 'lwa_last_checked_status',
        },
        // {
        //     title: 'PPC Expires',
        //     dataIndex: 'lwa_expires_at',
        //     key: 'lwa_expires_at',
        //     render: (date) => (date !== null &&
        //         <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        // },
    ];

    const optimizationJobsColumns = [
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Optimization Strategy',
            dataIndex: 'optimization_strategy',
            key: 'optimization_strategy',
        },
        {
            title: 'Product Net Margin',
            dataIndex: 'product_margin',
            key: 'product_margin',
            render: (margin, item) => (item.product.product_margin)
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
            render: (margin, item) => (item.product.item_price)
        },
        // {
        //     title: '',
        //     dataIndex: 'action',
        //     key: 'action',
        //     render: (event, item) => (<button className={'btn default'} onClick={() => checkProductByAsin(item.product.asin)}>check product</button>)
        // },
        // {
        //     title: 'PPC Expires',
        //     dataIndex: 'lwa_expires_at',
        //     key: 'lwa_expires_at',
        //     render: (date) => (date !== null &&
        //         <span>{moment(date).format('MMM DD, YYYY')}<br/>{moment(date).format('HH:mm:ss')}</span>)
        // },
    ];

    return (
        <div className="admin-panel">
            <section className="user-information-section">
                <form className="form-group" onSubmit={checkUserEmail}>
                    <Input required
                           type="email"
                           placeholder={'User E-mail'}
                           name={'email'}
                           onChange={changeFieldHandler}
                    />
                    <button className={'btn default'}>Check</button>
                </form>

                {typeof userInformation === 'string' && <h2>{userInformation}</h2>}
                {typeof userInformation === 'object' && <Table
                    dataSource={[userInformation]}
                    columns={userInformationColumns}
                    pagination={false}
                    title={() => 'General User Information'}
                />}
            </section>


            {typeof userInformation === 'object' && <section className="account-links-section">
                <form className="form-group" onSubmit={e => {
                    e.preventDefault();
                    checkAccountLinks(fields.user_id);
                }}>
                    <Input
                        required
                        type="text"
                        placeholder={`User id: ${userInformation.id}`}
                        name={'user_id'}
                        onChange={changeFieldHandler}
                    />
                    <button className={'btn default'}>Check</button>
                </form>


                {typeof accountLinks === 'string' && <h2>{accountLinks}</h2>}
                {typeof accountLinks === 'object' && <Table
                    dataSource={accountLinks}
                    columns={accountLinksColumns}
                    pagination={false}
                    title={() => 'Account Links'}
                />}
            </section>}

            {typeof userInformation === 'object' && <section className="optimization-jobs-section">
                <form className="form-group" onSubmit={e => {
                    e.preventDefault();
                    checkOptimizationJobs(fields.user_id);
                }}>
                    <Input
                        required
                        type="text"
                        placeholder={`User id: ${userInformation.id}`}
                        name={'user_id'}
                        onChange={changeFieldHandler}
                    />

                    <button className={'btn default'}>Check</button>
                </form>


                {typeof optimizationJobs === 'string' && <h2>{optimizationJobs}</h2>}
                {typeof optimizationJobs === 'object' && <Table
                    dataSource={optimizationJobs}
                    columns={optimizationJobsColumns}
                    pagination={false}
                    title={() => 'Optimization Jobs'}
                />}
            </section>}

            {/*{productInformation !== undefined && <section className="optimization-jobs-section">*/}
            {/*    {typeof productInformation === 'string' && <h2>{productInformation}</h2>}*/}
            {/*    {typeof productInformation === 'object' && <Table*/}
            {/*        dataSource={optimizationJobs}*/}
            {/*        columns={optimizationJobsColumns}*/}
            {/*        pagination={false}*/}
            {/*        title={() => 'Optimization Jobs'}*/}
            {/*    />}*/}
            {/*</section>}*/}
        </div>
    )
};


export default AdminPanel;