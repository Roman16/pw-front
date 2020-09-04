import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import TableList from "../../components/TableList/TableList"


const columns = [
    {
        title: 'Keyword / PT',
        dataIndex: 'keyword_pt',
        key: 'keyword_pt',
        sorter: true,
    },
    {
        title: 'Match type',
        dataIndex: 'match_type',
        key: 'match_type',
        sorter: true
    },

]


const NegativeTargetingsList = () => {


    const sortChangeHandler = (column) => {
        console.log(column)
    }

    const paginationChangeHandler = (column) => {
        console.log(column)
    }

    return (
        <section className={'list-section'}>
            <TableFilters
                columns={columns}
            />

            <TableList
                sortChangeHandler={sortChangeHandler}
                data={[]}
                totalData={[]}
                columns={columns}
                paginationChangeHandler={paginationChangeHandler}
            />
        </section>
    )
}

export default NegativeTargetingsList