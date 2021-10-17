import React, { useState } from 'react'
import { ActivityIndicator, View, Animated, StyleProp, ViewStyle, ImageStyle, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAnimation } from '../../hooks/useAnimation';
import { styles } from './styles';

interface FadeInImageProps {
    uri: string;
    styleProps?: StyleProp<ViewStyle>;
    aditionalStyleImage?:  StyleSheet.NamedStyles<{}>;
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const FadeInImage = ({ uri, styleProps, aditionalStyleImage }: FadeInImageProps) => {

    const { opacity, fadeIn } = useAnimation();
    const [isLoading, setisLoading] = useState(true);

    const finishLoading = () => {
        setisLoading(false);
        fadeIn();
    }


    return (
        <View style={[styles.container, styleProps]}>
            {
                isLoading &&
                <ActivityIndicator
                    style={{ position: 'absolute' }}
                    color="grey"
                    size={45}
                />
            }
            <AnimatedFastImage
                source={{
                    uri,
                    priority: FastImage.priority.normal,
                }}
                style={{
                    ...styles.image,
                    ...aditionalStyleImage,
                    opacity
                }}
                resizeMode={FastImage.resizeMode.center}
                onLoad={finishLoading}
            />

        </View>
    )
}

export default FadeInImage;