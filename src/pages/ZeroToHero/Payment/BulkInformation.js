import React from "react"

const BulkInformation = ({zthBulk}) => {


    return (
        <div className="bulk-information">
            <div className="col">
                <div className="product">

                </div>

                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div className="campaigns-count">
                <div className="total">
                    Total Campaigns: 35
                </div>

                <ul>
                    <li>
                        <b>7</b>
                        SP <br/> Campaigns
                    </li>
                    <li>
                        <b>10</b>
                        SD <br/> Campaigns
                    </li>
                    <li>
                        <b>4</b>
                        Auto <br/> Campaigns
                    </li>
                    <li>
                        <b>9</b>
                        Keyword <br/> Campaigns
                    </li>
                    <li>
                        <b>5</b>
                        Product Targeting <br/> Campaigns
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BulkInformation