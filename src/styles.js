import {
    StyleSheet,
} from 'react-native';

export const colors = {
    brown: '#eaddce',
    lightBrown: '#f4e9dc',
    dark: '#252525',
    lightTransparent: "rgba(255, 255, 255, 0.8)",
    light: "#ffffff",
    blue: '#2d38ff',
    transparent: 'transparent'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    homeContainer: {
        justifyContent: 'flex-start',
        backgroundColor: colors.brown,
        paddingVertical: 15
    },
    pageTitle: {
        fontSize: 40,
        marginVertical: 10,
        color: colors.dark
    },
    regularText: {
        fontSize: 16,
        color: colors.dark
    },
    lightText: {
        color: colors.light
    },
    inputBtn: {
        height: 50,
        width: 30,
        position: 'absolute',
        right: 15,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    cardWrapper: {
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#ddd'
    },
    card: {
        flex: 1,
        width: 150,
        height: 150,
        justifyContent: 'flex-end'
    },
    cardTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: colors.lightTransparent
    },
    imagesList: {
        paddingTop: 15
    },
    detailsTitleWrapper: {
        position: 'absolute',
        bottom: 0,
        padding: 15,
        width: '100%',
        backgroundColor: colors.lightTransparent
    },
    contextLinkWrapper: {
        alignItems: "flex-end",
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    imageDetailsContainer: {
        backgroundColor: colors.dark
    },
    backButton: {
        position: 'absolute',
        top: 5,
        left: 10,
        padding: 5,
        zIndex: 1000,
        backgroundColor: colors.transparent,
        alignItems: 'center',
        justifyContent: 'center'
    }
});