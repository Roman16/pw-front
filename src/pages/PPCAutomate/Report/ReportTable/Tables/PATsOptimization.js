import React from 'react';
import TitleInfo from '../../../../../components/Table/renders/TitleInfo';

export const patsOptimization = () => {
    return ([
        {
            title: 'Campaign',
            dataIndex: 'd_campaignName',
            key: 'd_campaignName',
            width: '150px',
            sorter: true,
        },
        {
            title: 'Ad Group',
            dataIndex: 'd_adGroupName',
            key: 'd_adGroupName',
            width: '150px',
            sorter: true,
        },
        {
            title: (
                <TitleInfo
                    position='top'
                    title="PAT type"
                    info="The type of Product Targeting. It can be a Manual or Auto."
                />
            ),
            dataIndex: 'd_patType',
            key: 'd_patType',
            width: '12em',
            render: str => <span className="capitalize-field">{str}</span>,
            sorter: true,
        },
        {
            title: (
                <TitleInfo
                    position='top'
                    title="PAT Value"
                    info="Manual Product Targetings have specific value assigned to them to match your ads to shoppers. Type of this value depends on PAT's Intent Type. For ASIN Intent Type value may be: B01F9RH0R4. For Category - Cell Phones & Accessories."
                />
            ),
            dataIndex: 'd_patValue',
            key: 'd_patValue',
            width: '150px',
            sorter: true,
        }
    ])
};