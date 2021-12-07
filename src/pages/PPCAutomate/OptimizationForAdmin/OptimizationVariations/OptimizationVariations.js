import React, {useEffect, useState} from "react"
import './OptimizationVariations.less'
import {Checkbox} from 'antd'
import {productsServices} from "../../../../services/products.services"
import {notification} from "../../../../components/Notification"


export const optimizationOptions = [
    {label: 'Bid Optimization Keywords', value: 'bid_optimization_keywords'},
    {label: 'Bid Optimization PAT', value: 'bid_optimization_pats'},
    {label: 'Activate Keywords', value: 'activation_keywords'},
    {label: 'Activate PATs', value: 'activation_pats'},
    {label: 'Pause Bleeding Keywords', value: 'pause_bad_keywords'},
    {label: 'Pause Bleeding PATs', value: 'pause_bad_pats'},
    {label: 'Remove Duplicates', value: 'remove_duplicates'},
    {label: 'Harvest & Rank New Keywords', value: 'harvest_good_search_terms'},
    {label: 'Add Bad ST to Negatives', value: 'add_bad_search_terms_to_negatives'},
]

const OptimizationVariations = ({product, onUpdateField}) => {

    return (
        <section className='optimization-variations'>
            <div className="section-header">
                <h2>What do you want to automate?</h2>
            </div>

            <div className="variation-list">
                {optimizationOptions.map(item => (
                    <Checkbox
                        onChange={(e) => onUpdateField(item.value, e.target.checked)}
                        checked={product[item.value]}
                    >
                        {item.label}
                    </Checkbox>
                ))}
            </div>
        </section>
    )
}

export default OptimizationVariations
