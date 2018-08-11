import imageSearch from "react-native-google-image-search";
import {
    IMAGES_LOAD_REQUEST, IMAGES_LOAD_SUCCESS, IMAGES_LOAD_ERROR, SEARCH_QUERY_CHANGE,
    IMAGES_CLEAR
} from './types';

export const getImages = (query = null, page = 1) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: IMAGES_LOAD_REQUEST });
            const data = await imageSearch(query, 0, page);
            let images = [];
            if (data && data.length) {
                images = data.map((image) => {
                    return {
                        title: image.title,
                        displayLink: image.displayLink,
                        thumbnailUrl: image.image.thumbnailLink,
                        fullSizeUrl: image.link
                    }
                });
            }
            console.log('match queries', getState().images.searchQuery, query)
            if (getState().images.searchQuery === query) {
                dispatch({
                    type: IMAGES_LOAD_SUCCESS, payload: {
                        images
                    }
                });
            }
            else {
                dispatch({ type: IMAGES_LOAD_ERROR });
            }

        } catch (error) {
            console.log(error);
            dispatch({ type: IMAGES_LOAD_ERROR });
        }
    }
}

const activeSearch = null;

export const onChangeSearchQuery = (searchQuery) => {
    console.log(searchQuery);
    return dispatch => {
        console.log(searchQuery);
        dispatch({ type: SEARCH_QUERY_CHANGE, payload: searchQuery });
        if (!searchQuery || searchQuery.length < 3) {
            return dispatch(clearImages())
        }

        if (activeSearch) {
            clearTimeout(activeSearch);
        }
        activeSearch = setTimeout(() => {
            console.log('test timeout')
            dispatch(getImages(searchQuery));
        }, 1000);
    }

}

export const clearImages = () => {
    return dispatch => {
        if (activeSearch) {
            clearTimeout(activeSearch);
            activeSearch = null;
        }
        dispatch({ type: IMAGES_CLEAR });
    }
}