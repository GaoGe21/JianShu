import React from "react";
import Topic from "./component/Topic";
import List from "./component/List";
import Recommend from "./component/Recommend";
import Writer from "./component/Writer";
import { HomeWrapper, HomeLeft, HomeRight } from "./style";
import { connect } from "react-redux";
import axios from "axios";

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeWrapper>
                    <HomeLeft>
                        <img 
                            className="banner-img" 
                            src="//upload-images.jianshu.io/upload_images/1202579-921e24e1c15aaa01?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240"
                            alt=""
                        />
                        <Topic />
                        <List />
                    </HomeLeft>
                    <HomeRight>
                        <Recommend />
                        <Writer />  
                    </HomeRight>
                </HomeWrapper>
            </div>
        );
    }

    componentDidMount() {
        axios.get("/api/home.json").then((res) => {
            const result = res.data.data;
            const action = {
                type: "change_data",
                topicList: result.topicList,
                articleList: result.articleList,
                recommendList: result.recommendList,
            }
            this.props.changeHomeData(action);
        });
    }
}

const mapDispatch = (dispatch) => ({
    changeHomeData(action) {
        dispatch(action);
    }
})

export default connect(null, mapDispatch)(Home);