import React from "react"
import CustomTable from "../../../components/Table/CustomTable"

const columns = []


export const TopCampaigns = ({
                                 fetching,
                                 data
                             }) => {


    return (<div className="table-block">
        <CustomTable
            loading={fetching}
            dataSource={data}

            columns={columns}

            fixedColumns={[0]}
        />

    </div>)
}