import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput } from 'react-native-elements';
import styles, { colors } from '../styles';

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ backgroundColor: colors.lightBrown }}>
                <FormInput
                    value={this.props.value}
                    {...this.props.inputProps}
                    inputStyle={{ borderBottomWidth: 0, height: 50, paddingRight: 20, color: colors.dark }}
                    underlineColorAndroid={'transparent'}
                />
                <View style={styles.inputBtn}>
                    {this.props.value ? (<Icon
                        name='ios-close-circle'
                        size={25}
                        color={colors.dark}
                        onPress={this.props.clearValue}
                    />
                    ) : (
                            <Icon
                                name='ios-search'
                                size={30}
                                color={colors.dark}
                            />)}
                </View>
            </View>
        );
    }
}