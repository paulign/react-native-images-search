import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from "react-redux";
import {
    onChangeSearchQuery,
    clearImages,
    loadNextPage,
    loadPrevSearchResult
} from "../actions";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import styles from '../styles';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.loadScreen();
    }

    loadScreen = async () => {
        try {
            await this.props.loadPrevSearchResult();
            await this.setState({ isLoading: false });
        } catch (error) {
            console.warn(error);
            this.setState({ isLoading: false });
        }
    }

    openImage = (image) => {
        this.props.navigation.navigate({ routeName: 'ImageDetails', params: { image } });
    }

    onChangeText = async (searchQuery) => {
        this.props.onChangeSearchQuery(searchQuery)
    }

    onClearValue = () => {
        this.props.onChangeSearchQuery(null)
    }

    getNumOfColumns = () => {
        const screenWidth = Dimensions.get('window').width;
        const cardOuterWidth = 170;

        return Math.floor(screenWidth / cardOuterWidth);
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
                <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
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
                    numColumns={this.getNumOfColumns()}
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
        if (this.state.isLoading) {
            return (
                <View
                    style={[styles.container, styles.homeContainer]}
                >
                    <ActivityIndicator />
                    <Text
                        style={styles.regularText}
                    >
                        Loading..
                            </Text>
                </View>
            )
        }
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
    return {
        search: state.images,
    }
}

export default connect(mapStateToProps, {
    clearImages,
    onChangeSearchQuery,
    loadNextPage,
    loadPrevSearchResult
})(Home)