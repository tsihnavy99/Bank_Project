import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import SideMenu from "../components/SideMenu";
import { Link, useNavigate } from 'react-router-dom';

const MainStyle = styled.div`
display: flex;
margin: 10% auto 0px;
width: 80%;
`;

const TitleStyle = styled.div`
font-weight: bold;
font-size: 140%;
margin-bottom: 4%;
`;

const AddButtonStyle = styled.input`
background-color: #FEBC3C;
float:right;
padding: 6px 20px;
text-align: center;
border-radius: 10px;
border: 0;
&:hover{
    background-color: #E9AB33;
}
`;

const ContentStyle = styled.div`
flex: 4;
float: right;
width: 800px;
`;

const UpdateButtonStyle = styled.input`
background-color: #FEBC3C;
padding: 4px 20px;
text-align: center;
border-radius: 10px;
border: 0;
&:hover{
    background-color: #E9AB33;
}
`;

const TheadStyle = styled.td`
font-weight: bold;
background-color: #D9D9D9;
text-align: center;
padding: 10px 30px;
&:first-child {
    border-top-left-radius: 10px;
}
&:last-child {
    border-top-right-radius: 10px;
}
`;

const TbodyTrStyle = styled.tr`
padding: 4px;
background-color: #FAFAFA;
border-top: 1px solid #000000;
&:last-child td:first-child{
    border-bottom-left-radius: 10px;
}
&:last-child td:last-child{
    border-bottom-right-radius: 10px;
}
`;

const AccountAutoList = () => {
    const navigate = useNavigate();

    const style = { "textDecoration": "none","color":"black" };
    const tdStyle = {"padding":"16px 30px"};
    const trStyle = {"padding":"4px", "backgroundColor":"#FAFAFA"}
    const theadStyle = {"borderBottomStyle":"solid", "padding":"10px 30px", 
        "backgroundColor":"#D9D9D9", "fontWeight": "700", "textAlign":"center"};
    const tfootStyle = {"padding":"20px 0"};
    
    const [loading, setLoading] = useState(true);
    const [accountAuto, setAccountAuto] = useState({"autoNo":"", "receiveAccount":"", "amount":"", "period":""});

    const [userId, setUserId] = useState({"userId":""});
    useEffect( () => {
        getData();        
    }, []);

    const getData = async() => {
        setLoading(true);
        setUserId({...userId, userId:"hyj1077"});
        try {
            await fetch("http://localhost:9090/bank/accountAutoList", {
                credentials:"include",
                method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(userId)
            }).then(res => res.json()).then(res => {
                setAccountAuto(res);                    
            });
            console.log(accountAuto);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const Loading = () => {
        return <tr><td>Loading...</td></tr>
    }

    const updateAccountAuto = (e) => {
        console.log(e.target.name);
        navigate("/accountAutoUpdate", {state:e.target.name});
    }

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>자동이체 목록</TitleStyle>
                <table>
                    <thead>
                        <tr>
                            <TheadStyle>출금 계좌</TheadStyle>
                            <TheadStyle>이체할 계좌</TheadStyle>
                            <TheadStyle>이체 금액</TheadStyle>
                            <TheadStyle>이체 주기</TheadStyle>
                            <TheadStyle>수정</TheadStyle>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <Loading/> : accountAuto.map(({autoNo, typeId, accountMiddle, accountLast, receiveAccount, amount, period}) => {
                            return (
                                <TbodyTrStyle key={autoNo}>
                                    <td style={tdStyle}>{typeId}-{accountMiddle}-{accountLast}</td>
                                    <td style={tdStyle}>{receiveAccount}</td>
                                    <td style={tdStyle}>{amount} (원)</td>
                                    <td style={tdStyle}>{period}</td>
                                    <td style={tdStyle}>
                                        <UpdateButtonStyle type="button" onClick={updateAccountAuto} name={autoNo} value="수정"/>
                                    </td>
                                </TbodyTrStyle>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td/><td/><td/><td/>
                            <td style={tfootStyle}>
                                <Link to="/accountAutoAdd"style={style}>
                                    <AddButtonStyle type="button" value="추가"/>
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </ContentStyle>
        </MainStyle>
    )
};

export default AccountAutoList;