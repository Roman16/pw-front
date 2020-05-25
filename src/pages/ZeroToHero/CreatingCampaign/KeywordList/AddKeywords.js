import React, {useState} from "react";
import {Input} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

const AddKeywords = ({type}) => {
    const [keywordList, setKeywordList] = useState({
            exact: ['test1', 'test2'],
            phrase: ['test3']
        }),
        [keywordValue, setKeywordValue] = useState(''),
        [selectedTab, setTab] = useState('exact');

    function handleAddMainKeyword() {
        if (keywordValue.replace(/^\s+/g, '')) {

            setKeywordList({
                ...keywordList,
                [selectedTab]: [...keywordList[selectedTab], keywordValue.replace(/^\s+/g, '')]
            });
            setKeywordValue('');
        }
    }

    function handleRemoveMainKeyword(index) {
        console.log(index);
        let newList = [...keywordList[selectedTab]];
        newList.splice(index, 1);

        setKeywordList({
            ...keywordList,
            [selectedTab]: [...newList]
        });
    }

    function selectFileHandler(e) {
        e.target.files[0].text()
            .then(text => {
                setKeywordList({
                    ...keywordList,
                    [selectedTab]: [...keywordList[selectedTab], ...text.split("\n")]
                });

                document.querySelector('input[type=file]').value = "";
            })
    }

    return (
        <div className="col">
            <h3>Enter {type} Keywords</h3>

            <div className="input-group">
                <Input
                    value={keywordValue}
                    onChange={e => setKeywordValue(e.target.value)}
                    type="text"
                    placeholder={'Type your keyword here'}
                />

                {keywordList[selectedTab].length < 10 &&
                <button className='btn default add-btn' onClick={handleAddMainKeyword}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
                }

                <div className="added-keywords">
                    {keywordList[selectedTab].map((item, index) => (
                        <div className="list-item" key={index}>
                            {item}

                            <button className={'remove-btn'} onClick={() => handleRemoveMainKeyword(index)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="tabs">

                    <span>Select type:</span>

                    <div
                        className={`tab exact ${selectedTab === 'exact' && 'selected'}`}
                        onClick={() => setTab('exact')}
                    >
                        Exact
                    </div>
                    <div
                        className={`tab phrase ${selectedTab === 'phrase' && 'selected'}`}
                        onClick={() => setTab('phrase')}
                    >
                        Phrase
                    </div>
                </div>
            </div>

            {type === 'main' ?
                <label htmlFor={'main-file'} className='btn default'>
                    <input
                        id={'main-file'}
                        type="file"
                        accept=".xls, .txt"
                        onChange={selectFileHandler}
                    />
                    Upload your keyword list (optional)
                </label>
                :
                <label htmlFor={'negative-file'} className='btn default'>
                    <input
                        id={'negative-file'}
                        type="file"
                        accept=".xls, .txt"
                        onChange={selectFileHandler}
                    />
                    Upload your negative keyword list
                </label>
            }
        </div>
    )
};

export default AddKeywords;