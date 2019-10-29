import React from "react";
import { connect } from "react-redux";
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, 
        Button, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoList, SearchInfoItem,
} from "./style.js";
import { CSSTransition } from "react-transition-group";
import { actionCreators } from "./store";
import "../statics/iconfont/iconfont.css";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            focused: false
        }
    }

    render (){
        const { focused, handleInputFocus, handleInputBlur } = this.props;
        return (
            <HeaderWrapper>
                <Logo href="/" />
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    <NavItem className="right">登录</NavItem>
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                        <NavSearch 
                            className={focused ? "focused" : ""}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder="搜索" 
                        />
                        </CSSTransition>
                        <i className={focused ? "focused iconfont": "iconfont"}>&#xe60b;</i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className="writing">
                        <i className="iconfont">&#xe62e;</i>写文章
                    </Button>
                    <Button className="register">注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }

    getListArea = () => {
        const {focused, list, page} = this.props;
        const pageList = [];
        for(let i = (page - 1) * 10; i < page * 10; i++) {
            pageList.push(
                <SearchInfoItem key={list.toJS()[i]}>{list.toJS()[i]}</SearchInfoItem>
            );
        }
        if (focused) {
            return (
                <SearchInfo>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                            list.map((item) => {
                                return 
                            })
                        }
                        
                    </SearchInfoList>
                </SearchInfo>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(["header", "focused"]),
        list: state.getIn(["header", "list"]),
        page: state.getIn(["header","page"]),
        // state.get("header").get("focused")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);