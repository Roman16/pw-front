import React from "react";
import {Input} from "antd";
import './AdminPanel.less';

const AdminPanel = () => {

    return (
        <div className="admin-panel">
            <div className="form-group">
                <Input type="text" placeholder={'E-mail'}/>
                <button className={'btn default'}>Check</button>
            </div>
        </div>
    )
};


export default AdminPanel;