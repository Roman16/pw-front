import React, {useEffect, useState} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";


const MultiTextArea = ({onChange}) => {
    const [keywordList, setKeywordList] = useState(null),
        [inputValue, setInputValue] = useState(null);

    const addKeywordHandler = ({target: {value}}) => {
        if (keywordList == null) {
            setKeywordList([value]);
        } else {
            setKeywordList([...keywordList, value]);
        }
        setInputValue(null);
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
        <div className={'multi-text-area'}>
            <div className="list">
                {keywordList && keywordList.map((item, index) => <div className={'item-text'}>
                    {item}

                    <i onClick={() => removeKeywordHandler(index)}>
                        <SVG id={'remove-filter-icon'}/>
                    </i>
                </div>)}

                <Input
                    value={inputValue}
                    placeholder={'Type here'}
                    type="text"
                    onChange={({target: {value}}) => setInputValue(value)}
                    onPressEnter={addKeywordHandler}
                />
            </div>
        </div>
    )
};

export default MultiTextArea;