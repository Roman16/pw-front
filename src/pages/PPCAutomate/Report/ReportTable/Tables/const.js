import React from 'react';
import moment from 'moment';
import {Menu, Dropdown} from 'antd';

import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {SVG} from "../../../../../utils/icons";
import {numberMask} from "../../../../../utils/numberMask";
import {round} from "../../../../../utils/round";

export const dateField = {
    title: 'Date',
    dataIndex: 'datetime',
    key: 'datetime',
    width: '14.285714285714286rem',
    render: date => <span>
        {moment.utc(date).tz('America/Los_Angeles').format('MMM DD, YYYY hh:mm:ss A')}
    </span>,
    sorter: true,
    filter: true
};

export const actionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '12.857142857142858rem',
    render: (action, item) => {

        switch (action.type) {
            case 'CHANGED':
                return (<div className="action-field">
                    {action.data && <>
                        <span className="previous">Bid ${action.data.previous_bid}</span>
                        <i className={action.data.new_bid > action.data.previous_bid ? 'up' : 'down'}>
                            <SVG id='change-bid-icon'/>
                        </i>
                        <span className="current">${action.data.new_bid}</span>
                    </>}
                </div>)
                break;

            case 'CREATED':
                return (<div className="action-field">Created</div>)
                break;

            case 'PAUSED':
                return (<div className="action-field">Pause</div>)
                break;

            default:
                return ('');
        }
    }
};

export const reasonField = {
    title: 'Reason',
    dataIndex: 'type',
    key: 'type',
    minWidth: '14.285714285714286rem',
    filter: true,
    render: (type, item) => {
        switch (type) {
            case 'AddedCreatedKeywordAsNegative':
                return (<span>Created negative keyword to prevent competition between new ads</span>)
                break;

            case 'AddedCreatedPATAsNegative':
                return (<span>Created negative PT to prevent competition between new ads</span>)
                break;

            case 'ChangedKeywordBidACoS':
                return (<span>Adjusting bid to maximize profits</span>)
                break;

            case 'ChangedKeywordBidImpressions':
                return (<span>Increasing bid to generate more clicks</span>)
                break;

            case 'ChangedPATBidACoS':
                return (<span>Adjusting bid to maximize profits</span>)
                break;

            case 'ChangedPATBidImpressions':
                return (<span>Increasing bid to generate more clicks</span>)
                break;

            case 'CreatedAdGroup':
                return (<span>Created ad group for new targetings from search terms</span>)
                break;

            case 'CreatedCampaign':
                return (<span>Created campaign for new targetings from search terms</span>)
                break;

            case 'CreatedKeywordFromCST':
                return (
                    <span>Detected new keyword opportunity from search terms. Created it with bid <b>${numberMask(item.bid, 2)}</b></span>)
                break;

            case 'CreatedNegativeKeywordFromCSTHighACoS':
                return (<span>Created negative keyword for unprofitable search term</span>)
                break;

            case 'CreatedNegativeKeywordFromCSTNoSales':
                return (<span>Created negative keyword to prevent loss</span>)
                break;

            case 'CreatedNegativePATFromCSTHighACoS':
                return (<span>Created negative PT for unprofitable search term</span>)
                break;

            case 'CreatedNegativePATFromCSTNoSales':
                return (<span>Created negative PT to prevent loss</span>)
                break;

            case 'CreatedPATFromCST':
                return (
                    <span>Detected new PT opportunity from search terms. Created it with bid <b>${numberMask(item.bid, 2)}</b></span>)
                break;

            case 'CreatedProductAd':
                return (<span>Created product ad for new targetings from search terms</span>)
                break;

            case 'PausedKeywordDuplicateFromCustomerSearchTerm':
                return (
                    <span>This keyword is a duplicate of another better performing keyword based on search terms</span>)
                break;

            case 'PausedKeywordDuplicateOfPAT':
                return (<span>This keyword is a duplicate of another better performing PT</span>)
                break;

            case 'PausedKeywordDuplicate':
                return (<span>This keyword is a duplicate of another better performing keyword</span>)
                break;

            case 'PausedKeywordHighACoS':
            case 'PausedKeywordNoSales':
                return (<span>Not profitable keyword</span>)
                break;

            case 'PausedPATHighACoS':
            case 'PausedPATNoSales':
                return (<span>Not profitable PT</span>)
                break;

            case 'PausedPATDuplicate':
                return (<span>This PT is a duplicate of another better performing PT</span>)
                break;

            case 'RevertLastChangeKeywordNoSales':
            case 'RevertLastChangePATNoSales':
                return (<span>Adjusting profitable bid</span>)
                break;

            default:
                return ('');
        }
    }
};

export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    width: '35px',
    render: (text, item) => (
        <TitleInfo info={text} position="left" type="info"/>
    )
};


export const sorterByKeywordField = (filterByKeyword, filtered) => ({
    title: '',
    dataIndex: 'keyword_id',
    key: 'keyword_id',
    width: '30px',
    fixed: true,
    render: (id) => {
        const menu = (
            <Menu onClick={(e) => {
                if (e.key === 'show') {
                    filterByKeyword({
                        filterBy: 'keyword_id',
                        type: '=',
                        value: id
                    })
                }
            }}>
                <Menu.Item key="show">
                    Show all changes for this keyword
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown disabled={id == null || filtered} overlay={menu} trigger={['click']}>
                <button
                    className={'filter-btn'}
                    disabled={id == null}>
                    <div/>
                    <div/>
                    <div/>
                </button>
            </Dropdown>)
    }
});


export const renderCurrencyField = {
    render: (data) => (data !== null) ? (<span>${numberMask(data, 2)}</span>) : ''
};

export const renderNumberField = {
    render: (data) => (data !== null) ? (<span>{numberMask(data, 0)}</span>) : ''
};
export const renderPercentField = {
    render: (data) => (data !== null) ? (<span>{round(data * 100, 2)}%</span>) : ''
};
