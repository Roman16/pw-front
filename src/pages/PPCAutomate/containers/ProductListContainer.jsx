import { connect } from 'react-redux';
import ProductList from '../components/ProductList';
import { fetchProductList } from '../store/action';
import { getProductList } from '../selectors';

const mapStateToProps = (state) => (
    {
        productList: getProductList(state),
    });

const mapDispatchToProps = (dispatch) => ({
    fetchProductList: (personId, filter) => (
        dispatch(fetchProductList(personId, filter))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
