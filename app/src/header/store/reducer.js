import * as constants from "./constants";
import { fromJS } from "immutable";
// immutable库, immutable对象

const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1,
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.SEARCH_FOCUS:
            // immutable 对象的set()会结合之前immutable对象的值和设置的值，返回一个全新对象
            return state.set("focused", true);
        case constants.SEARCH_BLUR:
            return state.set("focused", false);
        case constants.CHANGE_LIST:
            return state.set("list", action.data).set("totalPage", action.totalPage); 
        default:
            return state;
    }
}