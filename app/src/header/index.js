import React from "react";
import { connect } from "react-redux";
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button } from "./style.js";
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
                            in={this.props.focused}
                            timeout={200}
                            classNames="slide"
                        >
                        <NavSearch 
                            className={this.props.focused ? "focused" : ""}
                            onFocus={this.props.handleInputFocus}
                            onBlur={this.props.handleInputBlur}
                            placeholder="搜索" 
                        />
                        </CSSTransition>
                        <i className={this.props.focused ? "focused iconfont": "iconfont"}>&#xe60b;</i>
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
}

const mapStateToProps = (state) => {
    return {
        focused: state.header.get("focused")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);