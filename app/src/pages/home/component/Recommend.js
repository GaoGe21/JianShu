import React from "react";
import { connect } from "react-redux";
import { RecommendWrapper, RecommendItem } from "../style";

class Recommend extends React.Component {
    render() {
        const { list } = this.props;
        return (
            <RecommendWrapper>
                {
                    list.map((item) => {
                        return (
                            <RecommendItem imgUrl={item.get("imgUrl")} key={item.get("id")} />
                        );
                    })
                }
            </RecommendWrapper>
        );
    }
}
const mapStateToProps = (state) => {
    return {
       list: state.getIn(["home", "recommendList"])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);