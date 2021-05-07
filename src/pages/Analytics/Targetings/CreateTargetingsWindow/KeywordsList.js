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
        [validationProcessing, setValidationProcessing] = useState(false)


    const addKeywordsHandler = async (e) => {
        e.preventDefault()
        setValidationProcessing(true)

        try {
            const validKeywords = [...newKeyword.split('\n')
                .filter(item => item !== '')
                .filter(item => item.length < 80)
                .filter(item => !keywords.find(el => el.keywordText.replace(/\s/g, '') === item.replace(/\s/g, '')))
                .map(item => unique(item).join(' '))
                .filter(item => item.match(/\b\w+\b/g).length <= (keywordType === 'exact' ? 10 : 4))
                .map(item => ({
                    keywordText: item,
                    matchType: keywordType
                }))
            ]
            await onValidate({
                entityType: 'keywords',
                keywords: [...validKeywords]
            })

            setValidationProcessing(false)


            onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'exact'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'phrase'), 'keywordText'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.matchType === 'broad'), 'keywordText')])

            setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
            setValidKeywordsCount(validKeywords.length)

            setNewKeyword('')
        } catch (e) {
            console.log(e)
        }
    }

    const clearKeywordsListHandler = () => {
        onUpdate([])
    }

    const removeKeywordHandler = (index) => {
        onUpdate(keywords.filter((item, itemIndex) => itemIndex !== index))
    }

    return (
        <div className={`negative-keywords keyword-targetings`}>
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
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                disabled={validationProcessing}
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        <button className={'btn default p15 add'}>
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
                                        <InputCurrency value={createData.calculatedBid}/>
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
