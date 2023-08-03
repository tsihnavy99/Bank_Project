import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { Search } from '@mui/icons-material';
import "./HeaderCss.css";
const NavWrap = styled.div`
    display:flex;
    flex-direction:row;
    flex-flow:row wrap;
    justify-content:center;
    align-items:baseline;
    flex-basis:100%;
    height:60px;

`;
const Nav = styled.div`
    display:flex;
    flex-direction:row;
    flex-flow:row wrap;
    justify-content:flex-start;
    align-items:center;
    flex-basis:90%;
    height:60px;
`;
const LogoStyle = styled.div`
    flex: 0.5;
width: 10%;
height: 100%;

font-family: 'Manjari';
font-style: normal;
font-size: 40px;
margin-right:50%;
color: #000000;
`;
const NavBarStyle = styled.div`
flex:1.7;
height: 100%;

font-family: 'Manjari';
font-style: normal;
font-size: 15px;
`;
const CertStyle = styled.div`
    flex: 1;
    
    text-align: center;
    font-family: 'Manjari';
font-style: normal;
font-size: 25px;
background: #D9D9D9;
`;
const Header = () => {
    const style = { "textDecoration": "none","color":"black" };
    return (
        <NavWrap>
            <Nav>
            <LogoStyle><Link to="/"style={style}>temisone bank</Link></LogoStyle>
            <CertStyle><Link to="/login"style={style}>로그인</Link> | <Link style={style} to ="/security">인증센터</Link></CertStyle>
            <NavBarStyle>
                <ul className='headerUl'>
                    <li><Link to="/accountAutoList"style={style}>계좌관리</Link></li>
                    <li><Link to="/goods"style={style}>상품추천</Link></li>
                    <li>마이페이지</li>
                    <li>검색</li>
                    <li><SearchIcon/></li>
                </ul>
            </NavBarStyle>
            </Nav>
        </NavWrap>
    );
};

export default Header;