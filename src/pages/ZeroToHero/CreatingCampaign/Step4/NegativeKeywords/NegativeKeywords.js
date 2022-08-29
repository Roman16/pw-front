import React, {useState} from "react"
import {SVG} from "../../../../../utils/icons"
import {Radio} from "antd"

import './NegativeKeywords.less'
import {unique, uniqueArrOfObj} from "../../../../../utils/unique"

const NegativeKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null)


    const addKeywordsHandler = () => {
        const validKeywords = [...newKeyword.split('\n')
            .filter(item => item !== '')
            .filter(item => item.length < 80)
            .map(item => unique(item).join(' '))
            .filter(item => item.match(/\b\w+\b/g).length <= (keywordType === 'exact' ? 10 : 4))
            .map(item => ({
                text: item,
                type: keywordType
            }))
        ]

        onUpdate({negative_keywords: [...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'exact'), 'text'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'phrase'), 'text')]})

        setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
        setValidKeywordsCount(validKeywords.length)

        setNewKeyword('')
    }

    const clearKeywordsListHandler = () => {
        onUpdate({negative_keywords: []})
    }

    const removeKeywordHandler = (index) => {
        onUpdate({negative_keywords: keywords.filter((item, itemIndex) => itemIndex !== index)})
    }

    return (
        <section className={`negative-keywords relevant-keywords`}>
            <div className="row header">
                <div className="col">
                    <div className="row">
                        <label htmlFor="">Match type:</label>

                        <Radio.Group value={keywordType} onChange={({target: {value}}) => setKeywordType(value)}>
                            <Radio value={'exact'}>
                                Negative Exact
                            </Radio>

                            <Radio value={'phrase'}>
                                Negative Phrase
                            </Radio>
                        </Radio.Group>
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                        <button onClick={clearKeywordsListHandler}>Remove All</button>
                    </div>
                </div>
            </div>

            <div className="row body">
                <form className="col new-keyword">
                    <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Type here'}
                            />
                    </div>

                    <div className="actions">
                        <div
                            className={`added-description ${validKeywordsCount !== keywordsCount ? 'visible' : ''}`}>
                            Some of the keywords were not added because they exceeded the maximum amount of words in
                            it or 80 characters.
                        </div>
                    </div>
                </form>

                <div className="col added-keywords">
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
                                        {keyword.text}
                                    </div>

                                    <div className="type">
                                        {keyword.type === 'exact' ? 'Negative Exact' : 'Negative Phrase'}
                                    </div>

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row footer">
                <div className="col">
                    <button className={'sds-btn blue p15 add'} onClick={addKeywordsHandler}>
                        <SVG id={'plus-icon'}/>
                        Add Keywords
                    </button>
                </div>
            </div>
        </section>
    )
}

export default NegativeKeywords