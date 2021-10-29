import { StyleSheet, PixelRatio } from "react-native";

export const styles = StyleSheet.create({

    container: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',        
    },

    image: {
        height: PixelRatio.getPixelSizeForLayoutSize(120),
        width: PixelRatio.getPixelSizeForLayoutSize(120),
    },

});