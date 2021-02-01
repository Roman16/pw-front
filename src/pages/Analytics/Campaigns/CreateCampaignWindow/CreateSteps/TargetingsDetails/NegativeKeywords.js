import React, {useState} from "react"
import {SVG} from "../../../../../../utils/icons"
import {Radio} from "antd"
import {unique, uniqueArrOfObj} from "../../../../../../utils/unique"

const NegativeKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null)


    const addKeywordsHandler = (e) => {
        e.preventDefault()

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
        <div className={`negative-keywords relevant-keywords`}>
            <h3>Negative keywords</h3>

            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
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

                    <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        <button className={'btn default p15 add'}>
                            <SVG id={'plus-icon'}/>
                            Add Keyword
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                        <button onClick={clearKeywordsListHandler}>Remove All</button>
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
                                        {keyword.text}
                                    </div>

                                    <div className="type">
                                        {keyword.type === 'exact' ? 'Negative Exact' : 'Negative Phrase'}
                                    </div>

                                    <button className={'btn icon'} onClick={() => removeKeywordHandler(index)}>
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

export default NegativeKeywords
