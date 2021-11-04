import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
        borderRadius: 20,

        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 7.30,
        elevation: 8,
    },

    textInput: {
        flex: 1,        
        borderRadius: 20,
        fontSize: 16,
        fontFamily: 'Minecraft',
        color: 'black',
    },

});