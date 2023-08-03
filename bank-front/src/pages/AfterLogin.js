import React from 'react';
import styled  from "styled-components";

const AssetStyle = styled.div`
box-sizing: border-box;
position: absolute;
width: 25vw;
height: 30vh;
left: 10vw;
top: 17vh;
background: #FFFFFF;
border: 0.1rem solid #000000;
border-radius: 20px;
`;
const AssetPStyle = styled.p`
/* 나의 자산 현황 */
margin-top: 1rem;
margin-left:1rem;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5vw;
color: #000000;
`;
const Favorite = styled.div`
box-sizing: border-box;
position: absolute;
width: 50vw;
height: 30vh;
left: 40vw;
top: 17vh;
text-align: center;
background: #FFF5E6;
border: 0.1rem solid #000000;
border-radius: 20px;
`;
const FavorPStyle = styled.p`
position: absolute;
left:1vw;
top:1vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5vw;
color: #000000;
`;
const FavorMoney = styled.p`
margin-top:10vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 4vw;
text-align: center;
color: #000000;
`;
const FavorSendStyle = styled.button`
background: #FFD74B;
border-radius: 10px;
width:5vw;
height: 5vh;
font-size: 1.5vw;
`;
const TitleStyle = styled.p`
position: absolute;
width: 15vw;
height: 3vh;
left: 10vw;
top: 50vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 2vw;
text-align: center;
color: #000000;
`;
const HrStyle = styled.hr`
    position: absolute;
width: 80vw;
left: 10vw;
top: 55vh;
border: 1px solid #000000;
transform: rotate(-0.11deg);
`;
const TableStyle = styled.table`
    position: absolute;
width: 60vw;
height: 30vh;
left: 20vw;
top: 60vh;
text-align: center;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5vw;
text-align: center;
`;

const AfterLogin = () => {
    return (
        <div>
            <AssetStyle>
                <AssetPStyle>나의 자산 현황</AssetPStyle>
            </AssetStyle>
            <Favorite>
                <FavorPStyle>T마이핏통장-입출금 111111-111111</FavorPStyle>
                <FavorMoney>1,000,000원</FavorMoney>
                <FavorSendStyle>이체</FavorSendStyle>
            </Favorite>
            <TitleStyle>temisone 상품</TitleStyle>
            <HrStyle></HrStyle>
            <TableStyle>
                    <tr>
                        <td><img src={`${process.env.PUBLIC_URL}/payments.png`} width="80%"height="80%"/></td>
                        <td><img src={`${process.env.PUBLIC_URL}/coins.png`}  width="80%"height="80%"/></td>
                        <td><img src={`${process.env.PUBLIC_URL}/savings.png`}  width="80%"height="80%"/></td>
                        <td><img src={`${process.env.PUBLIC_URL}/monitering.png`} width="80%"height="80%" /></td>
                    </tr>
                    <tr>
                        <td>입출금</td>
                        <td>예금</td>
                        <td>적금</td>
                        <td>보험</td>
                    </tr>
            </TableStyle>
        </div>
    );
};

export default AfterLogin;