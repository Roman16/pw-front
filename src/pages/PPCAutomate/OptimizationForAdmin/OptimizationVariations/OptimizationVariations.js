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

let timeoutId = null

let defaultOptionsValue = optimizationOptions.map(item => item.value)

const OptimizationVariations = ({product, updateOptimizationOptions, selectedAll}) => {
    const [activeParams, setActiveParams] = useState([])

    const onChange = async (value) => {
        setActiveParams(value)

        defaultOptionsValue = value

        const params = {}

        optimizationOptions.forEach(item => {
            params[item.value] = value.includes(item.value)
        })

        // if (product.status === 'RUNNING') {
        //     clearTimeout(timeoutId)
        //     timeoutId = setTimeout(async () => {
        //         try {
        //             await productsServices.updateProductById({
        //                 ...product,
        //                 product_id: selectedAll ? 'all' : product.product_id,
        //                 ...params
        //             })
        //
        //             notification.success({title: 'Changes saved!'})
        //         } catch (e) {
        //             console.log(e)
        //         }
        //     }, 1000)
        // } else {
        //     updateOptimizationOptions(params)
        // }
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

    return (
        <section className='optimization-variations'>
            <h2>What do you want to optimize?</h2>

            <Checkbox.Group options={optimizationOptions} onChange={onChange} value={activeParams}/>
        </section>
    )
}

export default OptimizationVariations
