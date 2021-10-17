import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
         flex: 1,
    },
    
    backButton: {
        marginLeft: 10,
        marginTop: 15
    },

    titleContainer: {
        marginLeft: 10,
        marginTop: 15
    },

    textName: {
        fontSize: 40,
        color: 'white',
        textTransform: 'capitalize'
    },

    textId: {
        fontSize: 40,
        color: 'white'
    },

    whitePokeball: {
        height: 250,
        width: 250,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        opacity: 0.6,
    },

    stylesPropsFadeInImage: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
    },
    
    pokemonImage: {
        height: 265,
        width: 265,        
    },
});
