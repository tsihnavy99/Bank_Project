import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";

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

const ContentStyle = styled.div`
flex: 4;
float: right;
width: 800px;
`;

const SaveButtonStyle = styled.input`
background-color: #FEBC3C;
float:right;
padding: 6px 20px;
text-align: center;
border-radius: 10px;
margin: 0px 20px;
border: 0;
&:hover{
    background-color: #E9AB33;
}
`;

const CheckButtonStyle = styled.input`
background-color: #FEBC3C;
padding: 4px 20px;
text-align: center;
border-radius: 10px;
float: right;
margin-left: 10px;
border: 0;
&:hover{
    background-color: #E9AB33;
}
`;
const TextInput = styled.input`
border: 2px solid #FEBC3C;
border-radius: 4px;
&:disabled {
    background-color: #EAEAEA;
}    
`;

const SelectStyle = styled.select`
border: 2px solid #FEBC3C;
border-radius: 4px;
`;

const TheadStyle = styled.tr`
font-weight: bold;
background-color: #FFFFFF;
padding: 10px 30px;
& td:first-child {
    background-color: #D9D9D9;
    border-right: 1px solid #000000;
    text-align: center;
    padding: 16px 36px;
}
&:first-child td:first-child{
    border-top-left-radius: 10px;
}
&:last-child td:first-child{
    border-bottom-left-radius: 10px;
}
`;

const AccountTransfer = () => {
    const navigate = useNavigate();

    const tdStyle = {"padding":"18px", "width":"auto"};
    const theadStyle = {"borderRightStyle":"solid", "padding":"10px 30px", 
        "backgroundColor":"#D9D9D9", "fontWeight": "700", "textAlign":"center"};
    const tfootStyle = {"padding":"20px 0"};

    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState({"userId":""});
    const [transactionDetail, setTransaction] = useState({"typeId":"", "accountMiddle":"", "accountLast":"", 
                    "receiveAccount":"", "recipient":"", "withdrawalAmount":"", "userId":""});
    const [accounts, setAccountsNo] = useState({"accountNo":"", "typeId":"", "accountMiddle":"", "accountLast":""});
    //계좌확인여부
    const [accountCheck, setCheck] = useState(false);
    //이체할 계좌번호 확인
    const [noCheck, setNo] = useState({"typeId":"", "accountMiddle":"", "accountLast":"", "accountMyway":""});

    const selectChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name=="accountNo") {
            const v = value.split("/");
            const type=v[0];
            const middle=v[1];
            const last=v[2];
            setTransaction({...transactionDetail, typeId:type, accountMiddle:middle, accountLast:last});
        }
        else {
            setTransaction({...transactionDetail, [name]:value});
        }
        
        console.log(transactionDetail);
    };

    const inputChange = (e) => {
        const re = /[0-9]/g;
        const name = e.target.name;
        const value = e.target.value;
        const length = value.length;

        if(!re.test(value[length-1])) {
            e.target.value = value.substr(0, length-1);
        }

        if(name=="receiveAccount") {
            const type = document.getElementById("receiveAccountType").value+"";
            const middle = document.getElementById("receiveAccountMiddle").value+"";
            const last = document.getElementById("receiveAccountLast").value+"";
            setNo({...noCheck, typeId:type, accountMiddle:middle, accountLast:last, accountMyway:(type+middle+last)});
            setCheck(false);
        } else {
            if(length>7) {
                e.target.value=value.substr(0, 7);
            }
        }

        setTransaction({...transactionDetail, [e.target.name]:e.target.value});
        console.log(transactionDetail);
    };

    useEffect( () => {
        getData();        
    }, []);

    const getData = async() => {
        setLoading(true);
        setUserId({...userId, "userId": "****userId****"});
        try {
            await fetch("http://localhost:9090/bank/getAccounts", {
                credentials:"include",
                method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(userId)
            }).then(res => res.json()).then(res => {
                if(res!=null) 
                    setAccountsNo(res);
                else
                    alert("보유 중인 계좌가 없습니다.");
            });
            console.log(accounts);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const Loading = () => {
        return <option>Loading...</option>
    }

    const checkAccount = () => {
        const type = document.getElementById("receiveAccountType").value+"";
        const middle = document.getElementById("receiveAccountMiddle").value+"";
        const last = document.getElementById("receiveAccountLast").value+"";
        setNo({...noCheck, typeId:type, accountMiddle:middle, accountLast:last, accountMyway:(type+middle+last)});
        console.log(noCheck.accountMyway);
        
        fetch("http://localhost:9090/bank/checkReceiveAccountNo", {
            credentials:"include",
            method:"post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(noCheck)
        }).then(res => res.json()).then(res => {
            if(res.content != "fail") {
                setTransaction({...transactionDetail, recipient:res.content, receiveAccount:type+"-"+middle+"-"+last});
                alert("유효한 계좌번호입니다.");
                setCheck(true);
            } else {
                alert("잘못된 계좌번호입니다.");
                setCheck(false);
            }
        });
    }

    const accountTransfer = () => {
        if(!accountCheck) {
            alert("유효한 계좌인지 확인하세요.");
        }
        else {
            try {
                console.log(transactionDetail);
                fetch("http://localhost:9090/bank/accountTransfer", {
                    credentials:"include",
                    method: "post",
                    headers:{
                        "Content-Type":"application/json;charset=utf-8"
                    },
                    body: JSON.stringify(transactionDetail)
                }).then(res => res.json()).then(res => {
                    if(res.content=="success") {
                        alert("완료되었습니다.");
                        document.getElementById("receiveAccountType").value="";
                        document.getElementById("receiveAccountMiddle").value="";
                        document.getElementById("receiveAccountLast").value="";
                        document.getElementById("withdrawalAmount").value="";
                    }
                    else
                        alert("Error");
                });
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>계좌이체</TitleStyle>
                <form>
                <table>
                <tbody>
                    <TheadStyle>
                        <td style={theadStyle}>출금 계좌 선택</td>
                        <td style={tdStyle}>
                            <SelectStyle name="accountNo" id="accountNo" onChange={selectChange}>
                                {loading ? <Loading/> : accounts.map(({accountNo, typeId, accountMiddle, accountLast}) => {
                                    return (
                                        <option key={accountNo} value={typeId+"/"+accountMiddle+"/"+accountLast}>
                                            {typeId} - {accountMiddle} - {accountLast}
                                        </option>
                                    )
                                })}
                            </SelectStyle>
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>이체할 계좌번호</td>
                        <td style={tdStyle}>
                            <TextInput type="text" name="receiveAccount" id="receiveAccountType" size="1" maxLength="3" onChange={inputChange} />
                             - 
                            <TextInput type="text" name="receiveAccount" id="receiveAccountMiddle" size="1" maxLength="3" onChange={inputChange} />
                             - 
                            <TextInput type="text" name="receiveAccount" id="receiveAccountLast" size="6" maxLength="6" onChange={inputChange} /><span> </span>
                            <CheckButtonStyle type="button" onClick={checkAccount} value="계좌 확인"/>
                            {/* 존재하는 계좌번호인지 확인 */}
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>이체할 금액</td>
                        <td style={tdStyle}>
                            <TextInput type="text" id="withdrawalAmount" name="withdrawalAmount" onChange={inputChange}/> (원)
                        </td>
                    </TheadStyle>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td></td>
                        <td style={tfootStyle}>
                            <SaveButtonStyle type="button" onClick={accountTransfer} value="보내기"/>
                        </td>                    
                    </tr>
                    </tfoot>
                </table>
                </form>
            </ContentStyle>
        </MainStyle>
    )
}

export default AccountTransfer;