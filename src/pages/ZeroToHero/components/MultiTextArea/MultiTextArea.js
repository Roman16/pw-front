import React, {useEffect, useState, useRef} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";


const MultiTextArea = ({onChange, max = 999999}) => {
    const [keywordList, setKeywordList] = useState(null),
        [inputValue, setInputValue] = useState(null);

    const inputEl = useRef(null);


    const addKeywordHandler = ({target: {value}}) => {
        if (value !== '') {
            if (keywordList == null) {
                setKeywordList([value]);
            } else {
                setKeywordList([...keywordList, value]);
            }
            setInputValue(null);
        }
    };

    const removeKeywordHandler = (index) => {
        setKeywordList(keywordList.filter((item, itemIndex) => itemIndex !== index))
    };

    useEffect(() => {
        if (keywordList !== null) {
            onChange(keywordList)
        }
    }, [keywordList]);

    return (
        <div className={'multi-text-area'}
             onClick={() => (!keywordList || keywordList.length < max) && inputEl.current.focus()}>
            <div className="list">
                {keywordList && keywordList.map((item, index) => <div className={'item-text'}>
                    {item}

                    <i onClick={() => removeKeywordHandler(index)}>
                        <SVG id={'remove-filter-icon'}/>
                    </i>
                </div>)}

                {(!keywordList || keywordList.length < max) && <Input
                    ref={inputEl}
                    value={inputValue}
                    placeholder={'Add keywords and separate each item by “Enter”'}
                    type="text"
                    onChange={({target: {value}}) => setInputValue(value)}
                    onPressEnter={addKeywordHandler}
                />}
            </div>
        </div>
    )
};

export default MultiTextArea;