import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";
import {Radio} from "antd";

import './NegativeKeywords.less';

const NegativeKeywords = () => {
    const [addedKeywords, setAddedKeywords] = useState([]),
        [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact'),
        [sectionCollapse, setSectionCollapse] = useState(true);

    const addKeywordsHandler = (e) => {
        e.preventDefault();

        setAddedKeywords([...addedKeywords, ...newKeyword.split('\n').filter(item => item !== '').map(item => ({
            text: item,
            type: keywordType
        }))]);
        setNewKeyword('');
    };

    const clearKeywordsListHandler = () => {
        setAddedKeywords([]);
    };

    const removeKeywordHandler = (index) => {
        setAddedKeywords(addedKeywords.filter((item, itemIndex) => itemIndex !== index))
    };

    return (
        <section className={`negative-keywords relevant-keywords ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header">
                <div className="container">
                    <h2>Negative keywords <span className={'optional'}>optional</span></h2>

                    <button onClick={() => setSectionCollapse(prevState => !prevState)}>
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
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                        </div>

                        <button className={'btn default p15'}>
                            <SVG id={'plus-icon'}/>
                            Add Keyword
                        </button>
                    </form>

                    <div className="col added-keywords">
                        <div className="row">
                            <div className="count"><b>{addedKeywords.length || 0}</b> keywords added</div>
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
                                {addedKeywords.map((keyword, index) => (
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