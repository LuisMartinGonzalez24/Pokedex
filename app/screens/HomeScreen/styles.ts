import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        /* flexDirection: 'row', */        
    },
    
    pokeballWhiteBG: {
        width: 300,
        height: 300,
        position: 'absolute',
        right: -90,
        top: -90,
        opacity: 0.9,        
    },

    pokeballBG: {
        width: 300,
        height: 300,
        position: 'absolute',
        right: -90,
        top: -90,
        opacity: 0.4,
    },

    title: {
        fontSize: 30,
        fontFamily: 'Minecraft',
    }

});
