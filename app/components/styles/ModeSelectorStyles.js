import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ButtonSize = width > height ? 0.8 * (height / 3) : 0.8 * (width / 3);

export default StyleSheet.create({
    active: {
        borderWidth: 10,
        borderRadius: 4,
        borderColor: 'white',
        backgroundColor: 'white',
        opacity: 1,
    },
    selectors: {
        borderWidth: 10,
        borderRadius: 4,
        borderColor: '#d6d7da',
        opacity: 0.7,
        width: ButtonSize,
        height: ButtonSize,
        margin: ButtonSize * 0.1,
    },
    modes: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    selectedMode: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedModeText: {
        fontWeight: 'bold',
    },
});
