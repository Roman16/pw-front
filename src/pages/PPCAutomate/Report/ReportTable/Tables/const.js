import React from 'react';
import {Tooltip, Icon} from 'antd';
import moment from 'moment';
import up from '../../../../../assets/img/icons/up-row.svg';
import down from '../../../../../assets/img/icons/up-row.svg';
import right from '../../../../../assets/img/icons/right-row.svg';
import pause from '../../../../../assets/img/icons/pause.svg';

export const indexField = {
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: '40px'
};

export const dateField = {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => moment(text).format('Y/M/D')
};

export const actionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    className: 'left-border',
    render: text => (
        <div>
            <span dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    )
};

export const bidActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // width: 200,
    className: 'left-border',
    render: ({data: {current_state, previous_state}}) => (
        <div className='action-field'>
            {current_state > previous_state ?
                <span><img src={up} alt=""/> bid up (${previous_state} <img src={right} alt=""/> <b>${current_state}</b>)</span>
                :
                <span><img src={down} alt=""/> bid down (<b>${previous_state}</b> <img src={right} alt=""/> ${current_state})</span>
            }
        </div>
    )
};
export const pauseKeywordsActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // width: 200,
    className: 'left-border',
    render: () => (
        <div className='action-field'>
            <img src={pause} alt=""/> Paused Keyword
        </div>
    )
};
export const createdKeywordsActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // width: 200,
    className: 'left-border',
    render: () => (
        <div className='action-field'>
            Created
        </div>
    )
};
export const pausePatActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // width: 200,
    className: 'left-border',
    render: () => (
        <div className='action-field'>
            <img src={pause} alt=""/> Paused Keyword
        </div>
    )
};
export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    render: text => (
        <Tooltip
            placement="bottom"
            title={<span dangerouslySetInnerHTML={{__html: text}}/>}
        >
            <Icon type="info-circle" className="info-icon" theme="filled"/>
        </Tooltip>
    )
};
