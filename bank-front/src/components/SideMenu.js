import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const MenuStyle = styled.div`
float:left;
flex: 1;
width:250px;
margin-right: 10%;
`;

const TitleStyle = styled.div`
font-weight: bold;
font-size: 140%;
`;

const ListStyle = styled.ol`
background-color: #FEBC3C;
padding: 6px;
border-radius: 4px;
margin-top: 10%;
`;

const LiStyle = styled.li`
&:hover{
    background-color: #E9AB33;
}
border-radius: 6px;
padding: 10px;
`;

const SideMenu = () => {
    const style = {"textDecoration":"none","color":"black"};
    return (
        <MenuStyle>
            <TitleStyle>계좌관리</TitleStyle>
            <ListStyle>
                <Link to="/accountList"style={style}><LiStyle>계좌목록</LiStyle></Link>
                <Link to="/accountTransfer"style={style}><LiStyle>계좌이체</LiStyle></Link>
                <Link to="/accountAutoList"style={style}><LiStyle>자동이체</LiStyle></Link>
                <Link to="/accountMyway"style={style}><LiStyle>내맘대로 계좌번호</LiStyle></Link>
            </ListStyle>
        </MenuStyle>
    )
}

export default SideMenu;