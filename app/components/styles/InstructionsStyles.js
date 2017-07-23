import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
    instructions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECDCD',
    },
    instructions_header: {
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
    instructionsText: {
        fontSize: 20,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: 'MontserratBold',
    },
    instructionsElement: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionsBox: {
        backgroundColor: '#7AAF29',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        marginBottom: 20,
        width: '95%',
        flex: 1,
        justifyContent: 'center',
    },
    stepsContainer: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
    },
    step: {
        borderRadius: 5,
        backgroundColor: '#403837',
        margin: 2,
        flex: 1,
        flexDirection: 'row',
    },
    stepNumber: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    stepInfo: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumberText: {
        fontFamily: 'MontserratBold',
        fontSize: 30,
        color: 'white',
    },
    stepInfoText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        margin: 10,
        marginBottom: 0,
    },
    stepImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});
