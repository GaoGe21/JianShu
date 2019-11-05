import React from "react";
import { WriterWrapper, WriterItem, WriterInfo } from "../style";

class Writer extends React.Component {
    render() {
        return (
            <WriterWrapper>
                <div className="author">推荐作者</div>
                <WriterItem>
                    <img className="pic" src="" alt="" />
                    <WriterInfo>
                    </WriterInfo>
                </WriterItem>
            </WriterWrapper>
        );
    }
}

export default Writer;