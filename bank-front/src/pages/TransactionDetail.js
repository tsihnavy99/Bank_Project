import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import SideMenu from "../components/SideMenu";
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
    const [state] = useState({"state":(useLocation().state+"").split("-")});
    const [account] = useState({"typeId":state.state[0], "accountMiddle":state.state[1], "accountLast":state.state[2]});
    //const [account] = useState({"typeId":(useLocation().state+"").split("-")[0], "accountMiddle":(useLocation().state+"").split("-")[1], "accountLast":(useLocation().state+"").split("-")[2]});//useState({"typeId":useLocation().typeId, "accountMiddle":useLocation().accountMiddle, "accountLast":useLocation().accountLast});
    const [details, setDetails] = useState({"transactionNo":"", "sender":"", "recipient":"", "depositAmount":""
                         , "withdrawalAmount":"", "balance":""});

    const [userId, setUserId] = useState({"userId":""});
    useEffect( () => {
        getData();        
    }, []);

    const getData = async() => {
        setLoading(true);
        setUserId({...userId, userId:"hyj1077"});
        console.log(account.typeId);
        try {
            await fetch("http://localhost:9090/bank/getDetails", {
                credentials:"include",
                method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(account)
            }).then(res => res.json()).then(res => {
                setDetails(res);                   
            });
            console.log(details);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const Loading = () => {
        return <tr><td>Loading...</td></tr>
    }

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>{account.typeId}-{account.accountMiddle}-{account.accountLast} 거래내역</TitleStyle>
                <table>
                    <thead>
                        <tr>
                            <TheadStyle>보낸분</TheadStyle>
                            <TheadStyle>받는분</TheadStyle>
                            <TheadStyle>출금액</TheadStyle>
                            <TheadStyle>입금액</TheadStyle>
                            <TheadStyle>잔액</TheadStyle>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <Loading/> : details[0]!=null?(details.map(({transactionNo, sender, recipient, depositAmount, withdrawalAmount, balance}) => {
                            return (
                                <TbodyTrStyle key={transactionNo}>
                                    <td style={tdStyle}>{sender}</td>
                                    <td style={tdStyle}>{recipient}</td>
                                    <td style={tdStyle}>{depositAmount==0?"-":depositAmount}</td>
                                    <td style={tdStyle}>{withdrawalAmount==0?"-":withdrawalAmount}</td>
                                    <td style={tdStyle}>{balance}</td>
                                </TbodyTrStyle>
                            )
                        })):(<td style={tdStyle} colSpan="5">거래내역이 없습니다.</td>)
                    }
                    </tbody>
                </table>
            </ContentStyle>
        </MainStyle>
    )
};

export default AccountAutoList;