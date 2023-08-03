import React, { useState } from 'react';
import styled from "styled-components";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MenuStyle = styled.div`
position: absolute;
width: 250px;
height: 289px;
left: 104px;
top: 100px;
`;
const MenuHeadStyle = styled.p`
position: absolute;
width: 217px;
height: 48px;
left: 104px;
top: 212px;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
color: #000000;
`;
const MenuBodyStyle = styled.div`
position: absolute;
width: 250px;
height: 156px;
left: 104px;
top: 260px;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
background: #FEBC3C;
`;
const CertificationStyle = styled.p`
position: absolute;
width: 231px;
height: 46px;
left: 104px;
top: 455px;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
color: #000000;
`;
const SignUpStyle = styled.div`
position: absolute;
width: 831px;
height: 230px;
left: 449px;
top: 260px;
`;
const SignUpLabelStyle = styled.label`
position: absolute;
width: 165px;
height: 41px;
left: 300px;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
background: #D9D9D9;
`;
const InputStyle = styled.input`
    
box-sizing: border-box;
position: absolute;
width: 469px;
height: 41px;
left: 500px;
background: #FFFFFF;
border: 1px solid #000000;
`;
const ConfirmStyle = styled.button`
   font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
position: absolute;
width: 101px;
height: 34px;
left: 561px;
top: 300px;
background: #FEBC3C;
`;
const CancleStyle = styled.button`
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 25px;
position: absolute;
width: 101px;
height: 34px;
left: 701px;
top: 300px;
background: #D9D9D9;
`;
const SignUp = () => {
    const [user, setUser] = useState({});
    const changeUser = (e) => { 
        if (e.target.name == "accountPw") { 
            if (e.target.value.length > 4) { 
                e.target.value = e.target.value.substring(0, 4);
            }
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const confirm = () => {
        fetch("http://localhost:9090/bank/signUp", {
            credentials:"include",
            method: "post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(user)
        }).then(res => { 
            if (res.status === 500) {
                alert("아이디가 존재하지 않습니다.");
            }
            return res.json();
        }).then(res => {
            
            
            alert("온라인 temisoneBank회원가입이 완료되었습니다.");
        });
    };
    return (
        <div>
            <MenuStyle>
                <MenuHeadStyle>
                    고객 정보 조회
                </MenuHeadStyle>
                <MenuBodyStyle>
                    
                    고객정보 조회/수정<br />
                    ID조회/사용자 암호 재설정
                </MenuBodyStyle>
                <CertificationStyle>인증센터<NavigateNextIcon /></CertificationStyle>
            </MenuStyle>
            <SignUpStyle>
            <SignUpLabelStyle>사용자 ID</SignUpLabelStyle><InputStyle name="userId"onChange={changeUser}></InputStyle><br></br><br></br>
                <SignUpLabelStyle>생년월일</SignUpLabelStyle><InputStyle placeholder='예: 1981년 2월 1일일 경우 1981-02-01' name="userBirth"onChange={changeUser}></InputStyle><br></br><br></br>
                <SignUpLabelStyle >계좌번호</SignUpLabelStyle><InputStyle placeholder='"-"없이 입력' name="userAccount" onChange={changeUser}></InputStyle><br></br><br></br>
                <SignUpLabelStyle >계좌 비밀번호</SignUpLabelStyle><InputStyle placeholder='4자리 입력'name="accountPw"onChange={changeUser}></InputStyle><br></br><br></br>
                <ConfirmStyle onClick={confirm}>확인</ConfirmStyle><CancleStyle>취소</CancleStyle>
            </SignUpStyle>
            
        </div>
    );
};

export default SignUp;