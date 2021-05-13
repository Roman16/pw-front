import React, {useState} from "react"
import {SVG} from "../../../../../../utils/icons"
import {Popconfirm, Radio} from "antd"
import {unique, uniqueArrOfObj} from "../../../../../../utils/unique"

const NegativeKeywords = ({keywords, onUpdate, title, disabled, withMatchType, confirmRemove = true}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null)


    const addKeywordsHandler = (e) => {
        e.preventDefault()

        const validKeywords = [...newKeyword.split('\n')
            .filter(item => item !== '')
            .filter(item => item.length < 80)
            .filter(item => !keywords.find(el => el.text.replace(/\s/g, '') === item.replace(/\s/g, '')))
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
        <div className={`negative-keywords relevant-keywords ${disabled ? 'disabled' : ''}`}>
            <h3>{title}</h3>

            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                    <div className="row">
                        {withMatchType && <>
                            <label htmlFor="">Match type:</label>

                            <Radio.Group disabled={disabled} value={keywordType}
                                         onChange={({target: {value}}) => setKeywordType(value)}>
                                <Radio value={'exact'}>
                                    Negative Exact
                                </Radio>


                                <Radio value={'phrase'}>
                                    Negative Phrase
                                </Radio>
                            </Radio.Group>
                        </>}
                    </div>

                    <div className="form-group">
                            <textarea
                                disabled={disabled}
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        <button disabled={disabled} className={'btn default p15 add'}>
                            <SVG id={'plus-icon'}/>
                            Add Keyword
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                        <button disabled={disabled || keywords.length === 0} onClick={clearKeywordsListHandler}>Remove All</button>
                    </div>

                    <div className="keywords-list">
                        <div className="header">
                            <div>
                                Keywords
                            </div>

                            {withMatchType && <div>
                                Match type
                            </div>}
                        </div>

                        <ul>
                            {keywords.map((keyword, index) => (
                                <li>
                                    <div className="text">
                                        {keyword.text}
                                    </div>

                                    {withMatchType && <div className="type">
                                        {keyword.type === 'exact' ? 'Negative Exact' : 'Negative Phrase'}
                                    </div>}

                                    {confirmRemove ? <Popconfirm
                                            title="Are you sure to delete this keyword?"
                                            onConfirm={() => removeKeywordHandler(index)}
                                            getPopupContainer={triggerNode => document.querySelector('.ant-modal-body')}
                                            okButtonProps={{className: 'default'}}
                                            cancelButtonProps={{className: 'white'}}
                                            placement="topRight"
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className={'btn icon'}>
                                                <SVG id={'remove-filter-icon'}/>
                                            </button>
                                        </Popconfirm>
                                        :
                                        <button className={'btn icon'} onClick={() => removeKeywordHandler(index)}>
                                            <SVG id={'remove-filter-icon'}/>
                                        </button>
                                    }
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
