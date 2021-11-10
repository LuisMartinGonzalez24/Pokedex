import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
         flex: 1,
    },

    buttonActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    backButton: {        
        marginTop: 15
    },

    loveButton: {

    },

    titleContainer: {
        marginLeft: 10,
        marginTop: 15
    },

    textName: {
        fontSize: 40,
        fontFamily: 'Minecraft',
        textTransform: 'capitalize'
    },

    textId: {
        fontFamily: 'Minecraft',
        fontSize: 40,
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
