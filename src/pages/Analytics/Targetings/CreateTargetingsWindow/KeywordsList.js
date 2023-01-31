import React, {useEffect, useState} from "react"
import {uniqueArrOfObj} from "../../../../utils/unique"
import {Checkbox, Popconfirm, Radio, Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import _ from 'lodash'

let allKeywords = []

const KeywordsList = ({keywords, onUpdate, targetingType, createData, onValidate, disabled}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null),
        [validationProcessing, setValidationProcessing] = useState(false),
        [defaultBid, setDefaultBid] = useState(createData.adGroupBid),
        [invalidDetails, setInvalidDetails] = useState(),
        [disabledBidField, setDisabledBidField] = useState(true)

    const addKeywordsHandler = async (e) => {
        e.preventDefault()

        try {
            let keywordsList = [...newKeyword.split('\n')
                .map(i => i.trim())
                .filter(item => item !== '')
                .map(i => i.replace(/ +/g, ' '))
                .map(item => ({
                    keywordText: item,
                    matchType: keywordType,
                    calculatedBid: defaultBid
                }))
            ]

            keywordsList = uniqueArrOfObj([...keywordsList], 'keywordText').filter(item => !_.find(keywords, {
                matchType: item.matchType,
                keywordText: item.keywordText
            }))

            allKeywords = [...keywordsList.map(i => ({...i}))]

            if (keywordsList.length === 0) {
                setNewKeyword('')
                return
            } else {
                setValidationProcessing(true)

                const res = await onValidate({
                    entityType: 'keywords',
                    keywords: [...keywordsList.map(i => ({keywordText: i.keywordText, matchType: i.matchType}))]
                })

                setInvalidDetails(res.result)

                let validKeywords = [],
                    invalidKeywords = []

                if (res.result.invalidCount > 0) {
                    res.result.invalidDetails.forEach(i => {
                        invalidKeywords.push(keywordsList[i.entityRequestIndex])
                    })

                    res.result.invalidDetails.reverse().forEach(i => {
                        keywordsList.splice(i.entityRequestIndex, 1)
                    })
                }

                validKeywords = keywordsList

                onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'broad'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'phrase'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'exact'), 'keywordText')])

                setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
                setValidKeywordsCount(validKeywords.length)

                setNewKeyword(invalidKeywords.map(i => i.keywordText).join('\n'))
            }
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
        let csv = "Some keywords failed validation and couldn't be added. Here is why:\n"

        csv += "\n"

        csv += "Keyword,"
        csv += "Match Type,"
        csv += "Failure code,"
        csv += "Reason for failure,"
        csv += "Suggested value"
        csv += "\n"

        invalidDetails.invalidDetails.reverse().forEach((row, index) => {
            csv += `"${allKeywords[row.entityRequestIndex].keywordText}",`
            csv += `"${allKeywords[row.entityRequestIndex].matchType}",`
            csv += `"${row.code}",`
            csv += `"${row.details}",`
            csv += row.correctedValue ? `"${row.correctedValue}"` : ''
            csv += "\n"
        })

        const encodedURI = encodeURI(csv)
        const fixedEncodedURI = encodedURI.replaceAll('#', '%23')

        const hiddenElement = document.createElement('a')
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + fixedEncodedURI
        hiddenElement.target = '_blank'
        hiddenElement.download = 'keywords-validation-results.csv'
        hiddenElement.click()
    }

    useEffect(() => {
        if (disabledBidField) {
            setDefaultBid(createData.adGroupBid)
        }
    }, [createData.adGroupBid])

    return (
        <div className={`negative-keywords keyword-targetings ${disabled ? 'disabled' : ''}`}>
            <div className="bid-block">
                <h3>Keywords</h3>

                <div className="row">
                    <div className="form-group">
                        <label htmlFor="">Bid</label>
                        <InputCurrency
                            value={defaultBid}
                            onChange={(value) => setDefaultBid(value)}
                            disabled={disabled || disabledBidField}
                        />
                    </div>

                    <div className="form-group">
                        <Checkbox
                            disabled={disabled}
                            checked={disabledBidField}
                            onChange={({target: {checked}}) => setDisabledBidField(checked)}
                        >
                            Use bid from Ad Group
                        </Checkbox>
                    </div>
                </div>
            </div>

            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                    <div className="row">
                        <label htmlFor="">Match type:</label>

                        <Radio.Group
                            value={keywordType}
                            onChange={({target: {value}}) => setKeywordType(value)}
                            disabled={disabled}
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
                                disabled={validationProcessing || disabled}
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        {invalidDetails && invalidDetails.invalidCount > 0 && <p className={'invalid-targetings'}>
                            <SVG
                                id={'round-information-icon'}/> {invalidDetails.invalidCount}/{invalidDetails.totalCount} keywords
                            weren't
                            added. <br/>
                            <button type={'button'} onClick={downloadReport}>Download report</button>
                        </p>}

                        <button className={'btn default p15 add'} disabled={validationProcessing || disabled}>
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
                        <Popconfirm
                            title="Are you sure to delete all keyword?"
                            onConfirm={clearKeywordsListHandler}
                            getPopupContainer={triggerNode => triggerNode.parentNode.parentNode}
                            okButtonProps={{className: 'default'}}
                            cancelButtonProps={{className: 'white'}}
                            placement="bottomRight"
                            okText="Yes"
                            cancelText="No"
                        >
                            <button disabled={validationProcessing}>Remove All</button>
                        </Popconfirm>}
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
                                        disabled={validationProcessing || disabled}
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
