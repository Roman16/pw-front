import React, {useEffect, useState} from "react";
import {Input, Table} from "antd";
import Filters from "../../PPCAutomate/Report/Filters/Filters";
import {actionField, dateField, infoField, reasonField} from "../../PPCAutomate/Report/ReportTable/Tables/const";
import {adminServices} from "../../../services/admin.services";

let filtersChanges = false;

const Reports = ({userId}) => {
    const [reports, setReports] = useState([]);
    const [fields, setFields] = useState({});
    const [filters, setFilters] = useState([]);
    const [reportsQueryParams, setReportsQueryParams] = useState({
        page: 1,
        size: 10,
        sorterColumn: null,
        sorterType: null
    });

    const onCheck = (queryParams) => {
        adminServices.checkReports(queryParams)
            .then(res => {
                setReports(res)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const changeFiltersHandler = (filters) => {
        setFilters(filters);
        filtersChanges = true;
    }

    const getUserReports = (e) => {
        onCheck({
            userId: fields.id || userId,
            filters,
            ...fields.startDate && {startDate: fields.startDate, endDate: fields.endDate},
            ...reportsQueryParams,
            ...filtersChanges && {page: 1}
        });

        filtersChanges = false;
    };

    const changeTableParamsHandler = (pagination, filters, sorter) => {
        setReportsQueryParams({
            ...reportsQueryParams,
            page: pagination.current,
            sorterColumn: sorter ? sorter.field : null,
            sorterType: sorter ? sorter.order === 'descend' ? 'desc' : 'asc' : null
        })
    }

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
            filter: true
        },
        {
            title: 'Object Type',
            dataIndex: 'object_type',
            key: 'object_type',
            width: '14.285714285714286rem',
            filter: true
        },
        {...actionField},
        {...reasonField},
        {...infoField},
    ];

    return (
        <section className="user-information-section">
            <h2>User Reports</h2>

            <div className="form-group">
                <Input required
                       type="text"
                       placeholder={userId ? `User id: ${userId}` : `User id`}
                       name={'id'}
                       onChange={changeFieldHandler}
                />

                <Filters
                    filters={filters}
                    columns={[...userInformationColumns]}
                    currentTab={'all-reports'}
                    onChange={changeFiltersHandler}
                />

                <button className={'btn default'} onClick={getUserReports}>Check</button>
            </div>


            {typeof userReports === 'string' && <h2>{reports}</h2>}

            {reports && reports.data && <Table
                dataSource={reports.data}
                columns={userInformationColumns}
                pagination={{
                    pageSize: reportsQueryParams.size,
                    current: reportsQueryParams.page,
                    total: reports.total_size
                }}

                onChange={changeTableParamsHandler}
            />}
        </section>

    )
};

export default Reports;