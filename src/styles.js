import {
    StyleSheet,
} from 'react-native';

export const colors = {
    brown: '#eaddce',
    lightBrown: '#f4e9dc',
    dark: '#252525'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
        
    },
    homeContainer: {
        backgroundColor: colors.brown,
        paddingVertical: 15
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: colors.darkGrey,
        marginBottom: 5,
    },
});