import React from 'react'
import { Text, View, ViewStyle } from 'react-native';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import { styles } from './styles';

interface HeaderComponentProps {
    title: string;
    titleColor: string;
    showToggle: boolean;
    valueToggle?: boolean;
    backgroundColor: string;
    additionalStyles?: ViewStyle | ViewStyle[];
}

const HeaderComponent = ({ title, titleColor, showToggle, valueToggle = false, backgroundColor, additionalStyles }: HeaderComponentProps) => {
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
            {showToggle && <CustomSwitch isOn={valueToggle} />}
        </View>
    )
}

export default React.memo(HeaderComponent);