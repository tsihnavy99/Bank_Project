import React from 'react';
import styled from 'styled-components';
const MasterLnbWrap = styled.ul`
    > li + li {
        margin-top: 50px;
    }

    ul > li {
        padding-left: 20px;
    }
`;
const MenuTitle = styled.label`
    display: block;
    font-weight: 600;
    margin-bottom: 20px;
`;
const MasterLnb = () => {
    return (
        <MasterLnbWrap>
            <li>
                <MenuTitle htmlFor="userManagement">사용자 관리</MenuTitle>
                <ul id="userManagement">
                    <li><a href="/userList">사용자 정보 조회 / 변경</a></li>
                    <li><a href="/accountList">전계좌 조회</a></li>
                    <li><a href="/salesList">거래내역 조회</a></li>
                </ul>
            </li>
            <li>
                <MenuTitle htmlFor="productManagement">상품 관리</MenuTitle>
                <ul id="productManagement">
                    <li><a href="/addProduct">상품 등록 / 변경</a></li>
                    <li><a href="/joinProductUserList">상품 가입자 내역 조회</a></li>
                </ul>
            </li>
        </MasterLnbWrap>
    );
};

export default MasterLnb;