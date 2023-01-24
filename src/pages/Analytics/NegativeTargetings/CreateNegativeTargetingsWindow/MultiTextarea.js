import React, {useEffect, useState} from "react"
import {Popconfirm, Radio} from "antd"
import {SVG} from "../../../../utils/icons"
import {uniqueArrOfObj} from "../../../../utils/unique"
import _ from "lodash"

export const MultiTextarea = ({
                                  keywords,
                                  disabled,
                                  keywordTypeEnums,
                                  onChange
                              }) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState(keywordTypeEnums[0].key)

    const addKeywordsHandler = (e) => {
        e.preventDefault()

        try {
            let keywordsList = [...newKeyword.split('\n')
                .map(i => i.trim())
                .filter(item => item !== '')
                .map(i => i.replace(/ +/g, ' '))
                .map(item => ({
                    keywordText: item,
                    matchType: keywordType
                }))
            ]

            keywordsList = uniqueArrOfObj([...keywordsList], 'keywordText').filter(item => !_.find(keywords, {
                matchType: item.matchType,
                keywordText: item.keywordText
            }))

            let resArr = []

            keywordTypeEnums.forEach(({key}) => {
                resArr = [...resArr, ...uniqueArrOfObj([...keywords, ...keywordsList].filter(item => item.matchType === key), 'keywordText')]
            })

            onChange([...resArr])

            setNewKeyword('')
        } catch (e) {
            console.log(e)
        }
    }

    const removeKeywordHandler = (index) => {
        if (index !== undefined) {
            onChange(keywords.filter((item, itemIndex) => itemIndex !== index))
        } else {
            onChange([])
        }
    }

    useEffect(() => {
        setKeywordType(keywordTypeEnums[0].key)
    }, [keywordTypeEnums])

    return (<div className="row">
            <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                <div className="row">
                    <label htmlFor="">Match type:</label>

                    <Radio.Group
                        value={keywordType}
                        onChange={({target: {value}}) => setKeywordType(value)}
                        disabled={disabled}
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
                                disabled={disabled}
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                </div>

                <div className="actions">
                    <button className={'btn default p15 add'} disabled={disabled}>
                        <SVG id={'plus-icon'}/>
                        Add Keywords
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
                        getPopupContainer={triggerNode => document.querySelector('.ant-modal-body')}
                        okButtonProps={{className: 'default'}}
                        cancelButtonProps={{className: 'white'}}
                        placement="topRight"
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