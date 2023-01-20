import React, {useEffect, useState} from "react"
import {uniqueArrOfObj} from "../../../../utils/unique"
import {Checkbox, Popconfirm, Radio} from "antd"
import {SVG} from "../../../../utils/icons"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Spin} from "antd/es"
import _ from "lodash"

let allKeywords = []

const TargetsList = ({keywords, onUpdate, targetingType, createData, onValidate, disabled}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('asins'),
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
                .map(i => i.toUpperCase())
                .map(item => ({
                    text: item,
                    type: keywordType,
                    calculatedBid: defaultBid
                }))
            ]

            keywordsList = uniqueArrOfObj([...keywords, ...keywordsList].filter(item => item.type === 'asins'), 'text')

            keywordsList = uniqueArrOfObj([...keywordsList], 'text').filter(item => !_.find(keywords, {
                text: item.text
            }))


            allKeywords = [...keywordsList.map(i => ({...i}))]

            if (keywordsList.length === 0) {
                setNewKeyword('')
                return
            } else {
                setValidationProcessing(true)

                const res = await onValidate({
                    entityType: 'asins',
                    asins: [...keywordsList.map(i => i.text)]
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

                console.log(keywordsList)

                validKeywords = keywordsList

                onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'asins'), 'text'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'categories'), 'text')])

                setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
                setValidKeywordsCount(validKeywords.length)

                setNewKeyword(invalidKeywords.map(i => i.text).join('\n'))
            }
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

    const changeBidHandler = (index, value) => {
        onUpdate(keywords.map((item, i) => {
            if (i === index) item.calculatedBid = value
            return item
        }))
    }

    const downloadReport = () => {
        let csv = "Some ASINs failed validation and couldn't be added. Here is why:\n"

        csv += "\n"
        csv += "ASIN,"
        csv += "Failure code,"
        csv += "Reason for failure,"
        csv += "Suggested value"
        csv += "\n"

        invalidDetails.invalidDetails.reverse().forEach((row, index) => {
            csv += `"${allKeywords[row.entityRequestIndex].text}",`
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
        hiddenElement.download = 'asins-validation-results.csv'
        hiddenElement.click()
    }

    useEffect(() => {
        if (disabledBidField) {
            setDefaultBid(createData.adGroupBid)
        }
    }, [createData.adGroupBid])

    return (
        <div className={`negative-keywords keyword-targetings asins ${disabled ? 'disabled' : ''}`}>
            <div className="bid-block">
                <h3>Product Targetings</h3>

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
                                onChange={({target: {value}}) => setNewKeyword(value.capitalize())}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                                disabled={validationProcessing}
                            />
                    </div>

                    <div className="actions">
                        {invalidDetails && invalidDetails.invalidCount > 0 && <p className={'invalid-targetings'}>
                            <SVG
                                id={'round-information-icon'}/> {invalidDetails.invalidCount}/{invalidDetails.totalCount} ASINs
                            weren't
                            added. <br/>
                            <button type={'button'} onClick={downloadReport}>Download report</button>
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
                        <Popconfirm
                            title="Are you sure to delete all keyword?"
                            onConfirm={clearKeywordsListHandler}
                            getPopupContainer={triggerNode => document.querySelector('.ant-modal-body')}
                            okButtonProps={{className: 'default'}}
                            cancelButtonProps={{className: 'white'}}
                            placement="topRight"
                            okText="Yes"
                            cancelText="No"
                        >
                            <button disabled={validationProcessing}>Remove All</button>
                        </Popconfirm>}
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
                                        <InputCurrency
                                            value={keyword.calculatedBid}
                                            onChange={value => changeBidHandler(index, value)}
                                        />
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
