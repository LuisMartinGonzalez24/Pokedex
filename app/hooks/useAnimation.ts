import { useRef } from 'react'
import {Animated} from 'react-native'

export const useAnimation = () => {
    
    const opacity = useRef(new Animated.Value(0)).current;
    
    const fadeIn = (duration: number = 500) => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration,
                useNativeDriver: true
            }
        ).start();
    }

    return {
        opacity,
        fadeIn,
    }
}
