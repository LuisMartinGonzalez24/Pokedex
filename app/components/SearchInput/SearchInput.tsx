import React, { useState, useEffect } from 'react'
import { ActivityIndicator, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import { styles } from './styles';

interface SearchInputProps {
    onDebounce: (value: string) => void;
    additionalStyles?: ViewStyle | ViewStyle[];
}

const SearchInput = ({ onDebounce, additionalStyles }: SearchInputProps) => {

    const [textValue, settextValue] = useState<string>('');
    const { isWritting, debounceValue } = useDebounceValue(textValue);

    useEffect(() => {
        onDebounce(debounceValue);
    }, [debounceValue])

    return (
        <View style={[styles.container, additionalStyles]}>
            <TextInput
                autoFocus={false}
                textAlign={'left'}
                textAlignVertical={'bottom'}
                style={styles.textInput}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={textValue}
                onChangeText={(e) => settextValue(e)}
                placeholder={'Search a pokemon...'}
                placeholderTextColor={'rgba(0,0,0,.5)'}
            />
            {isWritting ? (
                <ActivityIndicator color={'black'} size={25} />
            ) : (
                <Icon
                    name={'magnify'}
                    size={30}
                    color={'grey'}
                />
            )}
        </View>
    )
}

export default SearchInput;