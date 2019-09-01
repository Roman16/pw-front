import { connect } from 'react-redux';
import ProductMain from '../template/ProductMain';
import { fetchProductIdData } from '../store/action';
import { getActiveProductId } from '../selectors';

const mapStateToProps = (state) => (
    {
        activeProductId: getActiveProductId(state),
    });

const mapDispatchToProps = (dispatch) => ({
    fetchProductIdData: (productId) => (
        dispatch(fetchProductIdData(productId))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductMain);
