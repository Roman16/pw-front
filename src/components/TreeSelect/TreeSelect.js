import React from 'react';
import {TreeSelect as Tree} from "antd";
import './TreeSelect.less';


const TreeSelect = (props) => {

    return (<div className={'pw-tree-select'}>
        <Tree {...props}/>
    </div>)
};

export default TreeSelect;