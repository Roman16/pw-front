import React from 'react';
import moment from 'moment';

import up from '../../../../../assets/img/icons/up-row.svg';
import down from '../../../../../assets/img/icons/down-row.svg';
import right from '../../../../../assets/img/icons/right-row.svg';
import pause from '../../../../../assets/img/icons/pause.svg';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {ColumnMenuFilter} from "./columnFilter";

const patIntentValues = {
    queryHighRelMatches: 'Close Match',
    queryBroadRelMatches: 'Loose Match',
    asinAccessoryRelated: 'Complements',
    asinSubstituteRelated: 'Substitutes',
    asinSameAs: 'ASIN',
    asinCategorySameAs: 'Category',
    asinBrandSameAs: 'Brand'
};
const negativeMatchValues = {
    negativeExact: 'Negative Exact',
    negativePhrase: 'Negative Phrase'
};

export const patIntentField = (onChangeFilter, filteredColumns) => ({
    title: (
        <TitleInfo
            title="PAT Intent Type"
            info="Automatic and Manual Product Targetings use multiple strategies to match your ads to shoppers looking for your products. For Automatic Product Targetings these strategies are: Close Match, Loose Match, Complements, Substitutes. For Manual: ASIN, Categories, Brand."
            position="bottom"
        />
    ),
    dataIndex: 'd_patIntentType',
    key: 'd_patIntentType',
    render: text => <span>{patIntentValues[text]}</span>,
    sorter: true,
    filter: (dataIndex) => <ColumnMenuFilter
        onChangeFilter={onChangeFilter}
        filteredColumns={filteredColumns}
        dataIndex={dataIndex}
        menu={Object.keys(patIntentValues).map(key => ({
            label: patIntentValues[key],
            value: key
        }))}
    />
});

export const negativeMatchTypeField = {
    title: 'Negative Match Type',
    dataIndex: 'negativeMatchType',
    key: 'negativeMatchType',
    width: '150px',
    render: text => <span>{negativeMatchValues[text]}</span>,

};

export const indexField = (currentPage, pageSize) => ({
    title: '#',
    dataIndex: 'id',
    key: 'id',
    width: '30px',
    render: (id, item, index) => {
        return (<span>{currentPage * pageSize - pageSize + index + 1}</span>)
    }
});

export const dateField = {
    title: 'Date',
    dataIndex: 'eventDateTime',
    key: 'eventDateTime',
    width: '100px',
    render: date => moment(date).format('MM-DD-YY HH:mm:ss'),
    sorter: true,
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
    width: '13.5em',
    className: 'left-border',
    render: ({data: {current_state, previous_state}}) => (
        <div className="action-field">
            {current_state > previous_state ? (
                <span>
          <img src={up} alt=""/> bid up (${previous_state}{' '}
                    <img src={right} alt=""/> <b>${current_state}</b>)
        </span>
            ) : (
                <span>
          <img src={down} alt=""/> bid down (<b>${previous_state}</b>{' '}
                    <img src={right} alt=""/> ${current_state})
        </span>
            )}
        </div>
    )
};

export const pauseKeywordsActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '170px',
    className: 'left-border',
    render: () => (
        <div className="action-field">
            <img src={pause} alt=""/> Paused Keyword
        </div>
    )
};

export const createdKeywordsActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '100px',
    className: 'left-border',
    render: () => <div className="action-field">Created</div>
};

export const pausePatActionField = {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '160px',
    className: 'left-border',
    render: () => (
        <div className="action-field">
            <img src={pause} alt=""/> Paused Keyword
        </div>
    )
};

export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    width: '30px',
    render: text => <TitleInfo info={text} position="left" type="info"/>
};
