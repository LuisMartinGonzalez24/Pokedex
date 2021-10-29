import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        height: 135,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    textsContainer: {
        marginLeft: 10,
        marginTop: 20
    },

    textName: {
        fontSize: 20,
        fontFamily: 'Minecraft',
        color: 'white',
        textTransform: 'capitalize',
    },

    textId: {
        fontSize: 21,
        fontFamily: 'Minecraft',
        color: 'white',
        marginTop: 15
    },

    containerWhitePokeball: {
        height: 120,
        width: 120,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',        
    },

    imageWhitePokeball: {
        height: 115,
        width: 115,
        opacity: 0.7,
        position: 'relative',
        bottom: -30,
        right: -30,
    },

    pokemoImage: {
        height: 100,
        width: 100,
    },

});