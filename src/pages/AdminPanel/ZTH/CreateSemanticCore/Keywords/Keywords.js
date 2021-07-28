import React from "react"
import CustomTable from "../../../../../components/Table/CustomTable"
import {columns} from "./allColumns"

const Keywords = ({semanticData}) => {
    const allColumns = columns()

    return (<div className={'all-keywords'}>
        <div className="row cols-5">
            <div className="form-group">
                <label htmlFor="">Main keywords:</label>

                <CustomTable
                    columns={allColumns.mainKeywords}
                    dataSource={[...semanticData.creator.mainKeywords, {text: '', searchVolume: ''}]}
                />

            </div>
            <div className="form-group">
                <label htmlFor="">Base keywords:</label>
                <CustomTable
                    columns={allColumns.baseKeywords}
                    dataSource={[...semanticData.creator.baseKeywords, {text: '', searchVolume: ''}]}
                />
            </div>
        </div>

        <div className="row cols-5">
            <div className="form-group">
                <label htmlFor="">Product negative phrases:</label>
                <CustomTable
                    columns={allColumns.negativePhrases}
                    dataSource={[...semanticData.creator.productNegativePhrases, {text: ''}]}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Product negative exacts:</label>
                <CustomTable
                    columns={allColumns.negativeExacts}
                    dataSource={[...semanticData.creator.productNegativeExacts, {text: ''}]}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Negative ASINs:</label>
                <CustomTable
                    columns={allColumns.negativeExacts}
                    dataSource={[...semanticData.creator.negativeASINs, {text: ''}]}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Global negative phrases:</label>
                <CustomTable
                    columns={allColumns.negativeExacts}
                    dataSource={[...semanticData.creator.globalNegativePhrases, {text: ''}]}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Global negative exacts:</label>
                <CustomTable
                    columns={allColumns.negativeExacts}
                    dataSource={[...semanticData.creator.globalNegativeExacts, {text: ''}]}
                />
            </div>
        </div>
    </div>)
}

export default Keywords