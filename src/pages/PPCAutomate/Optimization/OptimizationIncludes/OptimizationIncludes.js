import React from "react";
import './OptimizationIncludes.less';
import {useSelector} from "react-redux";
import {Checkbox} from 'antd';


const includesList = [
    'Adding profitable Search Terms',
    'Pausing Unprofitable Keywords',
    'Proper Budget Allocation',
    'Ad Positions Testing',
    'Data-Driven Bid Management',
    'Adding Negative Keywords',
    'Keywords Indexation Mode',
    'Prevents Search Terms Competition',
];

const options = [
    {label: 'Adding profitable Search', value: 'Apple'},
    {label: 'Pausing Unprofitable', value: 'Pear'},
    {label: 'Proper Budget Allocation', value: 'Orange1'},
    {label: 'Ad Positions Testing', value: 'Orange2'},
    {label: 'Data-Driven Bid Management', value: 'Orange3'},
];

const OptimizationIncludes = () => {

    const {isAgencyUser} = useSelector(state => ({
        isAgencyUser: state.user.user.is_agency_client
    }));

    const onChange = (value) => {
        console.log(value);
    };

    if (false) {
        return (
            <section className='optimization-includes'>
                <h3>What do you want to optimize?</h3>

                <Checkbox.Group options={options} onChange={onChange}/>
            </section>
        )
    } else {
        return (
            <section className='optimization-includes'>
                <h3>Automation includes:</h3>

                <ul>
                    {includesList.map(item => <li>{item}</li>)}
                </ul>
            </section>
        )
    }

};

export default OptimizationIncludes;