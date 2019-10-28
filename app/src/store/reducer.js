import { combineReducers } from "redux";
import { reducer as headerReducer } from "../header/store";

const reducer =  combineReducers({
    header: headerReducer
})

export default reducer;
