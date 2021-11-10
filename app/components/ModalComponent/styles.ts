import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerContent: {
        alignContent: 'center',
        backgroundColor: '#e63946',
        borderRadius: 10,
        justifyContent: 'center',
        height: 150,
        width: 270,
    },

    message: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },

    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',        
        justifyContent: 'space-around',
    },

    buttonAction: {
        borderRadius: 5,
        backgroundColor: 'white',
    },

    buttonText: {
        color: '#e63946',
        fontWeight: '700',
    },

});