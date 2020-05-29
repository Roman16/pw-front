import React from "react";
import {SVG} from "../../../../utils/icons";

const RelevantKeywords = () => {

    return (
        <section className={'relevant-keywords'}>
            <div className="section-header">
                <div className="container">
                    <h2>Relevant keywords <span className={'optional'}>optional</span></h2>

                    <button><SVG id='select-icon'/></button>
                </div>
            </div>

        </section>
    )
};

export default RelevantKeywords;