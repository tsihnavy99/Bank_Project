import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket,faShieldHalved,faMoneyBillTransfer,faBuildingColumns,faPiggyBank,faUmbrella } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogcerBox = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 700px;
    height: 300px;
    left:33.6389vw;
    top:40vh;
`;
const LoginBox = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 320px;
    height: 143px;
    left:20px;
    top:80px;
    background: #FEBC3C;
    border: 1px solid #FEBC3C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const LoginText = styled.span`
    position: absolute;
    width: 150px;
    height: 40px;
    font-family: 'Manjari';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 42px;
    left: 140px;
    top:50px;
    color: #FFFFFF;
`;

const CertificateBox = styled.div`
    position: absolute;
    width: 320px;
    height: 143px;
    left:350px;
    top:80px;
    background: #676560;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const LoginBtn = {
    "position":"absolute",
    "width":"90px",
    "height":"83px",
    "left":"43px",
    "top":"29px",
    "color":"white"
}

const BankProductBox = styled.div`
    position: absolute;
    width: 900px;
    height: 300px;
    left:31.5389vw;
    top:90vh;
`;

const ProductTextBox = styled.div`
    float:left;
    position: absolute; 
    text-align: center;
    top: 30px;
`;

const ProductText = styled.span`
    font-size: 2em;
    font-weight: bold;
`;

const Account = styled.div`
    margin-left: 200px;
    float: left;
    text-align: center;
`;

const ProductIcon = {
    "width":"95px",
    "height":"63px",
    "color":"lightgray"
}

const ProductText2 = styled.span`
    font-size: 1em;
`;

const Deposit = styled.div`
    margin-left: 100px;
    float : left;
    text-align: center;
`;

const Installment = styled.div`
    margin-left: 100px;
    float : left;
    text-align: center;
`;

const Insurance = styled.div`
    margin-left: 100px;
    float : left;
    text-align: center; 
`;

function BeforeLogin(){

return <div>
        <LogcerBox>
		<LoginBox>
        <Link to="/login">
        <FontAwesomeIcon icon={faRightToBracket} style={LoginBtn}/>
            <LoginText>로그인</LoginText>
        </Link>
		</LoginBox>
		<CertificateBox>
        <Link to="/security">
        <FontAwesomeIcon icon={faShieldHalved} style={LoginBtn}/>
			<LoginText>인증센터</LoginText>
        </Link>
		</CertificateBox>
	    </LogcerBox>

    <BankProductBox>
		<ProductTextBox>
			<ProductText>금융상품</ProductText> 
		</ProductTextBox>
		<Account>
            <FontAwesomeIcon icon={faMoneyBillTransfer} style={ProductIcon}/>
			<br/> 
			<ProductText2>입출금</ProductText2>
		</Account>
		<Deposit>
            <FontAwesomeIcon icon={faBuildingColumns} style={ProductIcon}/>
			<br/>
			<ProductText2>예금</ProductText2>
		</Deposit>
		<Installment>
            <FontAwesomeIcon icon={faPiggyBank} style={ProductIcon}/>
			<br/>
			<ProductText2>적금</ProductText2>
		</Installment>
		<Insurance>
            <FontAwesomeIcon icon={faUmbrella} style={ProductIcon}/>
			<br/>
			<ProductText2>보험</ProductText2>
		</Insurance>
	</BankProductBox>
      </div>
}
export default BeforeLogin;