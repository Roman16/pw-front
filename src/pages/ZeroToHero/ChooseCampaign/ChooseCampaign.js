import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import './ChooseCampaign.less'
import '../ZeroToHero.less'
import sponsoredProductsImage from '../../../assets/img/zth/sponsored-products-image.png'
import sponsoredBrandsImage from '../../../assets/img/zth/sponsored-brands-image.png'
import sponsoredDisplayImage from '../../../assets/img/zth/sponsored-display-image.png'
import {zthActions} from "../../../actions/zth.actions"
import {history} from "../../../utils/history"
import {zthServices} from "../../../services/zth.services"
import HasIncompleteBatch from "../components/HasIncompleteBatch/HasIncompleteBatch"

const campaigns = [
    {
        name: 'Sponsored Products',
        description: `Promote products to shoppers actively searching <br> with related keywords or viewing similar <br> products on Amazon.`,
        image: sponsoredProductsImage
    },
    {
        name: 'Sponsored Brands',
        description: `Showcase a collection of products to shoppers <br> actively searching with related keywords on <br> Amazon.`,
        image: sponsoredBrandsImage,
        soon: true
    },
    {
        name: 'Sponsored Display',
        description: `Re-engage shoppers off Amazon who viewed your <br> products or similar products, and drive them to your <br> detail pages.`,
        image: sponsoredDisplayImage,
        soon: true
    }
]

const ChooseCampaign = () => {
    const [hasIncompleteBatch, setIncompleteBatch] = useState(false),
        [visibleWindow, setVisibleWindow] = useState(false)

    const dispatch = useDispatch()

    function handleContinue(campaign) {
        if (hasIncompleteBatch.status === 'DRAFT') {
            setVisibleWindow(true)
        } else {
            dispatch(zthActions.setCampaign(campaign))
            history.push('/zero-to-hero/creating')
        }
    }

    useEffect(() => {
        zthServices.checkIncompleteBatch()
            .then(res => {
                if (res.result !== null) {
                    setIncompleteBatch(res.result)
                }
            })
    }, [])

    return (
        <div className={'choose-campaign-container'}>

            <section className='choose-campaign'>
                <h2>Choose Your Campaign Type</h2>

                <ul className="campaign-types">
                    {campaigns.map(item => (
                        <li>
                            <img src={item.image} alt=""/>
                            <h3>{item.name}</h3>
                            <p dangerouslySetInnerHTML={{__html: item.description}}/>

                            <button
                                className='sds-btn default'
                                disabled={item.soon}
                                onClick={() => handleContinue('sponsored_products')}
                            >
                                {item.soon ? 'Coming Soon' : 'Continue'}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {visibleWindow && <HasIncompleteBatch visible onChange={() => setIncompleteBatch(false)}/>}
        </div>
    )
}

export default ChooseCampaign