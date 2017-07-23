import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
    levelPicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECDCD',
    },
    levelPickerHeader: {
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
    levelPickerText: {
        fontSize: 20,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: 'MontserratBold',
    },
    levelPickerElement: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelPickerBox: {
        backgroundColor: '#403837',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        marginBottom: 20,
        width: '95%',
        flex: 1,
        justifyContent: 'center',
    },
    rows: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    columns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
        height: ((Width * 0.8) / 4) - 10,
        backgroundColor: '#649122',
    },
    cellDisabled: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
        height: ((Width * 0.8) / 4) - 10,
        backgroundColor: '#649122',
        opacity: 0.5,
    },
    cellText: {
        fontSize: Width * 0.1,
        color: 'white',
        fontFamily: 'MontserratBold',
    },
});