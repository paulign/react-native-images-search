import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import {
    onChangeSearchQuery,
    clearImages,
    loadNextPage
} from "../actions";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import styles from '../styles';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    openImage = (image) => {
        this.props.navigation.navigate({ routeName: 'ImageDetails', params: { image } });
    }

    onChangeText = async (searchQuery) => {
        console.log(searchQuery);
        this.props.onChangeSearchQuery(searchQuery)
    }

    onClearValue = () => {
        this.props.onChangeSearchQuery(null)
    }

    renderCard = (item) => {
        return (
            <Card
                onPress={() => this.openImage(item.item)}
                image={item.item}
            />
        )
    }

    renderPagination = () => {
        const { loadingPagination } = this.props.search;
        if (loadingPagination) {
            return (
                <View style={{width: '100%', padding: 10, alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return null;
    }

    renderImagesList = () => {
        const { images, searchQuery, emptyText } = this.props.search;

        if (images && images.length) {
            return (
                <FlatList
                    contentContainerStyle={styles.imagesList}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={this.props.search.images}
                    renderItem={(item) => this.renderCard(item)}
                    onEndReached={() => this.props.loadNextPage()}
                    ListEmptyComponent={() => this.renderPagination()}
                />
            )
        }

        else if (searchQuery && searchQuery.length >= 3 && (!images || (images && !images.length))) {
            return (
                <Text
                    style={styles.regularText}
                >
                    {emptyText}
                </Text>
            )
        }

        return null;
    }

    render() {
        return (
            <View
                style={[styles.container, styles.homeContainer]}
            >
                <Text
                    style={styles.pageTitle}
                >
                    Image search
                </Text>
                <SearchInput
                    value={this.props.search.searchQuery}
                    clearValue={this.onClearValue}
                    inputProps={{
                        placeholder: 'Type to search...',
                        onChangeText: this.onChangeText
                    }}
                />
                <View style={styles.container}>
                    {this.props.search.loading ? (
                        <View>
                            <ActivityIndicator />
                            <Text
                                style={styles.regularText}
                            >
                                Loading..
                            </Text>
                        </View>
                    ) : this.renderImagesList()}
                </View>
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

export default connect(mapStateToProps, {
    clearImages,
    onChangeSearchQuery,
    loadNextPage
})(Home)