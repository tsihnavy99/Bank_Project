import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const MenuStyle = styled.div`
position: absolute;
width: 20vw;
height: 15vh;
left: 5vw;
top: 10vh;
`;
const MenuHeadStyle = styled.p`
position: absolute;
width: 20vw;
height: 5vh;
left: 5vw;
top: 20vh;
font-family: 'Manjari';
font-size: 1.5rem;
color: #000000;
`;
const MenuBodyStyle = styled.div`
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
position: absolute;
width: 15vw;
height: 20vh;
left: 5vw;
top: 25vh;
padding-left:2vw;
padding-top:2vw;
background: #FEBC3C;
`;
const VerifySylte = styled.div`
position: absolute;
width: 60vw;
height: 20vh;
left: 15vw;
top: 30vh;
`;
const LabelStyle = styled.label`
position: absolute;
width: 10vw;
height: 4vh;
left: 20vw;
font-family: 'Manjari';
font-size: 1.5rem;
background: #D9D9D9;
`;
const InputStyle = styled.input`
box-sizing: border-box;
position: absolute;
width: 25vw;
height: 4vh;
left: 31vw;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
background: #FFFFFF;
border: 1px solid #000000;
`;
const ConfirmStyle = styled.button`
 font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
position: absolute;
width: 5vw;
height: 4vh;
left: 34vw;
top: 30vh;
background: #FEBC3C;
`;
const CancleStyle = styled.button`
 font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
position: absolute;
width:5vw;
height: 4vh;
left: 40vw;
top: 30vh;
background: #D9D9D9;
`;
const InputDivStyle = styled.div`
    position: absolute;
    left: 31vw;
    width:30vw;
`;
const InputStyletwo = styled.input`
    box-sizing: border-box;
width: 12.5vw;
height: 4vh;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
background: #FFFFFF;
border: 1px solid #000000;
`; 
const DSecurity = () => {
    const [user, setUser] = useState({
    });
   
    const changeValue = (e) => { 
        
        if (e.target.name == "userNo") { 
            
        }
        setUser({...user,[e.target.name]: e.target.value });
    };
    const confirmFunc = () => { 
        console.log(user);
        fetch("http://localhost:9090/bank/dcert", {
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
            
            const result = res.content;
            
             if (result === "fail-1") {
                alert("인증서가 존재하지 않습니다.")
            } else { 
                alert("인증서가 삭제되었습니다.");
            }
           
        });
    };
    return (
        <div>
            <MenuStyle>
                <MenuHeadStyle>인증센터</MenuHeadStyle>
                <MenuBodyStyle>
                    <Link to="/security">인증서 발급</Link><br></br>
                    <Link to="/dsecurity">인증서 삭제</Link>
                </MenuBodyStyle>
            </MenuStyle>
            <VerifySylte>
                <LabelStyle>사용자 ID</LabelStyle><InputStyle name="userId" onChange ={changeValue}></InputStyle><br></br><br></br>
                <LabelStyle>주민등록번호</LabelStyle><InputDivStyle><InputStyletwo name="userNo"onChange={changeValue} maxLength="6"></InputStyletwo>-<InputStyletwo maxLength="7" type="password"></InputStyletwo></InputDivStyle><br></br><br></br>
                <ConfirmStyle onClick={confirmFunc}>확인</ConfirmStyle><CancleStyle>취소</CancleStyle>
            </VerifySylte>
        </div>
    );
};

export default DSecurity;