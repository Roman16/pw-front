import axios from 'axios';


export const fetchProductList = () => (
    axios.post('https://profitwhales.com/ppc-automation/product?page=1&size=2')
        .then((response) => response)

);
