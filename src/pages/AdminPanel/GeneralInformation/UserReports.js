import React, {useEffect, useState} from "react";
import {Input, Table} from "antd";
import moment from "moment";
import {actionField, dateField, infoField, reasonField} from "../../PPCAutomate/Report/ReportTable/Tables/const";
import DatePicker from "../../../components/DatePicker/DatePickerRange";

const UserReports = ({userReports, onCheck, userId}) => {
    const [fields, setFields] = useState({});
    const [reportsQueryParams, setReportsQueryParams] = useState({
        page: 1,
        size: 10,
        sorterColumn: null,
        sorterType: null
    });


    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const getUserReports = (e) => {
        onCheck({
            userId: fields.id || userId,
            ...reportsQueryParams
        });
    };

    const changeTableParamsHandler = (pagination, filters, sorter) => {
        setReportsQueryParams({
            ...reportsQueryParams,
            page: pagination.current,
            sorterColumn: sorter ? sorter.field : null,
            sorterType: sorter ? sorter.order === 'descend' ? 'desc' : 'asc' : null
        })
    }

    const timeRange = (start, end) => {
        if (start) {
            setReportsQueryParams({
                ...reportsQueryParams,
                startDate: start,
                endDate: end
            })
        } else {
            setReportsQueryParams({
                ...reportsQueryParams,
                startDate: 'lifetime',
                endDate: 'lifetime'
            })
        }
    };


    useEffect(() => {
        if (fields.id || userId) {
            getUserReports();
        }

    }, [reportsQueryParams, userId])

    const userInformationColumns = [
        {...dateField},
        {
            title: 'Object',
            dataIndex: 'object',
            key: 'object',
            width: '15.714285714285714rem',
            sorter: true,
            filter: true
        },
        {
            title: 'Object Type',
            dataIndex: 'object_type',
            key: 'object_type',
            width: '14.285714285714286rem',
            sorter: true,
            filter: true
        },
        {...actionField},
        {...reasonField},
        {...infoField},
    ];

    return (
        <section className="user-information-section">
            <h2>User Reports</h2>

            <form className="form-group" onSubmit={e => {
                e.preventDefault();
                getUserReports();
            }}>
                <Input required
                       type="text"
                       placeholder={userId ? `User id: ${userId}` : `User id`}
                       name={'id'}
                       onChange={changeFieldHandler}
                />

                <DatePicker
                    timeRange={timeRange}
                />

                <button className={'btn default'}>Check</button>
            </form>

            {typeof userReports === 'string' && <h2>{userReports}</h2>}

            {userReports && userReports.data && <Table
                dataSource={userReports.data}
                columns={userInformationColumns}
                pagination={{
                    pageSize: reportsQueryParams.size,
                    current: reportsQueryParams.page,
                    total: userReports.total_size
                }}

                onChange={changeTableParamsHandler}
            />}
        </section>

    )
};

export default UserReports;