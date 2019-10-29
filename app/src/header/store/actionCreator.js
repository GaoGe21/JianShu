import { constants } from "../store";
import { fromJS } from "immutable";
import axios from "axios";

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type:constants.SEARCH_BLUR
});

const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const getList = () => {
    return (dispatch) => {
        axios.get("/api/headerList.json").then((res) => {
            const result = res.data;
            dispatch(changeList(result.data));
        }).catch(() =>{
            console.log("error");
        })
    }
};