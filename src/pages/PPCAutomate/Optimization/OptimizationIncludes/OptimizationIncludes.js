import React, {useEffect, useState} from "react"
import './OptimizationIncludes.less'
import {Checkbox} from 'antd'
import {productsServices} from "../../../../services/products.services"
import {notification} from "../../../../components/Notification"

const includesList = [
    'Adding profitable Search Terms',
    'Keywords Indexation Mode',
    'Data-Driven Bid Management',
    'Proper Budget Allocation',
    'Adding Negative Keywords',
    'Ad Positions Testing',
    'Pausing Unprofitable Keywords',
    'Prevents Search Terms Competition',
]

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

let timeoutId = null

let defaultOptionsValue = optimizationOptions.map(item => item.value)

const OptimizationIncludes = ({product, updateOptimizationOptions, selectedAll}) => {
    const [activeParams, setActiveParams] = useState([])

    const isAdmin = !!localStorage.getItem('adminToken')

    const onChange = async (value) => {
        setActiveParams(value)

        defaultOptionsValue = value

        const params = {}

        optimizationOptions.forEach(item => {
            params[item.value] = value.includes(item.value)
        })

        if (product.status === 'RUNNING') {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(async () => {
                try {
                    await productsServices.updateProductById({
                        ...product,
                        product_id: selectedAll ? 'all' : product.product_id,
                        ...params
                    })

                    notification.success({title: 'Changes saved!'})
                } catch (e) {
                    console.log(e)
                }
            }, 1000)
        } else {
            updateOptimizationOptions(params)
        }
    }

    useEffect(() => {
        setActiveParams(optimizationOptions.map(item => (product[item.value] && item.value)))

        if (!product.status || product.status !== 'RUNNING') {
            const params = {}

            optimizationOptions.forEach(item => {
                params[item.value] = !!defaultOptionsValue.includes(item.value)
            })

            setActiveParams(defaultOptionsValue)
            updateOptimizationOptions(params)
        }
    }, [product.product_id])

    if (isAdmin) {
        return (
            <section className='optimization-includes'>
                <h3>What do you want to optimize?</h3>

                <Checkbox.Group options={optimizationOptions} onChange={onChange} value={activeParams}/>
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
}

export default OptimizationIncludes