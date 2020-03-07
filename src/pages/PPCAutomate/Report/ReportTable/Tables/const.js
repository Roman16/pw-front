import React from 'react';
import moment from 'moment';

import up from '../../../../../assets/img/icons/up-row.svg';
import down from '../../../../../assets/img/icons/down-row.svg';
import right from '../../../../../assets/img/icons/right-row.svg';
import pause from '../../../../../assets/img/icons/pause.svg';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';
import {ColumnMenuFilter, ColumnNumberFilter} from "./columnFilter";
import {round} from "../../../../../utils/round";

function getIndexColumnWidth(count) {
    return `${25 + count.toString().length * 7}px`;
}

export const patIntentValues = {
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
            position="top"
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
    width: getIndexColumnWidth(Number(currentPage * pageSize - pageSize)),
    render: (id, item, index) => {
        return (<span className='index-field'> {!item.viewed &&
        <div/>} {currentPage * pageSize - pageSize + index + 1}</span>)
    }
});

export const dateField = {
    title: 'Date',
    dataIndex: 'eventDateTime',
    key: 'eventDateTime',
    width: '120px',
    render: date => <span>{moment.utc(date).local().format('MMM DD, YYYY')}
        <br/> {moment.utc(date).local().format('H:mm:ss')}</span>,
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
    render: ({data}) => {
        if (data) {
            return (
                <div className="action-field">
                    {data && data.current_state > data.previous_state ? (
                        <span>
                    <img src={up} alt=""/> bid up (${data.previous_state}{' '}
                            <img src={right} alt=""/> <b>${data.current_state}</b>)
                </span>
                    ) : (
                        <span>
                    <img src={down} alt=""/> bid down (<b>${data.previous_state}</b>{' '}
                            <img src={right} alt=""/> ${data.current_state})
                </span>
                    )}
                </div>
            )
        }
    }
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

export const averageCVRField = (onChangeFilter, filteredColumns) => ({
    title: (
        <TitleInfo
            position='top'
            title="Normalized CVR"
            info={`Normalized CVR is our own calculated metric that gives better representation of an expected CVR for a keyword or a Product Targeting. <br/>
                   When no data is available for product in PPC we use average numbers calculated based on millions of data points.
                   When there is data for product we smoothly transition into using the product's specific numbers.<br/>
                   We also account for trends between different match types and apply correction to CVR if needed based on these trends`}
        />
    ),
    dataIndex: 'd_averageConversionRate',
    key: 'd_averageConversionRate',
    width: '14em',
    render: (text) => (text && <span>{round(+text * 100, 2)}%</span>),
    sorter: true,
    filter: (dataIndex) => <ColumnNumberFilter
        onChangeFilter={onChangeFilter}
        filteredColumns={filteredColumns}
        dataIndex={dataIndex}
        percent={true}
    />
});

export const infoField = {
    title: '',
    dataIndex: 'info',
    key: 'info',
    width: '30px',
    render: text => <TitleInfo info={text} position="left" type="info"/>
};
