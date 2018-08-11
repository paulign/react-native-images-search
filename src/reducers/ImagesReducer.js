import {
    IMAGES_LOAD_REQUEST, SEARCH_QUERY_CHANGE,
    IMAGES_CLEAR, IMAGES_LOAD_SUCCESS,
    IMAGES_LOAD_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    images: [],
    searchQuery: null,
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IMAGES_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                images: []
            };
        case SEARCH_QUERY_CHANGE: 
            return {
                ...state,
                searchQuery: action.payload,
                loading: false
            }
        case IMAGES_CLEAR: {
            return {
                ...state,
                images: []
            }
        }
        case IMAGES_LOAD_SUCCESS: {
            return {
                ...state,
                images: action.payload.images,
                loading: false
            }
        }
        case IMAGES_LOAD_ERROR: {
            return {
                ...state,
                images: [],
                loading: false
            }
        }
        default:
            return state;
    }
};
