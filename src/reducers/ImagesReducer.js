import {
    IMAGES_LOAD_REQUEST, SEARCH_QUERY_CHANGE,
    IMAGES_CLEAR, IMAGES_LOAD_SUCCESS,
    IMAGES_LOAD_ERROR,
    LOAD_PREV_RESULT
} from '../actions/types';

const INITIAL_STATE = {
    images: [],
    searchQuery: null,
    loading: false,
    loadingPagination: false,
    emptyText: '',
    currentPage: 1
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IMAGES_LOAD_REQUEST:
            return {
                ...state,
                loading: action.payload.pagination ? false : true,
                loadingPagination: action.payload.pagination,
                emptyText: ''
            };
        case SEARCH_QUERY_CHANGE: 
            return {
                ...state,
                searchQuery: action.payload,
                loading: false,
                loadingPagination: false,
                currentPage: 1,
                emptyText: ''
            }
        case IMAGES_CLEAR: {
            return {
                ...state,
                images: [],
                emptyText: '',
                currentPage: 1
            }
        }
        case IMAGES_LOAD_SUCCESS: {
            return {
                ...state,
                images: action.payload.images,
                loading: false,
                loadingPagination: false,
                emptyText: action.payload.emptyText,
                currentPage: action.payload.currentPage
            }
        }
        case IMAGES_LOAD_ERROR: {
            return {
                ...state,
                loading: false,
                loadingPagination: false,
                emptyText: 'No images found...'
            }
        }
        case LOAD_PREV_RESULT: {
            return {
                ...state,
                images: action.payload.images,
                searchQuery: action.payload.searchQuery
            }
        }
        default:
            return state;
    }
};
