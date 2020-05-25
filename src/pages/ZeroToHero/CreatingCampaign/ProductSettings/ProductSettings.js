import React, {useState, useEffect} from "react";
import {productsServices} from "../../../../services/products.services";
import './ProductSettings.less';
import Slider from "react-slick";
// import leftArrow from '../../../../assets/img/icons/big-left-arrow.svg';
// import rightArrow from '../../../../assets/img/icons/big-right-arrow.svg';
import {Checkbox, Select, Input, Radio, DatePicker} from "antd";
// import calendarIcon from '../../../../assets/img/zero-to-hero/calendar-icon.svg';
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const Option = Select.Option;


function SampleNextArrow({onClick}) {
    return (<div className='next' onClick={onClick}>
        {/*<img src={rightArrow} alt=""/>*/}
    </div>)
}

function SamplePrevArrow({onClick}) {
    return (
        <div className='prev' onClick={onClick}>
            {/*<img src={leftArrow} alt=""/>*/}
        </div>
    );
}

const ProductSettings = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        productsServices.getProducts({
            size: 10,
            page: 1,
            searchStr: '',
            ungroupVariations: 0
        })
            .then(res => {
                setAllProducts(res.result)
            })
    }, []);

    return (
        <section className='product-settings'>
            <div className="products-slider">
                <Slider
                    infinite={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    dots={false}
                    nextArrow={<SampleNextArrow/>}
                    prevArrow={<SamplePrevArrow/>}
                >
                    {allProducts.map((product, index) => (
                        <div className="product-item" key={product.id}>
                            <div className="image">
                                <img src={product.image_url} alt=""/>
                            </div>

                            <div className="col">
                                <div className="product-name">
                                    {product.name}
                                </div>

                                <div className="row">
                                    <div className="price">$35.99</div>
                                    <div className="stock">In Stock</div>
                                </div>

                                <div className='asin-sku'>
                                    <span className="asin">ASIN: {product.asin}</span>
                                    <span className="sku">SKU: {product.sku}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>

            <div className="settings">
                <div className="col">
                    <Checkbox>Create portfolio</Checkbox>

                    <div className="input-group">
                        <label htmlFor="">Portfolio Name</label>
                        <Input
                            type="text"
                            placeholder={'Portfolio Name'}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="">Of use existing</label>
                        <Select>
                            <Option value={''}>Select</Option>
                        </Select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="">Your Brand Name</label>
                        <Input
                            type="text"
                            placeholder={'Brand Name'}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        <div className='date-picker'>
                            <div>
                                <label htmlFor="">Start date</label>
                                <DatePicker
                                    showToday={false}
                                    // disabledDate={this.disabledStartDate}
                                    // suffixIcon={<img src={calendarIcon} alt=""/>}
                                    format="DD MMM YYYY"
                                    // value={startValue}
                                    placeholder="Start date"
                                    // onChange={this.onStartChange}
                                    // onOpenChange={this.handleStartOpenChange}
                                    getCalendarContainer={trigger => trigger}
                                />
                            </div>
                            <div>
                                <label htmlFor="">End date</label>
                                <DatePicker
                                    showToday={false}
                                    // disabledDate={this.disabledEndDate}
                                    // suffixIcon={<img src={calendarIcon} alt=""/>}
                                    format="DD MMM YYYY"
                                    // value={endValue}
                                    placeholder="no end date"
                                    // onChange={this.onEndChange}
                                    // open={endOpen}
                                    // onOpenChange={this.handleEndOpenChange}
                                    getCalendarContainer={trigger => trigger}
                                />
                            </div>
                        </div>

                        <div className="bid">
                            <label htmlFor="">Default Bid</label>
                            <InputCurrency/>
                        </div>

                        <div className="daily-budget">
                            <label htmlFor="">What is Your Daily Budget ?</label>

                            <div>
                                <InputCurrency/>
                                <button className='btn default'>save</button>
                                <button className='btn grey'>cancel</button>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <Checkbox>Pause Campaigns when uploading to Amazon</Checkbox>
                    </div>

                    <div className="row bidding-strategy">
                        <div className="col">
                            <h3>Campaign bidding strategy</h3>

                            <Radio.Group defaultValue={1}>
                                <Radio value={1}>
                                    Dynamic bids - down only
                                </Radio>
                                <div className="radio-description">
                                    We’ll lower your bids in real time when your ad may be less likely to convert to a
                                    sale. Any campaigns created before January 2019 used this setting.
                                    <a href="">Learn more</a>
                                </div>

                                <Radio value={2}>
                                    Dynamic bids - up and down
                                </Radio>
                                <div className="radio-description">
                                    We’ll raise your bids (by a maximum of 100%) in real time when your ad may be more
                                    likely to convert to a sale, and lower your bids when less likely to convert to a
                                    sale
                                    <a href="">Learn more</a>
                                </div>

                                <Radio value={3}>
                                    Fixed bids
                                </Radio>
                                <div className="radio-description">
                                    We’ll use your exact bid and any manual adjustments you set, and won’t change your
                                    bids based on likelihood of sale
                                    <a href="">Learn more</a>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="col">
                            <h3>Adjust bids by placement</h3>
                            
                            <div className="percent-input-group">
                                <label htmlFor="">Top of search (first page)</label>
                                <InputCurrency typeIcon={'margin'}/>
                            </div>

                            <div className="percent-input-group">
                                <label htmlFor="">Product pages</label>
                                <InputCurrency typeIcon={'margin'}/>
                            </div>
                        </div>
                    </div>

                    <div className="row bidding-strategy-description">
                        <span>*</span> We highly recommend you to use Dynamic bids - down only for our PPC campaigns.
                    </div>
                </div>
            </div>

        </section>
    )
};

export default ProductSettings;
