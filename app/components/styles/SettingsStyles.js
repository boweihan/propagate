import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
    settings: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECDCD',
    },
    settings_header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: Width * 0.9,
        marginTop: 30,
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backToMenu: {
        backgroundColor: '#BE3E2C',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        marginBottom: 20,
        flex: 1,
        justifyContent: 'center',
    },
    menuText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        fontFamily: 'MontserratBold',
    },
    settingsText: {
        fontSize: 20,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: 'MontserratBold',
    },
    settingsElement: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsBox: {
        backgroundColor: '#e68a00',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        marginBottom: 20,
        width: '95%',
        flex: 1,
        justifyContent: 'center',
    },
    menu: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    settingsButton: {
        backgroundColor: '#403837',
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 5,
        minWidth: 150,
    },
    settingsButtonText: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'MontserratBold',
    },
    triColorStatus: {
        textDecorationLine: 'underline',
        color: '#d8695a',
    },
});
