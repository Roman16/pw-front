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
        description: `Promote products to shoppers actively searching with related keywords or viewing similar products on Amazon.`,
        image: sponsoredProductsImage
    },
    {
        name: 'Sponsored Brands',
        description: `Showcase a collection of products to shoppers actively searching with related keywords on Amazon.`,
        image: sponsoredBrandsImage,
        soon: true
    },
    {
        name: 'Sponsored Display',
        description: `Re-engage shoppers off Amazon who viewed your products or similar products, and drive them to your detail pages.`,
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

    return (
        <div className={'choose-campaign-container'}>

            <section className='choose-campaign'>
                <h2>Welcome to Zero to Hero!</h2>
                <p className={'description'}>
                    Zero to Hero is a campaigns generation tool. By providing us basic information about your product,
                    our software will be able to perform an automatic keyword research and generate Semantic Core to
                    advertise your product. <br/> This also includes automatic generation of professional campaigns structure,
                    with unique campaigns fulfilling different advertising goals. You won't need to manually create
                    campaigns, ad groups or keywords - everything will be set up automatically and uploaded to your
                    Amazon account when finished.
                    <br/>
                    <br/>
                    To start, please choose campaigns type you wish to set up:
                </p>

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
                                {item.soon ? 'Coming Soon' : 'Start'}
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