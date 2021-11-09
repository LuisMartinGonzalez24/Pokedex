import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

interface HeaderWithOptionsProps {
    title: string;
    titleColor: string;
    backgroundColor: string;
    additionalStyles?: ViewStyle | ViewStyle[];
    callback: () => void;
}

const HeaderWithOptions = ({ title, titleColor, backgroundColor, additionalStyles, callback }: HeaderWithOptionsProps) => {
    return (
        <View style={[
            styles.container,
            additionalStyles,
            {
                backgroundColor,
            }
        ]}>
            <Text style={{
                ...styles.title,
                color: titleColor
            }}>{title}</Text>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={callback}
            >
                <Icon
                    name={'dots-vertical'}
                    color={titleColor}
                    size={25}
                />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(HeaderWithOptions);
