import React from "react";
import './KeywordList.less';

import AddKeywords from './AddKeywords';

const KeywordList = () => {


    return (
        <section className='keyboard-list'>
            <AddKeywords
                type={'main'}
            />

            <AddKeywords
                type={'negative'}
            />
        </section>
    )
};

export default KeywordList;