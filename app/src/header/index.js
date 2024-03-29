import React from "react";
import { connect } from "react-redux";
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, 
        Button, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoList, SearchInfoItem,
} from "./style.js";
import { CSSTransition } from "react-transition-group";
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators} from "../pages/login/store";
import { Link } from "react-router-dom";
import "../statics/iconfont/iconfont.css";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            focused: false
        }
    }

    render (){
        const { focused, list, login, logout, handleInputFocus, handleInputBlur } = this.props;
        return (
            <HeaderWrapper>
                <Link to="/"><Logo /></Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    {
                        !login ? 
                        <Link to="/login">
                            <NavItem className="right">登录</NavItem>
                        </Link> :
                        <NavItem  onClick={logout} className="right">退出</NavItem>
                    }
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
                            onFocus={() => handleInputFocus(list)}
                            onBlur={handleInputBlur}
                            placeholder="搜索" 
                        />
                        </CSSTransition>
                        <i className={focused ? "focused iconfont": "iconfont"}>&#xe60b;</i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to="/write">
                        <Button className="writing">
                            <i className="iconfont">&#xe62e;</i>写文章
                        </Button>
                    </Link>
                    <Button className="register">注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }

    getListArea = () => {
        const {
            focused, list, page, totalPage, mouseIn, 
            handleMouseEnter, handleMouseLeave, handleChangePage, 
         } = this.props;
        const newList = list.toJS();
        const pageList = [];
        if(newList.length) {
            for(let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                );
            }
        }
        if (focused || mouseIn) {
            return (
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=> handleChangePage(page, totalPage)}>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
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
        totalPage: state.getIn(["header","totalPage"]),
        mouseIn: state.getIn(["header","mouseIn"]),
        login: state.getIn(["login", "login"]),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            if(list.size === 0) {
                dispatch(actionCreators.getList())
            }
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage) {
            if(page < totalPage) {
                dispatch(actionCreators.changePage(page + 1));
            } else {
                dispatch(actionCreators.changePage(1));
            }
        },
        logout () {
            dispatch(loginActionCreators.logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);