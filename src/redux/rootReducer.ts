import {combineReducers} from '@reduxjs/toolkit';
import searchReducer from './search/gifSearch';

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
