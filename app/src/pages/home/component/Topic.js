import React from "react";
import { connect } from "react-redux";
import { TopicWrapper, TopicItem } from "../style";

class Topic extends React.Component {
    render() {
        const { list } = this.props;
        return (
            <TopicWrapper>
                {
                    list.map((item) => {
                        return (
                            <TopicItem key={item.get("id")}>
                            <img 
                                className="topic-pic"
                                src={item.get("imgUrl")}
                                alt=""
                            />
                            {item.get("title")}
                        </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       list: state.getIn(["home", "topicList"])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);