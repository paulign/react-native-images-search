import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StatusBar, SafeAreaView, Linking } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Button } from 'react-native-elements'
import styles, { colors } from '../styles';

export default class ImageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.navigation.state.params,
        }
    }

    openLink = (url) => {
        Linking.openURL(url)
    }

    renderEmptyState = () => {
        return (
            <View style={styles.container}>
                <Text style={[styles.regularText, styles.lightText]}
                >
                    No image provided...
                    </Text>
            </View>
        )
    }

    renderImage = (image) => {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        return (
            <View>
                <ImageZoom 
                    cropWidth={screenWidth}
                    cropHeight={screenHeight}
                    imageWidth={screenWidth}
                    imageHeight={screenWidth}>
                    <Image
                        cache={'force-cache'}
                        style={{
                            width: screenWidth,
                            height: screenWidth
                        }}
                        source={{ uri: image.fullSizeUrl }}
                    />
                </ImageZoom>
                <View style={styles.detailsTitleWrapper}>
                    <Text style={styles.regularText}>{image.title}</Text>
                    <View style={[styles.container, styles.contextLinkWrapper]}>
                        <Button
                            title={image.displayLink}
                            backgroundColor={colors.dark}
                            color={colors.light}
                            onPress={() => this.openLink(image.contextLink)}
                        />
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { image } = this.state;

        return (
            <SafeAreaView style={[styles.container, styles.imageDetailsContainer]}>
                <StatusBar
                    backgroundColor={colors.dark}
                    barStyle="light-content"
                />
                {image ? this.renderImage(image) : this.renderEmptyState()}
            </SafeAreaView >
        );
    }
}