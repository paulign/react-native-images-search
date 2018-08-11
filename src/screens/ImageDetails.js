import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";

class ImageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.navigation.state.params
        }

        console.log(this.state);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Image Details</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps)(ImageDetails)