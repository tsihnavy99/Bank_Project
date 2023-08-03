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

const ButtonStyle = styled.input`
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
    const [accounts, setAccounts] = useState({"accountNo":"", "typeName":"", "typeId":"", "accountMiddle":""
                         , "accountLast":"", "accountNickName":"", "accountMyway":"", "accountAmount":""});

    const [userId, setUserId] = useState({"userId":""});
    useEffect( () => {
        getData();        
    }, []);

    const getData = async() => {
        setLoading(true);
        setUserId({...userId, userId:"hyj1077"});
        try {
            await fetch("http://localhost:9090/bank/getAccounts", {
                credentials:"include",
                method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(userId)
            }).then(res => res.json()).then(res => {
                setAccounts(res);                    
            });
            console.log(accounts);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const Loading = () => {
        return <tr><td>Loading...</td></tr>
    }


    const transactionDetails = (e) => {
         const name=e.target.name.split("-");
        
         const typeId=name[0];
         const accountMiddle=name[1];
         const accountLast=name[2];
        console.log(name[1]);
        navigate("/transactionDetail", {state:e.target.name});
    }

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>계좌목록</TitleStyle>
                <table>
                    <thead>
                        <tr>
                            <TheadStyle>계좌번호</TheadStyle>
                            <TheadStyle>내맘대로 계좌번호</TheadStyle>
                            <TheadStyle>계좌종류</TheadStyle>
                            <TheadStyle>잔액</TheadStyle>
                            <TheadStyle>거래내역</TheadStyle>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <Loading/> : accounts.map(({accountNo, typeName, typeId, accountMiddle, accountLast, accountNickName, accountMyway, accountAmount}) => {
                            return (
                                <TbodyTrStyle key={accountNo}>
                                    <td style={tdStyle}>{typeId}-{accountMiddle}-{accountLast}</td>
                                    <td style={tdStyle}>{accountMyway==0?"-":(accountMyway+"").substr(0, 3)+"-"+(accountMyway+"").substr(3, 3)+"-"+(accountMyway+"").substr(6, 6)}</td>
                                    <td style={tdStyle}>{typeName}</td>
                                    <td style={tdStyle}>{accountAmount}</td>
                                    <td style={tdStyle}><ButtonStyle type="button" name={typeId+"-"+accountMiddle+"-"+accountLast} onClick={transactionDetails} value="거래내역"/></td>
                                </TbodyTrStyle>
                            )
                        })}
                    </tbody>
                </table>
            </ContentStyle>
        </MainStyle>
    )
};

export default AccountAutoList;