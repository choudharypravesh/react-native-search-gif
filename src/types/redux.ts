import {GifSuggestionOption} from '../components';

export interface ReduxState {
  loading: boolean;
  searchText: string;
  gifSuggestions: GifSuggestionOption[];
}
