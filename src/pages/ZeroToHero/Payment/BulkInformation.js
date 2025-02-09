import React from "react"
import noImage from "../../../assets/img/no-image-available.svg"

const BulkInformation = ({product}) => {
    const job = product.job

    return (
        <div className="bulk-information">
            <div className="col">
                <div className="product">
                    <div className="image">
                        <img src={product.image_url || noImage} alt=""/>
                    </div>

                    <div className="col">
                        <h3>{product.name}</h3>
                        <div className="price">
                            {product.price ? `$${product.price}` : ''} $35.99
                        </div>

                        <div className="row">
                            <div><b>ASIN:</b> {product.asin}</div>
                            <div><b>SKU:</b> {product.sku}</div>
                        </div>
                    </div>
                </div>

                <ul>
                    <li>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="2" fill="#6959AB"/>
                            <circle cx="8" cy="17.6357" r="2" fill="#6959AB"/>
                            <circle cx="8" cy="27.2705" r="2" fill="#6959AB"/>
                            <circle cx="17.6362" cy="8" r="2" fill="#6959AB"/>
                            <circle cx="17.6362" cy="17.6357" r="2" fill="#6959AB"/>
                            <circle cx="17.6362" cy="27.2705" r="2" fill="#6959AB"/>
                            <circle cx="27.272" cy="8" r="2" fill="#6959AB"/>
                            <circle cx="27.272" cy="17.6357" r="2" fill="#6959AB"/>
                            <circle cx="27.272" cy="27.2705" r="2" fill="#6959AB"/>
                        </svg>

                        <div className="col">
                            <p>Total Keywords</p>
                            <h3>{job.keywords_count}</h3>
                        </div>
                    </li>
                    <li>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.6973 18C13.6973 18.851 13.9497 19.6829 14.4225 20.3904C14.8952 21.098 15.5672 21.6495 16.3534 21.9751C17.1396 22.3008 18.0048 22.386 18.8394 22.22C19.674 22.054 20.4407 21.6442 21.0424 21.0424C21.6442 20.4407 22.054 19.674 22.22 18.8394C22.386 18.0048 22.3008 17.1396 21.9751 16.3534C21.6495 15.5672 21.098 14.8952 20.3904 14.4225C19.6829 13.9497 18.851 13.6973 18 13.6973C16.8589 13.6973 15.7645 14.1506 14.9576 14.9576C14.1506 15.7645 13.6973 16.8589 13.6973 18ZM20.8101 18C20.8101 18.5575 20.6448 19.1026 20.335 19.5661C20.0252 20.0297 19.585 20.391 19.0699 20.6044C18.5548 20.8178 17.988 20.8736 17.4411 20.7648C16.8943 20.6561 16.392 20.3876 15.9978 19.9933C15.6035 19.5991 15.335 19.0968 15.2263 18.55C15.1175 18.0031 15.1733 17.4363 15.3867 16.9212C15.6001 16.4061 15.9614 15.9658 16.4249 15.6561C16.8885 15.3463 17.4336 15.181 17.9911 15.181C18.362 15.1798 18.7296 15.2519 19.0726 15.393C19.4157 15.5342 19.7275 15.7416 19.9902 16.0035C20.2529 16.2654 20.4613 16.5766 20.6036 16.9192C20.7458 17.2618 20.819 17.6291 20.819 18H20.8101ZM6.21068 14.8442C6.75911 12.771 7.8458 10.8796 9.36066 9.36157C10.8755 7.84359 12.7647 6.753 14.8368 6.2003C15.0256 6.15324 15.2254 6.18225 15.393 6.2811C15.5606 6.37994 15.6827 6.54069 15.7329 6.7287C15.7831 6.9167 15.7575 7.11691 15.6614 7.28617C15.5654 7.45543 15.4067 7.58018 15.2196 7.63353C13.4002 8.1184 11.7412 9.07555 10.4109 10.408C9.08049 11.7405 8.12594 13.4009 7.64392 15.2211C7.60251 15.3787 7.51032 15.5184 7.38159 15.6184C7.25287 15.7185 7.09477 15.7733 6.93175 15.7745C6.86819 15.7745 6.80488 15.7666 6.74332 15.7507C6.64912 15.7259 6.56072 15.6828 6.48319 15.6238C6.40566 15.5648 6.34051 15.4911 6.29146 15.4069C6.24242 15.3227 6.21043 15.2297 6.19733 15.1331C6.18424 15.0366 6.19029 14.9384 6.21513 14.8442H6.21068ZM29.8012 21.1588C29.245 23.2302 28.1538 25.119 26.6371 26.6357C25.1205 28.1523 23.2317 29.2435 21.1602 29.7997C21.0979 29.8167 21.0335 29.8252 20.9688 29.8249C20.7889 29.8248 20.6151 29.7593 20.4798 29.6406C20.3446 29.5219 20.2571 29.358 20.2337 29.1796C20.2103 29.0012 20.2525 28.8203 20.3526 28.6707C20.4526 28.5211 20.6036 28.413 20.7774 28.3665C22.5968 27.8776 24.2557 26.919 25.5877 25.5867C26.9197 24.2545 27.878 22.5954 28.3665 20.776C28.4172 20.5857 28.5415 20.4234 28.7119 20.3248C28.7963 20.2759 28.8895 20.2442 28.9861 20.2314C29.0828 20.2185 29.181 20.2249 29.2752 20.25C29.3694 20.2751 29.4578 20.3186 29.5352 20.3778C29.6126 20.4371 29.6776 20.5111 29.7264 20.5954C29.7753 20.6798 29.807 20.773 29.8198 20.8697C29.8327 20.9663 29.8263 21.0645 29.8012 21.1588ZM20.2507 6.72404C20.3015 6.53399 20.4257 6.3719 20.596 6.27341C20.7663 6.17491 20.9687 6.14808 21.1588 6.19881C23.2308 6.75151 25.12 7.8421 26.6349 9.36009C28.1497 10.8781 29.2364 12.7695 29.7849 14.8427C29.8097 14.9369 29.8158 15.0351 29.8027 15.1317C29.7896 15.2282 29.7576 15.3212 29.7085 15.4054C29.6595 15.4896 29.5943 15.5633 29.5168 15.6223C29.4393 15.6813 29.3509 15.7244 29.2567 15.7493C29.1952 15.7656 29.1319 15.7741 29.0682 15.7745C28.9045 15.7743 28.7453 15.7199 28.6157 15.6198C28.4861 15.5197 28.3932 15.3795 28.3516 15.2211C27.8696 13.4009 26.9151 11.7405 25.5847 10.408C24.2543 9.07555 22.5954 8.1184 20.776 7.63353C20.6817 7.60839 20.5933 7.56491 20.5159 7.50557C20.4385 7.44624 20.3735 7.37221 20.3247 7.28773C20.2759 7.20325 20.2443 7.10997 20.2316 7.01325C20.2189 6.91652 20.2254 6.81824 20.2507 6.72404ZM15.7493 29.276C15.7071 29.4338 15.614 29.5734 15.4844 29.6729C15.3548 29.7724 15.196 29.8264 15.0326 29.8264C14.968 29.8267 14.9036 29.8182 14.8412 29.8012C12.7698 29.245 10.881 28.1538 9.36434 26.6371C7.8477 25.1205 6.75653 23.2317 6.2003 21.1602C6.14954 20.97 6.17643 20.7674 6.27507 20.5969C6.37371 20.4265 6.53601 20.3022 6.72626 20.2515C6.91652 20.2007 7.11914 20.2276 7.28957 20.3263C7.45999 20.4249 7.58425 20.5872 7.63501 20.7774C8.12353 22.5969 9.08183 24.256 10.4138 25.5882C11.7458 26.9205 13.4047 27.8791 15.224 28.368C15.4141 28.4187 15.5762 28.5429 15.6747 28.7132C15.7732 28.8835 15.8 29.0859 15.7493 29.276ZM17.2582 9.33234V3.74184C17.2582 3.54509 17.3363 3.3564 17.4754 3.21728C17.6146 3.07816 17.8033 3 18 3C18.1967 3 18.3854 3.07816 18.5246 3.21728C18.6637 3.3564 18.7418 3.54509 18.7418 3.74184V9.33234C18.7418 9.52909 18.6637 9.71778 18.5246 9.8569C18.3854 9.99603 18.1967 10.0742 18 10.0742C17.8033 10.0742 17.6146 9.99603 17.4754 9.8569C17.3363 9.71778 17.2582 9.52909 17.2582 9.33234ZM33 18C33 18.1967 32.9218 18.3854 32.7827 18.5246C32.6436 18.6637 32.4549 18.7418 32.2582 18.7418H26.6677C26.4709 18.7418 26.2822 18.6637 26.1431 18.5246C26.004 18.3854 25.9258 18.1967 25.9258 18C25.9258 17.8033 26.004 17.6146 26.1431 17.4754C26.2822 17.3363 26.4709 17.2582 26.6677 17.2582H32.2582C32.4549 17.2582 32.6436 17.3363 32.7827 17.4754C32.9218 17.6146 33 17.8033 33 18ZM18.7418 26.6677V32.2582C18.7418 32.4549 18.6637 32.6436 18.5246 32.7827C18.3854 32.9218 18.1967 33 18 33C17.8033 33 17.6146 32.9218 17.4754 32.7827C17.3363 32.6436 17.2582 32.4549 17.2582 32.2582V26.6677C17.2582 26.4709 17.3363 26.2822 17.4754 26.1431C17.6146 26.004 17.8033 25.9258 18 25.9258C18.1967 25.9258 18.3854 26.004 18.5246 26.1431C18.6637 26.2822 18.7418 26.4709 18.7418 26.6677ZM9.33234 18.7418H3.74184C3.54509 18.7418 3.3564 18.6637 3.21728 18.5246C3.07816 18.3854 3 18.1967 3 18C3 17.8033 3.07816 17.6146 3.21728 17.4754C3.3564 17.3363 3.54509 17.2582 3.74184 17.2582H9.33234C9.52909 17.2582 9.71778 17.3363 9.8569 17.4754C9.99603 17.6146 10.0742 17.8033 10.0742 18C10.0742 18.1967 9.99603 18.3854 9.8569 18.5246C9.71778 18.6637 9.52909 18.7418 9.33234 18.7418Z"
                                fill="#6959AB" stroke="#6959AB" stroke-width="0.3"/>
                        </svg>

                        <div className="col">
                            <p>Total Product Targetings</p>
                            <h3>{job.product_targetings_count}</h3>
                        </div>
                    </li>
                    <li>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.353 18H24.0001" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                            <path
                                d="M30 18C30 24.6274 24.6274 30 18 30C11.3726 30 6 24.6274 6 18C6 11.3726 11.3726 6 18 6C19.2283 6 20.4135 6.18455 21.5294 6.52743"
                                stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                        </svg>

                        <div className="col">
                            <p>Total Negative Keywords</p>
                            <h3>{job.negative_keywords_count}</h3>
                        </div>
                    </li>
                    <li>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18H24" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                            <path
                                d="M13 6H7C6.44772 6 6 6.44772 6 7V13M13 30H7C6.44772 30 6 29.5523 6 29V23M23 30H29C29.5523 30 30 29.5523 30 29V23M23 6H29C29.5523 6 30 6.44772 30 7V13"
                                stroke="#6959AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <div className="col">
                            <p>Total Negative Product Targetings</p>
                            <h3>{job.negative_product_targetings_count}</h3>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="campaigns-count">
                <ul>
                    <li>
                        <b>{job.sponsored_products_campaigns_count}</b>
                        SP <br/> Campaigns
                    </li>
                    <li>
                        <b>{job.auto_campaigns_count}</b>
                        Auto <br/> Campaigns
                    </li>
                    <li>
                        <b>{job.keyword_campaigns_count}</b>
                        Keyword <br/> Campaigns
                    </li>
                    <li>
                        <b>{job.product_targeting_campaigns_count}</b>
                        Product Targeting <br/> Campaigns
                    </li>
                </ul>

                <div className="total">
                    Total Campaigns: {job.sponsored_products_campaigns_count + job.sponsored_display_campaigns_count}
                </div>
            </div>
        </div>
    )
}

export default BulkInformation