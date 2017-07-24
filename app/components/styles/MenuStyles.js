import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prop: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#403837',
        fontSize: 35,
        fontFamily: 'MontserratBold',
    },
    agate: {
        color: '#BE3E2C',
        fontFamily: 'MontserratBold',
    },
    startButton: {
        marginTop: 20,
        backgroundColor: '#403837',
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 5,
        minWidth: 150,
    },
    highestLevel: {
        marginTop: 70,
        backgroundColor: 'gray',
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 5,
        minWidth: 150,
    },
    startText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#f2f2f2',
        fontFamily: 'MontserratBold',
        textAlign: 'center',
    },
    highestLevelText: {
        fontSize: 15,
        color: '#f2f2f2',
        fontFamily: 'MontserratBold',
    },
    highestLevelStatus: {
        color: '#BE3E2C',
    },
});
