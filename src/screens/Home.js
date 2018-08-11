import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import {
    getImages, onChangeSearchQuery,
    clearImages
} from "../actions";
import SearchInput from "../components/searchInput";
import styles, { colors } from '../styles';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    goToDetails = () => {
        this.props.navigation.navigate({ routeName: 'ImageDetails', params: { test: true } });
    }

    onChangeText = async (searchQuery) => {
        console.log(searchQuery);
        this.props.onChangeSearchQuery(searchQuery)
    }

    onClearValue = () => {
        this.props.clearImages
    }

    render() {
        return (
            <View style={[styles.container, styles.homeContainer]}>
                <Text style={{ fontSize: 40, marginVertical: 10, color: colors.dark }}>Image search</Text>
                <SearchInput
                    value={this.props.search.searchQuery}
                    clearValue={this.onClearValue}
                    inputProps={{
                        placeholder: 'Type to search...',
                        onChangeText: this.onChangeText
                    }}
                />

                {this.props.search.loading ? (<Text>Loading</Text>) : this.props.search.images.map((image, i) => {
                    return (<Text key={String(i)}>{image.title}</Text>);
                })}

                <TouchableOpacity onPress={this.goToDetails}>
                    <Text>Home Screen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        search: state.images,
    }
}

const mapDispatchToProps = dispatch => {
    return
}

export default connect(mapStateToProps, {
    getImages,
    clearImages,
    onChangeSearchQuery
})(Home)