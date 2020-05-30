import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";
import './RelevantKeywords.less';


const RelevantKeywords = () => {
    const [addedKeywords, setAddedKeywords] = useState([]),
        [newKeyword, setNewKeyword] = useState(''),
        [sectionCollapse, setSectionCollapse] = useState(true);


    const addKeywordsHandler = (e) => {
        e.preventDefault();

        setAddedKeywords([...addedKeywords, ...newKeyword.split('\n').filter(item => item !== '')]);
        setNewKeyword('');
    };

    const clearKeywordsListHandler = () => {
        setAddedKeywords([]);
    };

    const removeKeywordHandler = (keyword) => {
        setAddedKeywords(addedKeywords.filter(item => item !== keyword))
    };

    return (
        <section className={`relevant-keywords ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header">
                <div className="container">
                    <h2>Relevant keywords <span className={'optional'}>optional</span></h2>

                    <button onClick={() => setSectionCollapse(prevState => !prevState)}>
                        <SVG id='select-icon'/>
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <form className="col new-keyword" onSubmit={addKeywordsHandler}>
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
                            <div className="header">Keywords</div>

                            <ul>
                                {addedKeywords.map(keyword => (
                                    <li>
                                        {keyword}

                                        <i onClick={() => removeKeywordHandler(keyword)}>
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

export default RelevantKeywords;