import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import debounce from 'lodash.debounce';
import {fetchGifSuggestions} from '../../services/GIFService';
import {
  GifSuggestionOption,
  SearchBar,
  IndicatorSize,
  NoSearchResult,
  GifSuggestionItem,
  ActivityLoader,
} from '..';

import {
  setSearchSuggestions,
  setSearchText,
  initializeSearch,
} from '../../redux/search/gifSearch';
import {useReduxDispatch, useReduxSelector} from '../../redux';

const LIMIT = 8;
const INITIAL_OFFSET = 0;

export const GifSearch = () => {
  const {loading, searchText, gifSuggestions} = useReduxSelector(
    state => state.search,
  );
  const dispatch = useReduxDispatch();
  const [currentOffset, setCurrentOffset] = useState<number>(INITIAL_OFFSET);
  const [showNoResults, setShowNoResults] = useState<boolean>(false);

  const onChangeSearchText = (value: string) => {
    dispatch(setSearchText(value));
    if (value.length < 3) {
      dispatch(setSearchSuggestions([]));
    } else {
      debounce(async () => {
        dispatch(initializeSearch(true));
        const {data: suggestions} = await fetchGifSuggestions(
          value,
          LIMIT,
          INITIAL_OFFSET,
        );
        dispatch(setSearchSuggestions(suggestions));
      }, 500)();
    }
  };

  const onClearSearchText = () => {
    dispatch(setSearchText(''));
    setShowNoResults(false);
    dispatch(setSearchSuggestions([]));
  };

  const renderSuggestionItems = ({item}: {item: GifSuggestionOption}) => {
    return <GifSuggestionItem gifSuggestion={item} />;
  };

  const loadMoreGifs = async () => {
    dispatch(initializeSearch(true));
    const {data: suggestions} = await fetchGifSuggestions(
      searchText,
      LIMIT,
      currentOffset + LIMIT,
    );
    dispatch(setSearchSuggestions(suggestions));
    setCurrentOffset(currentOffset + LIMIT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <SearchBar
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
          onClearSearchText={onClearSearchText}
        />
        <View style={styles.listView}>
          {gifSuggestions?.length > 0 ? (
            <View
              style={styles.listContainer}
              testID={'location-suggestion-list'}
              accessibilityLabel={'location-suggestion-list'}>
              <FlatList
                data={gifSuggestions}
                style={styles.list}
                renderItem={renderSuggestionItems}
                numColumns={2}
                keyExtractor={(item, index) => `${item.id}${index}`}
              />
              <View style={styles.loadMore}>
                {loading ? (
                  <ActivityLoader size={IndicatorSize.SMALL} />
                ) : (
                  <TouchableOpacity onPress={loadMoreGifs}>
                    <Text style={styles.loadMoreText}>Load More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            showNoResults && <NoSearchResult />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  list: {},
  wrapper: {
    paddingHorizontal: 10,
    zIndex: 10,
  },
  listView: {
    position: 'relative',
  },
  listContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 500,
    width: '100%',
    top: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  loadMore: {
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#555364',
    fontFamily: 'NotoSans-Bold',
  },
  listItemContainer: {
    paddingRight: 16,
  },
});
