import * as constants from "./constants";
import { fromJS } from "immutable";
// immutable库, immutable对象

const defaultState = fromJS({
    focused: false,
});

export default (state = defaultState, action) => {
    if(action.type === constants.SEARCH_FOCUS) {
        // immutable 对象的set()会结合之前immutable对象的值和设置的值，返回一个全新对象
        return state.set("focused", true);
    }
    if(action.type === constants.SEARCH_BLUR) {
        return state.set("focused", false);
    }
    return state;
}