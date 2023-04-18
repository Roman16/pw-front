import React, {useEffect, useState} from "react"
import {Popconfirm, Radio, Spin} from "antd"
import {SVG} from "../../../../utils/icons"
import {uniqueArrOfObj} from "../../../../utils/unique"
import _ from "lodash"
import {usePrevious} from "../../../../utils/hooks/usePrevious"
import {analyticsServices} from "../../../../services/analytics.services"

let allKeywords = []


const negativeTargetingsValidation = async (data) => {
    try {
        const res = analyticsServices.keywordValidation('negative-targetings', data)

        return res
    } catch (e) {
        console.log(e)
    }
}


export const MultiTextarea = ({
                                  keywords,
                                  disabled,
                                  keywordTypeEnums,
                                  onChange,
                                  widthValidation = true,
                                  disabledKeywordType = false,
                                  entityType
                              }) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState(keywordTypeEnums[0].key),
        [validationProcessing, setValidationProcessing] = useState(false),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null),
        [invalidDetails, setInvalidDetails] = useState(),
        prevTypeEnums = usePrevious(keywordTypeEnums)

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
                let resArr = []

                if (widthValidation) {
                    setValidationProcessing(true)

                    const res = await negativeTargetingsValidation({
                        negativeTargetings: [...keywordsList.map(i => ({
                            calculatedTargetingText: i.keywordText,
                            calculatedTargetingMatchType: i.matchType,
                            entityType: entityType
                        }))]
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

                    keywordTypeEnums.forEach(({key}) => {
                        resArr = [...resArr, ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === key), 'keywordText')]
                    })

                    setValidKeywordsCount(validKeywords.length)

                    setNewKeyword(invalidKeywords.map(i => i.keywordText).join('\n'))
                } else {
                    keywordTypeEnums.forEach(({key}) => {
                        resArr = [...resArr, ...uniqueArrOfObj([...keywords, ...keywordsList].filter(item => item.matchType === key), 'keywordText')]
                    })
                }

                onChange([...resArr])

                setNewKeyword('')
            }
        } catch (e) {
            console.log(e)
        }

        setValidationProcessing(false)
    }

    const removeKeywordHandler = (index) => {
        if (index !== undefined) {
            onChange(keywords.filter((item, itemIndex) => itemIndex !== index))
        } else {
            onChange([])
        }
    }

    useEffect(() => {
        if (JSON.stringify(prevTypeEnums) !== JSON.stringify(keywordTypeEnums)) {
            setKeywordType(keywordTypeEnums[0].key)
        }
    }, [keywordTypeEnums])

    return (<div className="row">
            <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                <div className="row">
                    <label htmlFor="">Match type:</label>

                    <Radio.Group
                        value={keywordType}
                        onChange={({target: {value}}) => setKeywordType(value)}
                        disabled={disabled || disabledKeywordType}
                    >
                        {keywordTypeEnums.map(({key, name}) => <Radio value={key}>
                            {name}
                        </Radio>)}
                    </Radio.Group>
                </div>

                <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value.toLowerCase())}
                                required
                                disabled={disabled || validationProcessing}
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                </div>

                <div className="actions">
                    <button className={'btn default p15 add'} disabled={disabled || validationProcessing}>
                        <SVG id={'plus-icon'}/>
                        Add

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
                        onConfirm={() => removeKeywordHandler()}
                        getPopupContainer={triggerNode => triggerNode.parentNode.parentNode}
                        okButtonProps={{className: 'default'}}
                        cancelButtonProps={{className: 'white'}}
                        placement="bottomRight"
                        okText="Yes"
                        cancelText="No"
                    >
                        <button>Remove All</button>
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
                    </div>

                    <ul>
                        {keywords.map((keyword, index) => (
                            <li>
                                <div className="text">
                                    {keyword.keywordText}
                                </div>

                                <div className="type">
                                    {_.find(keywordTypeEnums, {key: keyword.matchType}).name}
                                </div>

                                <button
                                    className={'btn icon'}
                                    onClick={() => removeKeywordHandler(index)}
                                    disabled={disabled}
                                >
                                    <SVG id={'remove-filter-icon'}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}