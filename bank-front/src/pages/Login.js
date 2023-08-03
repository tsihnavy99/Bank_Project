import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from '../components/Header';

const BackStyle = styled.div`
position: absolute;
width: 100vw;
height: 70vh;
top: 17vh;
background-color: #FFF5E5;
`;
const CertLoginBox = styled.div`
margin: 0 auto;
margin-top:5vh;
width: 60vw;
height: 60vh;
background: #FFFFFF;
`;

const ButtonStyle = styled.button`
float:right;
width: 30vw;
height: 10vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 2rem;
text-align: center;
background: #D9D9D9;
border:0;
`;
const TitleStyle = styled.p`
position: absolute;
left: 20vw;
top: 5vh;
width: 30vw;
height: 10vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 2rem;
padding-top: 3vh;
text-align: center;
`;
const IdButtonStyle = styled.button`
float:left;
width: 30vw;
height: 10vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 2rem;
text-align: center;
background: #D9D9D9;
border:0;
`;
const IdTitleStyle = styled.p`
position: absolute;
left: 50vw;
top: 5vh;
width: 30vw;
height: 10vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 2rem;
padding-top: 3vh;
text-align: center;
`;
const InputStyle = styled.input`
box-sizing: border-box;
position: absolute;
width: 30vw;
height: 4vh;
left: 35vw;
margin-top:25vh;
background: #FFFFFF;
border: 1px solid #000000;
`;
const Login = () => {
    const navigate = useNavigate();
    const buttonStyle = { "border": "0", "backgroundColor": "#FFD74B" };
    const [certStyle, setCertStyle] = useState({ "display": "block" });
    const [idStyle, setIdStyle] = useState({ "display": "none" });
    const clickCert = (e) => {
        setCertStyle({ "display": "none" });
        setIdStyle({ "display": "block" });
    };
    const clickId = (e) => {
        setCertStyle({ "display": "block" });
        setIdStyle({ "display": "none" });
    };
    const [certUser, setCertUser] = useState({"userName":"","userBirth":""});
    const [idUser, setIdUser] = useState({"userId":"","userPassword":""});
    const certChange = (e) => { 
        setCertUser({ ...certUser, [e.target.name]: e.target.value });
    };
    const idChange = (e) => {
        setIdUser({ ...idUser, [e.target.name]: e.target.value });
        console.log(idUser);
    };
    const certLogin = () => {
        fetch("http://localhost:9090/bank/certLogin", {
            credentials:"include",
            method: "post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(certUser)
        }).then(res => { 
            if (res.status === 500) {
                alert("아이디가 존재하지 않습니다.");
            }
            return res.json();
        }).then(res => {
            if (res.content == "success") {
                alert("로그인 되었습니다.");
                navigate("/");
            } else { 
                alert("비밀번호가 틀렸습니다.");
                setIdUser({ "userId": "", "userPassword": "" });
            }
           
        });
    };
   
    const idLogin = () => { 
        fetch("http://localhost:9090/bank/idLogin", {
            credentials:"include",
            method: "post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(idUser)
        }).then(res => { 
            if (res.status === 500) {
                alert("아이디가 존재하지 않습니다.");
            }
            return res.json();
        }).then(res => {
            if (res.content == "success") {
                alert("로그인 되었습니다.");
                navigate("/");
            } else { 
                alert("비밀번호가 틀렸습니다.");
            }
           
        });
    };
    return (
        <div>
            <BackStyle>
                <CertLoginBox style={certStyle}>
                    <TitleStyle>인증서 로그인</TitleStyle>
                    <ButtonStyle onClick={clickCert} >아이디 로그인</ButtonStyle>
                    <InputStyle placeholder='이름 김국민' name = "userName" onChange={certChange}></InputStyle><br></br><br></br>
                    <InputStyle placeholder='생년월일 YYMMDD'name="userBirth" onChange={certChange}></InputStyle><br></br><br></br>
                    <InputStyle style={buttonStyle} type="button" value="로그인" onClick={certLogin}></InputStyle><br></br><br></br>
                </CertLoginBox>
                <CertLoginBox style={idStyle}>
                    <IdButtonStyle onClick={clickId} >인증서 로그인</IdButtonStyle>
                    <IdTitleStyle>아이디 로그인</IdTitleStyle>
                    <InputStyle placeholder='ID'name="userId" onChange={idChange}></InputStyle><br></br><br></br>
                    <InputStyle placeholder='PASSWORD'name="userPassword" onChange={idChange}></InputStyle><br></br><br></br>
                    <InputStyle style={buttonStyle} type="button" value="로그인" onClick={idLogin}></InputStyle><br></br><br></br>
                </CertLoginBox>
            </BackStyle>
        </div>
    );
};

export default Login;