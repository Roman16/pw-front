import React from "react"
import {DataSheetGrid} from "react-datasheet-grid"

const ExcelTable = ({data, columns, onChange, createRow, duplicateRow}) => {

    return (
        <DataSheetGrid
            data={data}
            onChange={onChange}
            columns={columns}
            height={300}
            rowHeight={28}
            // lockRows={true}
            autoAddRow={true}
            createRow={createRow}
            duplicateRow={duplicateRow}
        />
    )
}

export default ExcelTable