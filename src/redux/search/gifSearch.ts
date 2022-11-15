import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GifSuggestionOption} from '../../components';
import {ReduxState} from '../../types/redux';

const initialState: ReduxState = {
  loading: false,
  searchText: '',
  gifSuggestions: [],
};

const counterSlice = createSlice({
  name: 'gifSearch',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    initializeSearch: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchSuggestions: (
      state,
      action: PayloadAction<GifSuggestionOption[]>,
    ) => {
      if (action.payload.length > 0) {
        state.gifSuggestions = [...state.gifSuggestions, ...action.payload];
      } else {
        state.gifSuggestions = [];
      }
      state.loading = false;
    },
  },
});

export const {setSearchSuggestions, initializeSearch, setSearchText} =
  counterSlice.actions;
export default counterSlice.reducer;
