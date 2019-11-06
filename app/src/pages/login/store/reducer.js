import { constants } from "../store";
import { fromJS } from "immutable";

const defaultState = fromJS({
    login: false
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANGE_LOGIN:
            return state.set("login", action.value);
        case constants.CHANGE_LOGOUT:
            return state.set("login", action.value);
        default:
            return state;
    }
}