import React, { useState } from 'react'
import { ActivityIndicator, View, Animated, StyleProp, ViewStyle, ImageStyle, StyleSheet, PixelRatio } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAnimation } from '../../hooks/useAnimation';
import { styles } from './styles';

interface FadeInImageProps {
    uri: string;
    styleProps?: StyleProp<ViewStyle>;
    aditionalStyleImage?: StyleSheet.NamedStyles<{}>;
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const FadeInImage = ({ uri, styleProps, aditionalStyleImage }: FadeInImageProps) => {

    const { opacity, fadeIn } = useAnimation();
    const [isLoading, setisLoading] = useState(true);

    const finishLoading = () => {
        setisLoading(false);
        fadeIn();
    }    

    const size = 37;
    const image = {
        uri,
        priority: FastImage.priority.normal,
        width: size,
        height: size
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
                source={image}
                style={{
                    height: PixelRatio.getPixelSizeForLayoutSize(size),
                    width: PixelRatio.getPixelSizeForLayoutSize(size),
                    ...aditionalStyleImage,
                    opacity,
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={finishLoading}
            />

        </View>
    )
}

export default FadeInImage;