import React, {useState} from "react"
import {unique, uniqueArrOfObj} from "../../../../utils/unique"
import {Radio, Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Popconfirm} from 'antd'

const KeywordsList = ({keywords, onUpdate, targetingType, createData, onValidate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null),
        [validationProcessing, setValidationProcessing] = useState(false),
        [defaultBid, setDefaultBid] = useState(1),
        [invalidDetails, setInvalidDetails] = useState()


    const addKeywordsHandler = async (e) => {
        e.preventDefault()
        setValidationProcessing(true)

        try {
            let keywordsList = [...newKeyword.split('\n')
                .filter(item => item !== '')
                .map(i => i.trim())
                .map(i => i.replace(/ +/g, ' '))
                .map(item => ({
                    keywordText: item,
                    matchType: keywordType,
                    calculatedBid: defaultBid
                }))
            ]

            const res = await onValidate({
                entityType: 'keywords',
                keywords: [...keywordsList.map(i => ({keywordText: i.keywordText, matchType: i.matchType}))]
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

            onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'broad'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'phrase'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'exact'), 'keywordText')])

            setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
            setValidKeywordsCount(validKeywords.length)

            setNewKeyword(invalidKeywords.map(i => i.keywordText).join('\n'))
        } catch (e) {
            console.log(e)
        }

        setValidationProcessing(false)
    }

    const changeBidHandler = (index, value) => {
        onUpdate(keywords.map((item, i) => {
            if (i === index) item.calculatedBid = value
            return item
        }))
    }

    const clearKeywordsListHandler = () => {
        onUpdate([])
    }

    const removeKeywordHandler = (index) => {
        onUpdate(keywords.filter((item, itemIndex) => itemIndex !== index))
    }

    const downloadReport = () => {
        let csv = 'Some keywords failed validation and couldn\'t be added. Here is why:\n'

        csv += "\n"

        invalidDetails.invalidDetails.forEach(function (row) {
            csv += row.details
            csv += "\n"
        })

        const hiddenElement = document.createElement('a')
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
        hiddenElement.target = '_blank'
        hiddenElement.download = 'keywords-validation-results.csv'
        hiddenElement.click()
    }

    return (
        <div className={`negative-keywords keyword-targetings`}>
            <div className="bid-block">
                <h3>Keywords</h3>

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
                        <label htmlFor="">Match type:</label>

                        <Radio.Group
                            value={keywordType}
                            onChange={({target: {value}}) => setKeywordType(value)}
                        >
                            <Radio value={'broad'}>
                                Broad
                            </Radio>

                            <Radio value={'phrase'}>
                                Phrase
                            </Radio>

                            <Radio value={'exact'}>
                                Exact
                            </Radio>
                        </Radio.Group>
                    </div>

                    <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value.toLowerCase())}
                                required
                                disabled={validationProcessing}
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        {invalidDetails && invalidDetails.invalidCount > 0 && <p className={'invalid-targetings'}>
                            {invalidDetails.invalidCount}/{invalidDetails.totalCount} {targetingType === '' ? 'keywords' : 'ASINs'} werent'
                            added. <button type={'button'} onClick={downloadReport}>Download report</button>
                        </p>}

                        <button className={'btn default p15 add'} disabled={validationProcessing}>
                            <SVG id={'plus-icon'}/>
                            Add Keywords

                            {validationProcessing && <Spin/>}
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                        {keywords.length > 0 &&
                        <button onClick={clearKeywordsListHandler} disabled={validationProcessing}>Remove All</button>}
                    </div>

                    <div className="keywords-list">
                        <div className="header">
                            <div>
                                Keywords
                            </div>

                            <div>
                                Match type
                            </div>

                            <div>
                                Bid
                            </div>
                        </div>

                        <ul>
                            {keywords.map((keyword, index) => (
                                <li>
                                    <div className="text">
                                        {keyword.keywordText}
                                    </div>

                                    <div className="type">
                                        {keyword.matchType === 'exact' ? 'Exact' : keyword.matchType === 'broad' ? 'Broad' : 'Phrase'}
                                    </div>

                                    <div className="value">
                                        <InputCurrency
                                            value={keyword.calculatedBid}
                                            onChange={value => changeBidHandler(index, value)}
                                        />
                                    </div>

                                    <button
                                        className={'btn icon'}
                                        onClick={() => removeKeywordHandler(index)}
                                        disabled={validationProcessing}
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

export default KeywordsList
