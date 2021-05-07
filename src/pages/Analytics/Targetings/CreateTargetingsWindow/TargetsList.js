import React, {useState} from "react"
import {unique, uniqueArrOfObj} from "../../../../utils/unique"
import {Radio} from "antd"
import {SVG} from "../../../../utils/icons"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Popconfirm} from 'antd'
import {Spin} from "antd/es"

const TargetsList = ({keywords, onUpdate, targetingType, createData, onValidate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('asins'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null),
        [validationProcessing, setValidationProcessing] = useState(false),
        [defaultBid, setDefaultBid] = useState(1),
        [invalidDetails, setInvalidDetails] = useState()


    const addKeywordsHandler = async (e) => {
        e.preventDefault()

        setValidationProcessing(true)

        try {
            const keywordsList = [...newKeyword.split('\n')
                .filter(item => item !== '')
                // .filter(item => item.length < 80)
                .map(i => i.trim())
                .map(i => i.replace(/ +/g, ' '))
                .map(item => ({
                    text: item,
                    type: keywordType,
                    calculatedBid: defaultBid
                }))
            ]

            const res = await onValidate({
                entityType: 'asins',
                asins: [...keywordsList.map(i => i.text)]
            })

            setInvalidDetails(res.result)

            let validKeywords = [],
                invalidKeywords = []

            if (res.result.invalidCount > 0) {
                res.result.invalidDetails
                    .forEach(i => {
                        invalidKeywords.push(keywordsList[i.entityRequestIndex])
                    })
                    .forEach(i => {
                        keywordsList.splice(i.entityRequestIndex, 1)
                    })
            }

            validKeywords = keywordsList

            onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'asins'), 'text'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'categories'), 'text')])

            setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
            setValidKeywordsCount(validKeywords.length)

            setNewKeyword(invalidKeywords.map(i => i.text).join('\n'))
        } catch (e) {
            console.log(e)
        }

        setValidationProcessing(false)
    }

    const clearKeywordsListHandler = () => {
        onUpdate([])
    }

    const removeKeywordHandler = (index) => {
        onUpdate(keywords.filter((item, itemIndex) => itemIndex !== index))
    }

    const downloadReport = () => {
        let csv = 'Some ASINs failed validation and couldn\'t be added. Here is why:\n'

        csv += "\n"

        invalidDetails.invalidDetails.forEach(function (row) {
            csv += row.details
            csv += "\n"
        })

        const hiddenElement = document.createElement('a')
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
        hiddenElement.target = '_blank'
        hiddenElement.download = 'asins-validation-results.csv'
        hiddenElement.click()
    }

    return (
        <div className={`negative-keywords keyword-targetings`}>
            <div className="bid-block">
                <h3>Product Targetings</h3>

                <div className="form-group row">
                    <label htmlFor="">Bid</label>
                    <InputCurrency
                        value={defaultBid}
                        onChange={(value) => setDefaultBid(value)}
                    />
                </div>
            </div>

            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                    <div className="row">
                        <label htmlFor="">Type:</label>

                        <Radio.Group
                            value={keywordType}
                            onChange={({target: {value}}) => setKeywordType(value)}
                            disabled={true}
                        >
                            <Radio value={'asins'}>
                                ASINs
                            </Radio>

                            <Radio value={'categories'}>
                                Categories
                            </Radio>
                        </Radio.Group>
                    </div>

                    <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value.toUpperCase())}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                                disabled={validationProcessing}
                            />
                    </div>

                    <div className="actions">
                        {invalidDetails && invalidDetails.invalidCount > 0 && <p className={'invalid-targetings'}>
                            {invalidDetails.invalidCount}/{invalidDetails.totalCount} {targetingType === '' ? 'keywords' : 'ASINs'} werent'
                            added. <button type={'button'} onClick={downloadReport}>Download report</button>
                        </p>}

                        <button className={'btn default p15 add'} disabled={validationProcessing}>
                            <SVG id={'plus-icon'}/>
                            Add

                            {validationProcessing && <Spin/>}
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> product targetings</div>
                        {keywords.length > 0 &&
                        <button onClick={clearKeywordsListHandler} disabled={validationProcessing}>Remove All</button>}
                    </div>

                    <div className="keywords-list">
                        <div className="header">
                            <div>
                                Product targetings
                            </div>

                            <div>
                                Type
                            </div>

                            <div>
                                Bid
                            </div>
                        </div>

                        <ul>
                            {keywords.map((keyword, index) => (
                                <li>
                                    <div className="text">
                                        {keyword.text}
                                    </div>

                                    <div className="type">
                                        {keyword.type === 'asins' ? 'ASINs' : 'Categories'}
                                    </div>

                                    <div className="value">
                                        <InputCurrency value={createData.calculatedBid}/>
                                    </div>


                                    <button
                                        className={'btn icon'}
                                        disabled={validationProcessing}
                                        onClick={() => removeKeywordHandler(index)}
                                    >
                                        <SVG id={'remove-filter-icon'}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TargetsList
