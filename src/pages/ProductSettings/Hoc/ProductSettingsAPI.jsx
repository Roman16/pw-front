import React, { Component } from 'react';
import axios from 'axios';


const delay = 1000; // ms
const ProductSettingsApi = (ProductSettings) => (
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                dataSource: [],
            };
            this.timerId = null;
            this.timerIdSearch = null;
        }

        componentDidMount() {
            this.fetchData();
        }

        updateData = (data) => {
            axios.post('/api/product-settings/product-margin', { ...data })
                .then(({ data }) => {
                    console.log(data);
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                });
        };

        onSearchChange = (event) => {
            const { target: { value } } = event;

            clearTimeout(this.timerIdSearch);
            this.timerIdSearch = setTimeout(() => {
                this.fetchData(value);
            }, delay);
        };

        onSearchBlur = (event) => {
            const { target: { value } } = event;

            clearTimeout(this.timerIdSearch);
            this.fetchData(value);
        };

        fetchData = (searchText = '') => {
            let dataSource = [];

            axios.get('/api/product-settings', {
                params: {
                    search_query: searchText,
                },
            })
                .then(({ data }) => {
                    dataSource = data;
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    this.setState({ dataSource });
                });
        };

        onChangeRow = (...args) => {
            const dataSourceRow = this.setRowData(...args);

            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                this.updateData(dataSourceRow);
            }, delay);
        };

        setRowData = (event, item, index) => {
            const { dataSource } = this.state;
            const { target: { value } } = event;

            dataSource[index] = {
                ...dataSource[index],
                [item]: +value,
            };
            this.setState({
                dataSource: [...dataSource],
            });


            return dataSource[index];
        };

        onBlurRow = (...args) => {
            const dataSourceRow = this.setRowData(...args);

            clearTimeout(this.timerId);
            this.updateData(dataSourceRow);
        };

        render() {
            const { dataSource } = this.state;


            return (
                <ProductSettings
                    {...this.props}
                    dataSource={dataSource}
                    onChangeRow={this.onChangeRow}
                    onBlurRow={this.onBlurRow}
                    onSearchChange={this.onSearchChange}
                    onSearchBlur={this.onSearchBlur}

                />
            );
        }
    }

);

export default ProductSettingsApi;
