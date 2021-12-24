import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import ProductFetchActions from '../store/action-creators';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ProductFetchActions, dispatch);
}