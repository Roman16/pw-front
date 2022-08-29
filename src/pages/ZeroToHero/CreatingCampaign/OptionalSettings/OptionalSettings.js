import React from "react"
import BiddingStrategies from "./BiddingStrategies/BiddingStrategies"
import RelevantKeywords from "./RelevantKeywords/RelevantKeywords"
import NegativeKeywords from "./NegativeKeywords/NegativeKeywords"
import './OptionalSettings.less'

const OptionalSettings = ({product, onUpdate}) => {

    return (<section className={'optional-settings'}>
        <h4>
            This step is optional. Next settings are not required for successful generation of Zero to Hero campaigns,
            but <br/>
            can be used to fine-tune campaigns to your preference or provide additional information about keywords.
        </h4>

        <BiddingStrategies
            campaigns={product.campaigns}
            onUpdate={onUpdate}
        />

        <RelevantKeywords
            keywords={product.relevant_keywords}
            onUpdate={onUpdate}
        />

        <NegativeKeywords
            keywords={product.negative_keywords}
            onUpdate={onUpdate}
        />
    </section>)
}

export default OptionalSettings