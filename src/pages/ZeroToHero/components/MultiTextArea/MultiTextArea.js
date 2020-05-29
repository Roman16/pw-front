import React, {useState} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";


const MultiTextArea = () => {
    const [keywordList, setKeywordList] = useState([]),
        [inputValue, setInputValue] = useState(null);

    const addKeywordHandler = ({target: {value}}) => {
        setKeywordList([...keywordList, value]);
        setInputValue(null);
    };

    const removeKeywordHandler = (index) => {

    }

    return (
        <div className={'multi-text-area'}>
            <div className="list">
                {keywordList.map((item, index) => <div className={'item-text'}>
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