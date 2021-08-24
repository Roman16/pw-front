import React, {useState} from "react"
import {columns} from "./allColumns"
import 'handsontable/dist/handsontable.full.css'
import {
    DataSheetGrid,
    textColumn,
    keyColumn,
} from 'react-datasheet-grid'
import ExcelTable from "../../../../../components/ExcelTable/ExcelTable"

const Keywords = ({semanticData, onChange}) => {
    const [grid, setGrid] = useState([
        [
            {readOnly: true, value: '', width: '50px'},
            {value: 'A', readOnly: true,},
            {value: 'B', readOnly: true, width: '20%'},
        ],
        [
            {readOnly: true, value: 1},
            {value: 1},
            {value: 3},
        ],
        [
            {readOnly: true, value: 2},
            {value: 2},
            {value: 4},
        ],
        [
            {readOnly: true, value: 3},
            {value: 1},
            {value: 3},
        ],
        [
            {readOnly: true, value: 4},
            {value: 2},
            {value: 4},
        ],
    ])
    const [data, setData] = useState([
        {active: true, firstName: 'Elon', lastName: 'Musk'},
        {active: false, firstName: 'Jeff', lastName: 'Bezos'},
    ])

    // const changeDataHandler = (name, field, value, index) => {
    //     const newData = [...semanticData.creator[name]]
    //     newData[index] = {
    //         ...newData[index],
    //         [field]: value
    //     }
    //
    //     onChange({
    //         ...semanticData,
    //         creator: {
    //             ...semanticData.creator,
    //             [name]: [...newData]
    //         }
    //     })
    // }

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
        <div className="row main-keywords-row">
            <div className="form-group">
                <label htmlFor="">Main keywords:</label>
                <ExcelTable
                    data={semanticData.creator.mainKeywords.length > 0 ? semanticData.creator.mainKeywords : [{text: '', searchVolume: ''}]}
                    columns={columns.mainKeywords}
                    onChange={(data) => changeDataHandler(data, 'mainKeywords')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="">Base keywords:</label>
                <ExcelTable
                    data={[...semanticData.creator.baseKeywords, {text: '', searchVolume: ''}]}
                    columns={columns.baseKeywords}
                    onChange={(data) => changeDataHandler(data, 'baseKeywords')}
                />
            </div>
        </div>

        {/*<div className="row cols-5">*/}
        {/*    <div className="form-group">*/}
        {/*        <label htmlFor="">Product negative phrases:</label>*/}
        {/*        <CustomTable*/}
        {/*            columns={allColumns.negativePhrases}*/}
        {/*            dataSource={[...semanticData.creator.productNegativePhrases, {text: ''}]}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="form-group">*/}
        {/*        <label htmlFor="">Product negative exacts:</label>*/}
        {/*        <CustomTable*/}
        {/*            columns={allColumns.negativeExacts}*/}
        {/*            dataSource={[...semanticData.creator.productNegativeExacts, {text: ''}]}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="form-group">*/}
        {/*        <label htmlFor="">Negative ASINs:</label>*/}
        {/*        <CustomTable*/}
        {/*            columns={allColumns.negativeAsins}*/}
        {/*            dataSource={[...semanticData.creator.negativeASINs, {text: ''}]}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="form-group">*/}
        {/*        <label htmlFor="">Global negative phrases:</label>*/}
        {/*        <CustomTable*/}
        {/*            columns={allColumns.globalNegativePhrases}*/}
        {/*            dataSource={[...semanticData.creator.globalNegativePhrases, {text: ''}]}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div className="form-group">*/}
        {/*        <label htmlFor="">Global negative exacts:</label>*/}
        {/*        <CustomTable*/}
        {/*            columns={allColumns.globalNegativeExacts}*/}
        {/*            dataSource={[...semanticData.creator.globalNegativeExacts, {text: ''}]}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>)
}

export default Keywords