import React from 'react'
import { Text, View, ViewStyle } from 'react-native';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface HeaderWithToggleProps {
    title: string;
    titleColor: string;
    valueToggle?: boolean;
    backgroundColor: string;
    additionalStyles?: ViewStyle | ViewStyle[];
}

const HeaderWithToggle = ({ title, titleColor, valueToggle = false, backgroundColor, additionalStyles }: HeaderWithToggleProps) => {
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
            <CustomSwitch isOn={valueToggle} />
        </View>
    )

}

export default React.memo(HeaderWithToggle);