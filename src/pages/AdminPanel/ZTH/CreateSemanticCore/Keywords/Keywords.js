import React, {useState} from "react"
import {columns} from "./allColumns"
import 'handsontable/dist/handsontable.full.css'
import ExcelTable from "../../../../../components/ExcelTable/ExcelTable"

const Keywords = ({semanticData, onChange}) => {

    const changeDataHandler = (data, key) => {
        onChange({
            ...semanticData,
            creator: {
                ...semanticData.creator,
                [key]: [...data]
            }
        })
    }

    return (<div className={'all-keywords'}>
        <div className="row cols-5">
            <div className="form-group">
                <label htmlFor="">Main keywords:</label>
                <ExcelTable
                    data={semanticData.creator.mainKeywords?.length > 0 ? semanticData.creator.mainKeywords : [{
                        text: '',
                        searchVolume: ''
                    }]}
                    columns={columns.mainKeywords}
                    onChange={(data) => changeDataHandler(data, 'mainKeywords')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="">Base keywords:</label>
                <ExcelTable
                    data={semanticData.creator.baseKeywords?.length > 0 ? semanticData.creator.baseKeywords : [{
                        text: '',
                        searchVolume: ''
                    }]}
                    columns={columns.baseKeywords}
                    onChange={(data) => changeDataHandler(data, 'baseKeywords')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Product negative phrases:</label>
                <ExcelTable
                    data={semanticData.creator.productNegativePhrases?.length > 0 ? semanticData.creator.productNegativePhrases : [{text: ''}]}
                    columns={columns.negativePhrases}
                    onChange={(data) => changeDataHandler(data, 'productNegativePhrases')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Product negative exacts:</label>
                <ExcelTable
                    data={semanticData.creator.productNegativeExacts?.length > 0 ? semanticData.creator.productNegativeExacts : [{text: ''}]}
                    columns={columns.negativeExacts}
                    onChange={(data) => changeDataHandler(data, 'productNegativeExacts')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Negative ASINs:</label>
                <ExcelTable
                    data={semanticData.creator.negativeASINs?.length > 0 ? semanticData.creator.negativeASINs : [{text: ''}]}
                    columns={columns.negativeAsins}
                    onChange={(data) => changeDataHandler(data, 'negativeASINs')}
                />
            </div>
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="">Global negative phrases:</label>*/}
            {/*    <ExcelTable*/}
            {/*        data={semanticData.creator.globalNegativePhrases?.length > 0 ? semanticData.creator.globalNegativePhrases : [{text: ''}]}*/}
            {/*        columns={columns.globalNegativePhrases}*/}
            {/*        onChange={(data) => changeDataHandler(data, 'globalNegativePhrases')}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="">Global negative exacts:</label>*/}
            {/*    <ExcelTable*/}
            {/*        data={semanticData.creator.globalNegativeExacts?.length > 0 ? semanticData.creator.globalNegativeExacts : [{text: ''}]}*/}
            {/*        columns={columns.globalNegativeExacts}*/}
            {/*        onChange={(data) => changeDataHandler(data, 'globalNegativeExacts')}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    </div>)
}

export default Keywords