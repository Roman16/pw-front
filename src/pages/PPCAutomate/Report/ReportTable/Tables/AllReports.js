import React from 'react';
import {
    indexField,
    dateField,
} from './const';
import {useSelector} from 'react-redux';
import CustomTable from '../../../../../components/Table/CustomTable';


const AllReports = ({
                        data,
                        currentPage,
                        totalSize,
                        handlePaginationChange,
                        pageSize,
                        handleChangeSorter,
                        sorterColumn
                    }) => {
    const {loading} = useSelector(state => ({
        loading: state.reports.loading,
    }));

    const columns = [
        {
            ...indexField(currentPage, pageSize)
        },
        {
            ...dateField
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '200px' ,
            render: text => <span>{text}</span>,
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            render: text => <span>{text}</span>,
        },
    ];


    return (
        <div className="report-item-table">

            <CustomTable
                onChangePagination={handlePaginationChange}
                onChangeSorter={handleChangeSorter}
                loading={loading}
                dataSource={data}
                columns={columns}
                currentPage={currentPage}
                totalSize={totalSize}
                // heightTabBtn={heightTabBtn}
                showSizeChanger={true}
                pageSize={pageSize}
                sorterColumn={sorterColumn}
                rowClassName={(item) => !item.viewed && 'new-report'}
            />
        </div>
    );
};

export default AllReports;
