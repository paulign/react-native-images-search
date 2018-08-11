import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image, onPress } = this.props;
        if (!image) {
            return null
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.cardWrapper}>
                <ImageBackground
                    style={styles.card}
                    source={{ uri: image.thumbnailUrl }}
                    cache={'force-cache'}
                >
                    <View style={styles.cardTitle}>
                        <Text
                            numberOfLines={1}
                            style={styles.regularText}
                        >
                            {image.title}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
