import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    boardMenu: {
        flex: 1,
    },
    board: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selector: {
        flex: 1,
    },
    game: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CECDCD',
    },
    modal: {
        backgroundColor: '#b3b3b3',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalMsg: {
        fontSize: 30,
        fontFamily: 'NukamisoLite',
        textAlign: 'center',
    },
    modalClose: {
        textAlign: 'center',
        fontSize: 60,
        marginTop: 20,
        color: '#b3b3b3',
    },
});

