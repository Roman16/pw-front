import React, {useState} from "react";
import './OptimizationIncludes.less';
import {useSelector} from "react-redux";
import {Checkbox} from 'antd';
import {productsServices} from "../../../../services/products.services";
import {notification} from "../../../../components/Notification";

const includesList = [
    'Adding profitable Search Terms',
    'Keywords Indexation Mode',
    'Data-Driven Bid Management',
    'Proper Budget Allocation',
    'Adding Negative Keywords',
    'Ad Positions Testing',
    'Pausing Unprofitable Keywords',
    'Prevents Search Terms Competition',
];

const options = [
    {label: 'Bid Optimization', value: 'BidOptimizationKeywords'},
    {label: 'Bid Optimization PAT', value: 'BidOptimizationPATs'},
    {label: 'Active Keywords', value: 'ActivationKeywords'},
    {label: 'Active PATs', value: 'ActivationPATs'},
    {label: 'Pause Bleeding Keywords', value: 'PauseBadKeywords'},
    {label: 'Pause Bleeding PATs', value: 'PauseBadPATs'},
    {label: 'Remove Duplicates', value: 'RemoveDuplicates'},
    {label: 'Harvest & Rank New Keywords', value: 'HarvestGoodSearchTerms'},
    {label: 'Add Bad ST to Negatives', value: 'AddBadSearchTermsToNegatives'},
];

let timeoutId = null;

const OptimizationIncludes = ({product, updateOptimizationOptions, selectedAll}) => {
    const [activeParams, setActiveParams] = useState([]);

    const {isAgencyUser} = useSelector(state => ({
        isAgencyUser: state.user.user.is_agency_client
    }));


    const onChange = async (value) => {
        setActiveParams(value);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            if (product.status === 'RUNNING') {
                try {
                    await productsServices.updateProductById({
                        ...product,
                        product_id: selectedAll ? 'all' : product.productId,
                        ...options.map(item => ({[item.value]: value.includes(item.value)}))
                    });

                    notification.success('Changes saved!')
                } catch (e) {
                    console.log(e);
                }
            } else {
                updateOptimizationOptions(options.map(item => ({[item.value]: value.includes(item.value)})))
            }
            console.log(value);
        }, 1000);
    };

    if (isAgencyUser) {
        return (
            <section className='optimization-includes'>
                <h3>What do you want to optimize?</h3>

                <Checkbox.Group options={options} onChange={onChange} value={activeParams}/>
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