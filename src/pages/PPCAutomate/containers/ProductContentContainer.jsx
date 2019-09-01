import { connect } from 'react-redux';
import ProductContent from '../components/ProductContent';
import { updateProductIdData, saveProductIdData } from '../store/action';
import {
    getProductIdData,
    getActiveProductId,
    getSaveProductIdData,
    getLastChanges,
    getInValidError,
} from '../selectors';

const mapStateToProps = (state) => (
    {

        activeProductId: getActiveProductId(state),
        productIdData: getProductIdData(state),
        saveProductIdData: getSaveProductIdData(state),
        lastChanges: getLastChanges(state),
        inValidError: getInValidError(state),
    });

const mapDispatchToProps = (dispatch) => ({
    updateProductIdData: (data) => (
        dispatch(updateProductIdData(data))
    ),
    saveProductIdData: (status) => (
        dispatch(saveProductIdData(status))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContent);
