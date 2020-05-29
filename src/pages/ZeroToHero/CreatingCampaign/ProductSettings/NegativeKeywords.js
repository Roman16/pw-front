import React from "react";
import {SVG} from "../../../../utils/icons";

const NegativeKeywords = () => {

    return (
        <section className={'negative-keywords'}>
            <div className="section-header">
                <div className="container">
                    <h2>Negative keywords <span className={'optional'}>optional</span></h2>

                    <button><SVG id='select-icon'/></button>
                </div>
            </div>

        </section>
    )
};

export default NegativeKeywords;