import { combineReducers } from "redux";
import ImagesReducer from "./ImagesReducer";

export default combineReducers({
    images: ImagesReducer
});  