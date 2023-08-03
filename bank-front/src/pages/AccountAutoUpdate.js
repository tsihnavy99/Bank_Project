import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const AccountAutoUpdate = () => {
    const navigate = useNavigate();

    const style={ "textDecoration": "none","color":"black" };
    const tdStyle = {"padding":"15px", "width":"auto"};
    const theadStyle = {"borderRightStyle":"solid", "padding":"10px 30px", 
        "backgroundColor":"#D9D9D9", "fontWeight": "700", "textAlign":"center"};
    const tfootStyle = {"padding":"20px 0"};

    const [state] = useState({"autoNo":useLocation().state});
    const [loading, setLoading] = useState(true);

    const [accountAuto, setAccountAuto] = useState({"typeId":"", "accountMiddle":"", "accountLast":"", "receiveAccount":"", "amount":"", "period":""});
    
    useEffect( () => {
        getData();        
    }, []);

    const getData = async() => {
        setLoading(true);
        console.log(state);
        try {
            await fetch("http://localhost:9090/bank/getAccountAuto", {
                credentials:"include",
                method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(state)
            }).then(res => res.json()).then(res => {
                setAccountAuto(res);
            });
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const setPeriod = () => {
        const select = document.getElementById("period");
        const len = select.options.length;
        for(let i=0; i<len; i++) {
            if(select.options[i].value==accountAuto.period) {
                select.options[i].selected=true;
            }
        }
    }

    const Loading = () => {
        return <option>Loading...</option>
    }

    const selectPeriod = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setAccountAuto({...accountAuto, [name]:value});
     
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

        if(length>7) {
            e.target.value=value.substr(0, 7);
        }

        setAccountAuto({...accountAuto, [e.target.name]:e.target.value});
        console.log(accountAuto);
    };

    const update = (e) => {    
        fetch("http://localhost:9090/bank/updateAccountAuto", {
            credentials:"include",
            method:"post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(accountAuto)
        }).then(res => res.json()).then(res => {
            if(res.content == "success") {
                alert("수정되었습니다.");
                navigate("/accountAutoList");
            } else {
                alert("Error");
            }
        });
    };

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>자동이체 설정</TitleStyle>
                <table>
                <tbody>
                    <TheadStyle>
                        <td style={theadStyle}>출금 계좌</td>
                        <td style={tdStyle}>
                            {loading?<Loading/>:(accountAuto.typeId+"-"+accountAuto.accountMiddle+"-"+accountAuto.accountLast)}
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>이체할 계좌번호</td>
                        <td style={tdStyle}>
                            {loading?<Loading/>:accountAuto.receiveAccount}
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>이체할 금액</td>
                        <td style={tdStyle}>
                            <TextInput type="text" name="amount" onChange={inputChange} defaultValue={accountAuto.amount}/> (원)
                        </td>
                    </TheadStyle>
                    <TheadStyle>
                        <td style={theadStyle}>계좌 이체 주기</td>
                        <td style={tdStyle}>
                            {loading?"":setPeriod()}
                            <SelectStyle name="period" id="period" onChange={selectPeriod} defaultValue={accountAuto.period}>
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
                            <SaveButtonStyle type="button" onClick={update} value="수정"/>
                            <Link to="/accountAutoList" style={style}><CancelButtonStyle type="button" value="취소"/></Link>
                        </td>
                    </tr>
                </tfoot>
                </table>
            </ContentStyle>
        </MainStyle>
    )
}

export default AccountAutoUpdate;