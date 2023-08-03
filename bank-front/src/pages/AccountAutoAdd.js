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

const CancelButtonStyle = styled.input`
background-color: #D9D9D9;
float:right;
padding: 6px 20px;
text-align: center;
border-radius: 10px;
border: 0;
&:hover{
    background-color: #BEBEBE;
}
`;

const CheckButtonStyle = styled.input`
background-color: #FEBC3C;
padding: 4px 16px;
width: auto;
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

const AccountAutoAdd = () => {
    const navigate = useNavigate();

    const style={ "textDecoration": "none","color":"black" };
    const tdStyle = {"padding":"15px", "width":"auto"};
    const tableStyle = {"borderSpacing": "0px 20px", "position": "absolute"};
    const theadStyle = {"borderRightStyle":"solid", "padding":"5px 20px", 
        "backgroundColor":"#D9D9D9", "fontWeight": "700", "textAlign":"center"};
    const tfootStyle = {"padding":"20px 0"};

    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState({"userId":""});
    const [accountAuto, setAccountAuto] = useState({"typeId":"", "accountMiddle":"", "accountLast":"", "receiveAccount":"", "amount":"", "period":""});
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
            setAccountAuto({...accountAuto, typeId:type, accountMiddle:middle, accountLast:last});
        }
        else {
            setAccountAuto({...accountAuto, [name]:value});
        }
        
        console.log(accountAuto);
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

        setAccountAuto({...accountAuto, [e.target.name]:e.target.value});
        console.log(accountAuto);
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
            if(res.content == "success") {
                setAccountAuto({...accountAuto, receiveAccount:(type+"-"+middle+"-"+last)});
                alert("유효한 계좌번호입니다.");
                setCheck(true);
            } else {
                alert("잘못된 계좌번호입니다.");
                setCheck(false);
            }
        });
    }

    const addAccountAuto = () => {
        if(!accountCheck) {
            alert("유효한 계좌인지 확인하세요.");
        }
        else {
            try {
                console.log(accountAuto);
                fetch("http://localhost:9090/bank/addAccountAuto", {
                    credentials:"include",
                    method: "post",
                    headers:{
                        "Content-Type":"application/json;charset=utf-8"
                    },
                    body: JSON.stringify(accountAuto)
                }).then(res => res.json()).then(res => {
                    if(res.content=="success") {
                        alert("저장되었습니다.");
                        navigate("/accountAutoList");
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
                <TitleStyle>자동이체 설정</TitleStyle>
                <table style={tableStyle}>
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
                            <span> - </span>
                            <TextInput type="text" name="receiveAccount" id="receiveAccountMiddle" size="1" maxLength="3" onChange={inputChange} />
                            <span> - </span>
                            <TextInput type="text" name="receiveAccount" id="receiveAccountLast" size="6" maxLength="6" onChange={inputChange} /><span> </span>
                            <CheckButtonStyle type="button" onClick={checkAccount} value="계좌 확인"/>
                            {/* 존재하는 계좌번호인지 확인 */}
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>이체할 금액</td>
                        <td style={tdStyle}>
                            <TextInput type="text" name="amount" onChange={inputChange}/> (원)
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>계좌 이체 주기</td>
                        <td style={tdStyle}>
                            <SelectStyle onChange={selectChange} name="period">
                                <option>매달 1일</option>
                                <option>매달 15일</option>
                                <option>매주 월요일</option>
                                <option>매일</option>
                            </SelectStyle>
                        </td>
                    </TheadStyle>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td></td>
                        <td style={tfootStyle}>
                            <SaveButtonStyle type="button" onClick={addAccountAuto} value="저장"/>
                            <Link to="/accountAutoList" style={style}>
                                <CancelButtonStyle type="button" value="취소"/>
                            </Link>
                        </td>                    
                    </tr>
                    </tfoot>
                </table>
            </ContentStyle>
        </MainStyle>
    )
}

export default AccountAutoAdd;