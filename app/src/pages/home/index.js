import React from "react";
import Topic from "./component/Topic";
import List from "./component/List";
import Recommend from "./component/Recommend";
import Writer from "./component/Writer";
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from "./style";
import { connect } from "react-redux";
import { actionCreators, constants } from "./store";
class Home extends React.Component {
    render() {
        const { showScroll } = this.props;
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
                    {
                        showScroll ?
                        <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> :
                        null
                    }
                </HomeWrapper>
            </div>
        );
    }

    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvent();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.props.changeScrollTopShow)
    }

    handleScrollTop() {
        window.scrollTo(0, 0);
    }

    bindEvent() {
        window.addEventListener("scroll", this.props.changeScrollTopShow)
    }
}
const mapState = (state) => ({
    showScroll: state.getIn(["home", "showScroll"])
})

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow() {
        console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop > 80) {
            dispatch(actionCreators.toggleTopShow(true));
        } else {
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
})

export default connect(mapState, mapDispatch)(Home);