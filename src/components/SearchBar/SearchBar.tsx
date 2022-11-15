import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {ActivityLoader, IndicatorSize} from '..';
import SvgCross from '../../assets/icons/SvgCross';
import SvgSearch from '../../assets/icons/SvgSearch';
import {useReduxSelector} from '../../redux';

type SearchBarProps = {
  searchText: string;
  onChangeSearchText: (value: string) => void;
  onClearSearchText: () => void;
};

export const SearchBar = ({
  searchText,
  onChangeSearchText,
  onClearSearchText,
}: SearchBarProps) => {
  const [searchViewFocused, setSearchViewFocused] = useState<boolean>(false);
  const styles = useStyles();
  const {loading} = useReduxSelector(state => state.search);

  return (
    <View style={styles.searchBoxContainer}>
      <View
        style={[styles.searchBox, searchViewFocused && styles.searchBarActive]}
        testID={'search-box'}
        accessibilityLabel={'search-box'}>
        <View style={styles.searchIcon}>
          {loading ? (
            <ActivityLoader size={IndicatorSize.SMALL} />
          ) : (
            <SvgSearch color={'#666'} />
          )}
        </View>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'#999'}
          placeholder={'Search GIFs'}
          onChangeText={onChangeSearchText}
          value={searchText}
          onFocus={() => setSearchViewFocused(true)}
          onBlur={() => setSearchViewFocused(false)}
          textAlignVertical={'center'}
          autoComplete={'off'}
          testID={'search-text-input'}
        />
        {searchText !== '' && (
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={onClearSearchText}>
            <SvgCross color={'#666'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    clearIcon: {
      margin: 8,
    },
    searchBarActive: {
      borderColor: '#666',
    },
    searchBox: {
      alignItems: 'center',
      backgroundColor: '#d8d2d2',
      borderColor: '#d8d2d2',
      borderRadius: 8,
      borderWidth: 2.2,
      flexDirection: 'row',
      width: '100%',
      height: 55,
    },
    searchBoxContainer: {
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    searchIcon: {
      margin: 16,
    },
    searchInput: {
      flex: 1,
      lineHeight: 20,
      paddingVertical: 8,
      fontSize: 14,
      fontFamily: 'NotoSans',
      fontWeight: '600',
    },
  });
};
