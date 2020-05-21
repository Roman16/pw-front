import React from "react";
import {dateField, infoField, sorterByKeywordField} from './Tables/const';
import "./ReportTable.less";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";

const ReportTable = ({
                         reportsList,
                         processing,
                         paginationParams,
                         paginationChangeHandler,
                         sortChangeHandler,
                         columns,
                         sorterColumn,
                         addFilterHandler,
                         totalSize
                     }) => {

    return (
        <div className="ReportTable">
            <div className="content">
                <CustomTable
                    onChangeSorter={sortChangeHandler}
                    loading={processing}
                    dataSource={reportsList}
                    sorterColumn={sorterColumn}
                    columns={[
                        {...dateField},
                        ...columns,
                        {...infoField},
                        {...sorterByKeywordField(addFilterHandler)}
                    ]}
                    rowClassName={(item) => !item.viewed && 'new-report'}
                />
            </div>

            <Pagination
                onChange={paginationChangeHandler}
                page={paginationParams.page}
                pageSizeOptions={[10, 50, 100]}
                pageSize={paginationParams.pageSize}
                totalSize={totalSize}
                listLength={reportsList.length}
                processing={processing}
            />
        </div>
    );
}


export default React.memo(ReportTable);
