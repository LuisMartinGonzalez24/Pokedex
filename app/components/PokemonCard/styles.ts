import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        marginHorizontal: 10,
        backgroundColor: 'red',
        height: 135,        
        marginBottom: 20,
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
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize',
    },

    textId: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15
    },

    containerWhitePokeball: {
        height: 120,
        width: 120,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    },

    imageWhitePokeball: {
        height: 115,
        width: 115,
        opacity: 0.7,
        position: 'absolute',
        bottom: -20,
        right: -20
    },

    pokemoImage: {
        height: 100,
        width: 100,
    },

});