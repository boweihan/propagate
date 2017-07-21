import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
    boardMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    innerMainMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: Width * 0.9,
    },
    backToMenu: {
        backgroundColor: '#BE3E2C',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
    },
    backToLeaderboard: {
        backgroundColor: '#ff9900',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
    },
    movesLeft: {
        backgroundColor: '#1E6576',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        width: '90%',
    },
    score: {
        backgroundColor: '#7AAF29',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
    },
    level: {
        backgroundColor: 'gray',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
    },
    btn1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btn2: {
        flex: 2.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn3: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btn3_col2: {
        marginTop: 5,
    },
    menuText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
});

