import imageSearch from "react-native-google-image-search";
import uuid from 'uuid';
import {
    IMAGES_LOAD_REQUEST, 
    IMAGES_LOAD_SUCCESS, 
    IMAGES_LOAD_ERROR, 
    SEARCH_QUERY_CHANGE,
    IMAGES_CLEAR
} from './types';

export const getImages = (query = null, page = 1, pagination = false) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: IMAGES_LOAD_REQUEST, payload: {
                    pagination
                }
            });
            console.log(query, page, pagination);
            const data = await imageSearch(query, 0, page);
            console.log(data);
            let images = page == 1 ? [] : [].concat(getState().images.images);

            if (data && data.length) {
                const loadedImages = data.map((image) => {
                    return {
                        title: image.title,
                        displayLink: image.displayLink,
                        thumbnailUrl: image.image.thumbnailLink,
                        fullSizeUrl: image.link,
                        contextLink: image.image.contextLink,
                        id: uuid.v1(),
                        width: image.image.width,
                        height: image.image.height
                    }
                });
                images = images.concat(loadedImages);
            }
            console.log('match queries', getState().images.searchQuery, query)
            if (getState().images.searchQuery === query) {
                dispatch({
                    type: IMAGES_LOAD_SUCCESS, payload: {
                        images,
                        emptyText: images.length ? '' : 'No images found...',
                        currentPage: page
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
    if (activeSearch) {
        clearTimeout(activeSearch);
        activeSearch = null;
    }
    return dispatch => {
        dispatch({ type: IMAGES_CLEAR });
    }
}

export const loadNextPage = () => {
    return (dispatch, getState) => {
        const { searchQuery, images, loading, loadingPagination } = getState().images;
        
        if(images.length && !loading && !loadingPagination) {
            let page = images.length;
            return dispatch(getImages(searchQuery, page, true));
        }  
    }
}