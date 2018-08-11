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
                <View style={{ height: 50, width: 20, position: 'absolute', right: 20, justifyContent: 'center', alignItems: 'flex-end' }}>
                    {this.props.value ? (<Icon
                        name='ios-close-circle'
                        size={20}
                        color='black'
                        style={{ color: colors.dark }}
                        onPress={this.props.clearValue}
                    />
                    ) : (
                            <Icon
                                name='ios-search'
                                size={20}
                                color='black'
                                style={{ color: colors.dark }}
                            />)}
                </View>
            </View>
        );
    }
}