import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";
import {Radio} from "antd";

import './NegativeKeywords.less';
import {unique} from "../../../../../utils/unique";

const NegativeKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [sectionCollapse, setSectionCollapse] = useState(true),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null);


    const addKeywordsHandler = (e) => {
        e.preventDefault();

        const validKeywords = [...newKeyword.split('\n')
            .filter(item => item !== '')
            .filter(item => item.length < 80)
            .map(item => unique(item).join(' '))
            .filter(item => item.match(/\b\w+\b/g).length <= (keywordType === 'exact' ? 10 : 4))
            .map(item => ({
                text: item,
                type: keywordType
            }))
        ];

        onUpdate({negative_keywords: [...keywords, ...validKeywords]});

        setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length);
        setValidKeywordsCount(validKeywords.length);

        setNewKeyword('');
    };

    const clearKeywordsListHandler = () => {
        onUpdate({negative_keywords: []});
    };

    const removeKeywordHandler = (index) => {
        onUpdate({negative_keywords: keywords.filter((item, itemIndex) => itemIndex !== index)})
    };

    return (
        <section className={`negative-keywords relevant-keywords ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header hover" onClick={() => setSectionCollapse(prevState => !prevState)}>
                <div className="container">
                    <h2>Negative keywords <span className={'optional'}>optional</span></h2>

                    <button>
                        <SVG id='select-icon'/>
                    </button>
                </div>
            </div>

            <div className={`container`}>
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
                                placeholder={'Enter the keywords you consider negative, paste one keyword per line'}
                            />
                        </div>

                        <div className="actions">
                            {validKeywordsCount !== keywordsCount && <div className="added-description">
                                {validKeywordsCount}/{keywordsCount}
                            </div>}

                            <button className={'btn default p15'}>
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

                                        <i onClick={() => removeKeywordHandler(index)}>
                                            <SVG id={'remove-filter-icon'}/>
                                        </i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default NegativeKeywords;