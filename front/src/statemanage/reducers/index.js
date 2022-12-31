import { combineReducers } from 'redux';
import addcartReducer from './addcartReducer';

const rootReducers = combineReducers({
    addcartReducer : addcartReducer
})

export default rootReducers;