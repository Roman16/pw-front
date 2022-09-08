import React, {useState} from "react"
import {Dropdown, Input, Menu, Switch, Select} from "antd"
import {SVG} from "../../../../utils/icons"
import CustomSelect from "../../../../components/Select/Select"

const {Search} = Input,
    Option = Select.Option

const Filters = ({
                     onSearch,
                     onApplyFilter,
                     onlyOndayparting,
                     onChangeSwitch,
                     onSetMultiselect,
                     multiselect,
                     selectedCampaign
                 }) => {

    const [visibleDropdown, setVisibleDropdown] = useState(false),
        [campaign_type, setCampaignType] = useState('all'),
        [campaign_status, setCampaignStatus] = useState('all')

    const applyFilterHandler = () => {
        onApplyFilter({
            campaign_type,
            campaign_status
        })

        setVisibleDropdown(false)
    }

    const resetFilterHandler = () => {
        if (campaign_type !== 'all' || campaign_status !== 'all') {
            setCampaignType('all')
            setCampaignStatus('all')
            onApplyFilter({
                campaign_type: 'all',
                campaign_status: 'all'
            })
        }

        setVisibleDropdown(false)
    }

    const dropdownWindow = (
        <Menu className={'filter-dropdown-window'}>
            <div className="row">
                <div className="form-group">
                    <label htmlFor="">Campaign Status</label>

                    <CustomSelect value={campaign_status} onChange={value => setCampaignStatus(value)}>
                        <Option value={'all'}>All</Option>
                        <Option value={'enabled'}>Enabled</Option>
                        <Option value={'paused'}>Paused</Option>
                    </CustomSelect>
                </div>
            </div>

            <div className="buttons">
                <button className={'btn white'} onClick={resetFilterHandler}>Reset</button>
                <button className={'btn default'} onClick={applyFilterHandler}>Apply</button>
            </div>
        </Menu>
    )

    return (
        <div className="filters-block">
            <div className="row">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by campaign name'}
                        onChange={e => onSearch(e.target.value)}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <Dropdown
                    visible={visibleDropdown}
                    onVisibleChange={() => setVisibleDropdown(prevState => !prevState)}

                    overlay={dropdownWindow}
                    trigger={['click']}
                    placement={'bottomRight'}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                    <button className={'filters'}>
                        <SVG id={'filter-icon'}/>
                    </button>
                </Dropdown>
            </div>

            <div className="row">
                <div className={'multi-select-switch'}>
                    <button title={'Select all on this page'} className={`btn`} onClick={() => onSetMultiselect('all')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11106 13.3337H1C0.447715 13.3337 0 13.7815 0 14.3337V19.0002C0 19.5525 0.447715 20.0002 1 20.0002H5.66649C6.21877 20.0002 6.66649 19.5525 6.66649 19.0002V18.8882H2.11106C1.55878 18.8882 1.11106 18.4405 1.11106 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11106 6.6665H1C0.447715 6.6665 0 6.21879 0 5.6665V1.00002C0 0.447733 0.447715 1.7643e-05 1 1.7643e-05H5.66649C6.21877 1.7643e-05 6.66649 0.447733 6.66649 1.00002V1.1133H2.11106C1.55878 1.1133 1.11106 1.56101 1.11106 2.1133V6.6665Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 13.3337H18.999C19.5513 13.3337 19.999 13.7815 19.999 14.3337V19.0002C19.999 19.5525 19.5513 20.0002 18.999 20.0002H14.3325C13.7803 20.0002 13.3325 19.5525 13.3325 19.0002V18.8882H17.888C18.4402 18.8882 18.888 18.4405 18.888 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 6.6665H18.999C19.5513 6.6665 19.999 6.21879 19.999 5.6665V1.00002C19.999 0.447733 19.5513 1.7643e-05 18.999 1.7643e-05H14.3325C13.7803 1.7643e-05 13.3325 0.447733 13.3325 1.00002V1.1133H17.888C18.4402 1.1133 18.888 1.56101 18.888 2.1133V6.6665Z"/>
                            <path
                                d="M3 3.4505C3 3.20197 3.20148 3.00049 3.45001 3.00049H5.04999C5.29852 3.00049 5.5 3.20197 5.5 3.4505V5.05048C5.5 5.29901 5.29852 5.50049 5.04999 5.50049H3.45001C3.20148 5.50049 3 5.29901 3 5.05048V3.4505Z"/>
                            <path
                                d="M3 11.4505C3 11.202 3.20148 11.0005 3.45001 11.0005H5.04999C5.29852 11.0005 5.5 11.202 5.5 11.4505V13.0505C5.5 13.299 5.29852 13.5005 5.04999 13.5005H3.45001C3.20148 13.5005 3 13.299 3 13.0505V11.4505Z"/>
                            <path
                                d="M11 11.4505C11 11.202 11.2015 11.0005 11.45 11.0005H13.05C13.2985 11.0005 13.5 11.202 13.5 11.4505V13.0505C13.5 13.299 13.2985 13.5005 13.05 13.5005H11.45C11.2015 13.5005 11 13.299 11 13.0505V11.4505Z"/>
                            <path
                                d="M3 7.4505C3 7.20197 3.20148 7.00049 3.45001 7.00049H5.04999C5.29852 7.00049 5.5 7.20197 5.5 7.4505V9.05048C5.5 9.29901 5.29852 9.50049 5.04999 9.50049H3.45001C3.20148 9.50049 3 9.29901 3 9.05048V7.4505Z"/>
                            <path
                                d="M3 15.4505C3 15.202 3.20148 15.0005 3.45001 15.0005H5.04999C5.29852 15.0005 5.5 15.202 5.5 15.4505V17.0505C5.5 17.299 5.29852 17.5005 5.04999 17.5005H3.45001C3.20148 17.5005 3 17.299 3 17.0505V15.4505Z"/>
                            <path
                                d="M11 15.4505C11 15.202 11.2015 15.0005 11.45 15.0005H13.05C13.2985 15.0005 13.5 15.202 13.5 15.4505V17.0505C13.5 17.299 13.2985 17.5005 13.05 17.5005H11.45C11.2015 17.5005 11 17.299 11 17.0505V15.4505Z"/>
                            <path
                                d="M11 3.4505C11 3.20197 11.2015 3.00049 11.45 3.00049H13.05C13.2985 3.00049 13.5 3.20197 13.5 3.4505V5.05048C13.5 5.29901 13.2985 5.50049 13.05 5.50049H11.45C11.2015 5.50049 11 5.29901 11 5.05048V3.4505Z"/>
                            <path
                                d="M11 7.4505C11 7.20197 11.2015 7.00049 11.45 7.00049H13.05C13.2985 7.00049 13.5 7.20197 13.5 7.4505V9.05048C13.5 9.29901 13.2985 9.50049 13.05 9.50049H11.45C11.2015 9.50049 11 9.29901 11 9.05048V7.4505Z"/>
                            <path
                                d="M7 3.4505C7 3.20197 7.20148 3.00049 7.45001 3.00049H9.04999C9.29852 3.00049 9.5 3.20197 9.5 3.4505V5.05048C9.5 5.29901 9.29852 5.50049 9.04999 5.50049H7.45001C7.20148 5.50049 7 5.29901 7 5.05048V3.4505Z"/>
                            <path
                                d="M7 11.4505C7 11.202 7.20148 11.0005 7.45001 11.0005H9.04999C9.29852 11.0005 9.5 11.202 9.5 11.4505V13.0505C9.5 13.299 9.29852 13.5005 9.04999 13.5005H7.45001C7.20148 13.5005 7 13.299 7 13.0505V11.4505Z"/>
                            <path
                                d="M15 11.4505C15 11.202 15.2015 11.0005 15.45 11.0005H17.05C17.2985 11.0005 17.5 11.202 17.5 11.4505V13.0505C17.5 13.299 17.2985 13.5005 17.05 13.5005H15.45C15.2015 13.5005 15 13.299 15 13.0505V11.4505Z"/>
                            <path
                                d="M7 7.4505C7 7.20197 7.20148 7.00049 7.45001 7.00049H9.04999C9.29852 7.00049 9.5 7.20197 9.5 7.4505V9.05048C9.5 9.29901 9.29852 9.50049 9.04999 9.50049H7.45001C7.20148 9.50049 7 9.29901 7 9.05048V7.4505Z"/>
                            <path
                                d="M7 15.4505C7 15.202 7.20148 15.0005 7.45001 15.0005H9.04999C9.29852 15.0005 9.5 15.202 9.5 15.4505V17.0505C9.5 17.299 9.29852 17.5005 9.04999 17.5005H7.45001C7.20148 17.5005 7 17.299 7 17.0505V15.4505Z"/>
                            <path
                                d="M15 15.4505C15 15.202 15.2015 15.0005 15.45 15.0005H17.05C17.2985 15.0005 17.5 15.202 17.5 15.4505V17.0505C17.5 17.299 17.2985 17.5005 17.05 17.5005H15.45C15.2015 17.5005 15 17.299 15 17.0505V15.4505Z"/>
                            <path
                                d="M15 3.4505C15 3.20197 15.2015 3.00049 15.45 3.00049H17.05C17.2985 3.00049 17.5 3.20197 17.5 3.4505V5.05048C17.5 5.29901 17.2985 5.50049 17.05 5.50049H15.45C15.2015 5.50049 15 5.29901 15 5.05048V3.4505Z"/>
                            <path
                                d="M15 7.4505C15 7.20197 15.2015 7.00049 15.45 7.00049H17.05C17.2985 7.00049 17.5 7.20197 17.5 7.4505V9.05048C17.5 9.29901 17.2985 9.50049 17.05 9.50049H15.45C15.2015 9.50049 15 9.29901 15 9.05048V7.4505Z"/>
                        </svg>
                    </button>

                    <button title={'Multi-campaigns Dayparting mode'} className={`btn ${multiselect ? 'active' : ''}`} onClick={() => onSetMultiselect(true)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11105 13.3337H1C0.447715 13.3337 0 13.7815 0 14.3337V19.0002C0 19.5525 0.447715 20.0002 1 20.0002H5.66649C6.21877 20.0002 6.66649 19.5525 6.66649 19.0002V18.8882H2.11105C1.55877 18.8882 1.11105 18.4405 1.11105 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11105 6.6665H1C0.447715 6.6665 0 6.21879 0 5.6665V1.00002C0 0.447733 0.447715 1.7643e-05 1 1.7643e-05H5.66649C6.21877 1.7643e-05 6.66649 0.447733 6.66649 1.00002V1.1133H2.11105C1.55877 1.1133 1.11105 1.56101 1.11105 2.1133V6.6665Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 13.3337H18.999C19.5513 13.3337 19.999 13.7815 19.999 14.3337V19.0002C19.999 19.5525 19.5513 20.0002 18.999 20.0002H14.3325C13.7803 20.0002 13.3325 19.5525 13.3325 19.0002V18.8882H17.888C18.4403 18.8882 18.888 18.4405 18.888 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 6.6665H18.999C19.5513 6.6665 19.999 6.21879 19.999 5.6665V1.00002C19.999 0.447733 19.5513 1.7643e-05 18.999 1.7643e-05H14.3325C13.7803 1.7643e-05 13.3325 0.447733 13.3325 1.00002V1.1133H17.888C18.4403 1.1133 18.888 1.56101 18.888 2.1133V6.6665Z"/>
                            <path
                                d="M3.33301 4.3335C3.33301 3.78121 3.78072 3.3335 4.33301 3.3335H7.88841C8.4407 3.3335 8.88841 3.78121 8.88841 4.3335V7.8889C8.88841 8.44119 8.4407 8.8889 7.88841 8.8889H4.33301C3.78072 8.8889 3.33301 8.44119 3.33301 7.8889V4.3335Z"/>
                            <path
                                d="M3.33301 11.5579C3.33301 11.0056 3.78072 10.5579 4.33301 10.5579H7.88841C8.4407 10.5579 8.88841 11.0056 8.88841 11.5579V15.1133C8.88841 15.6656 8.4407 16.1133 7.88841 16.1133H4.33301C3.78072 16.1133 3.33301 15.6656 3.33301 15.1133V11.5579Z"/>
                            <path
                                d="M11.1104 4.33374C11.1104 3.78146 11.5581 3.33374 12.1104 3.33374H15.6658C16.218 3.33374 16.6658 3.78146 16.6658 4.33374V7.88914C16.6658 8.44143 16.218 8.88914 15.6658 8.88914H12.1104C11.5581 8.88914 11.1104 8.44143 11.1104 7.88914V4.33374Z"/>
                            <path
                                d="M11.1104 11.5579C11.1104 11.0056 11.5581 10.5579 12.1104 10.5579H15.6658C16.218 10.5579 16.6658 11.0056 16.6658 11.5579V15.1133C16.6658 15.6656 16.218 16.1133 15.6658 16.1133H12.1104C11.5581 16.1133 11.1104 15.6656 11.1104 15.1133V11.5579Z"/>
                        </svg>
                    </button>

                    <button title={'Single campaign Dayparting mode'} className={`btn ${!multiselect ? 'active' : ''}`} onClick={() => onSetMultiselect(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11106 13.3337H1C0.447715 13.3337 0 13.7815 0 14.3337V19.0002C0 19.5525 0.447715 20.0002 1 20.0002H5.66649C6.21877 20.0002 6.66649 19.5525 6.66649 19.0002V18.8882H2.11106C1.55878 18.8882 1.11106 18.4405 1.11106 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.11106 6.6665H1C0.447715 6.6665 0 6.21879 0 5.6665V1.00002C0 0.447733 0.447715 1.7643e-05 1 1.7643e-05H5.66649C6.21877 1.7643e-05 6.66649 0.447733 6.66649 1.00002V1.1133H2.11106C1.55878 1.1133 1.11106 1.56101 1.11106 2.1133V6.6665Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 13.3337H18.999C19.5513 13.3337 19.999 13.7815 19.999 14.3337V19.0002C19.999 19.5525 19.5513 20.0002 18.999 20.0002H14.3325C13.7803 20.0002 13.3325 19.5525 13.3325 19.0002V18.8882H17.888C18.4402 18.8882 18.888 18.4405 18.888 17.8882V13.3337Z"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M18.888 6.6665H18.999C19.5513 6.6665 19.999 6.21879 19.999 5.6665V1.00002C19.999 0.447733 19.5513 1.7643e-05 18.999 1.7643e-05H14.3325C13.7803 1.7643e-05 13.3325 0.447733 13.3325 1.00002V1.1133H17.888C18.4402 1.1133 18.888 1.56101 18.888 2.1133V6.6665Z"/>
                            <path
                                d="M3.33301 4.3335C3.33301 3.78121 3.78072 3.3335 4.33301 3.3335H7.88841C8.4407 3.3335 8.88841 3.78121 8.88841 4.3335V7.8889C8.88841 8.44119 8.4407 8.8889 7.88841 8.8889H4.33301C3.78072 8.8889 3.33301 8.44119 3.33301 7.8889V4.3335Z"/>
                        </svg>
                    </button>

                    {multiselect && <div className="select-count">
                        <b>{selectedCampaign.length}</b> selected on <br/> <b>this page</b>
                    </div>}
                </div>

                <div className="active-only">
                    <Switch
                        className={'dark'}
                        checked={onlyOndayparting}
                        onChange={onChangeSwitch}
                    />

                    <label htmlFor="">On dayparting only</label>
                </div>
            </div>
        </div>
    )
}

export default Filters