import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {

    },

    statContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },

    nameStatAndBaseContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },

    stat: {
        flex: 1,
        fontFamily: 'Minecraft',
        fontSize: 16,
        textTransform: 'capitalize',
    },

    baseStat: {
        fontSize: 16,
    },

});