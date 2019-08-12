import { connect } from 'react-redux';
import ProductList from '../components/ProductList';
import { fetchProductList, setActiveProduct } from '../store/action';
import { getProductList, getTotalProduct, getActiveProductId } from '../selectors';

const mapStateToProps = (state) => (
    {
        productList: getProductList(state),
        totalProduct: getTotalProduct(state),
        activeProductId: getActiveProductId(state),
    });

const mapDispatchToProps = (dispatch) => ({
    fetchProductList: (personId, filter) => (
        dispatch(fetchProductList(personId, filter))
    ),
    setActiveProduct: (activeProductId) => (
        dispatch(setActiveProduct(activeProductId))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
