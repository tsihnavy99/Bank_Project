import React, { useEffect, useState } from "react";
import styled from 'styled-components';
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
`

const SaveButtonStyle = styled.input`
background-color: #FEBC3C;
float:right;
padding: 6px 20px;
text-align: center;
border-radius: 10px;
margin-left: 10px;
border: 0;
&:hover{
    background-color: #E9AB33;
}
`;

const DeleteButtonStyle = styled.input`
background-color: #D9D9D9;
float:right;
padding: 4px 20px;
text-align: center;
border-radius: 10px;
border: 0;
&:hover{
    background-color: #BEBEBE;
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
`

const SelectStyle = styled.select`
border: 2px solid #FEBC3C;
border-radius: 4px;
`

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
    border-top-left-radius: 16px;
}
&:last-child td:first-child{
    border-bottom-left-radius: 16px;
}
`;

const AccountMyway = () => {
    const tdStyle = {"padding":"15px", "width":"auto"};
    const tableStyle = {"borderSpacing": "0px 20px", "position": "absolute"};
    const theadStyle = {"borderRightStyle":"solid", "padding":"5px 20px", 
        "backgroundColor":"#D9D9D9", "fontWeight": "700", "textAlign":"center"};
    const tfootStyle = {"padding":"20px 0"};

    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState({"userId":""});
    //계좌정보?>param으로 사용
    const [accountMyway, setAccount] = useState({"typeId":"", "accountMiddle":"", "accountLast":"", "accountMyway":"", "userId":""});
    //전체계좌
    const [accounts, setAccountsNo] = useState({"accountNo":"", "typeId":"", "accountMiddle":"", "accountLast":"", "accountMyway":""});
    //선택계좌의 myway >설정중인계좌번호에
    const [selectedMyway, setSelected] = useState({"accountMyway":""});
    const [mywayCheck, setCheck] = useState(false);

    useEffect( () => {
        getData();
        document.getElementById("accountMyway").disabled=true;
        document.getElementById("delBtn").style.display='none';
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
                if(res!=null) {
                    setAccountsNo(res);
                    console.log(accounts);
                    setLoading(false);
                }
                else
                    alert("보유 중인 계좌가 없습니다.");
            });
        } catch(e) {
            console.log(e);
        }
       
    }

    const accountChange = (e) => {
        const value = e.target.value.split("/");
        const myway=value[0];
        const type=value[1];
        const middle=value[2];
        const last=value[3];
        document.getElementById("accountMyway").value="";

        console.log(myway);
        if(myway=="-")
            document.getElementById("accountMyway").disabled=true;
        else
            document.getElementById("accountMyway").disabled=false;

        if(myway!="0" && myway!="-") {
            setSelected({...selectedMyway, accountMyway:myway.substr(3, 3)+" - "+myway.substr(6, 6)});
            document.getElementById("delBtn").style.display='block';
        }
        else {
            setSelected({...selectedMyway, accountMyway:""});
            document.getElementById("delBtn").style.display='none';
        }
        
        setAccount({...accountMyway, accountMyway:myway, typeId:type, accountMiddle:middle, accountLast:last});
        console.log(accountMyway);
    };

    const numberChange = (e) => {
        const re = /[0-9]/g;
        const value = e.target.value;
        const length = value.length;

        if(length==4) {
            e.target.value = value.substr(0, 3)+"-"+value[3];
        } 
        if(length==3) {
            e.target.value = value.substr(0, 3);
        }

        if(!re.test(value[length-1])) {
            e.target.value = value.substr(0, length-1);
        }

        if(length>10) {
            e.target.value=value.substr(0, 10);
        }

        setCheck(false);
        setAccount({...accountMyway, [e.target.name]:"550"+e.target.value.replace("-", "")});
        console.log(accountMyway);
    };

    const checkAccountMyway = () => {
        const data = document.getElementById("accountMyway").value+"";
        setAccount({...accountMyway, accountMyway:"550"+data.replace("-", "")});
        
        if(data.length<10) {
            alert("9자리로 입력해주세요.");
        } else {

            fetch("http://localhost:9090/bank/checkAccountNo", {
                credentials:"include",
                method:"post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(accountMyway)
            }).then(res => res.json()).then(res => {
                if(res.content == "success") {
                    alert("사용 가능한 계좌번호입니다.");
                    setCheck(true);
                } else {
                    alert("이미 사용중인 계좌번호입니다.");
                    setCheck(false);
                }
            });
        }
    }

    const setAccountMyway = () => {
        if(mywayCheck) {
            setAccount({...accountMyway, userId:"session에서 가져올 ID"});

            console.log(accountMyway);

            fetch("http://localhost:9090/bank/setAccountMyway", {
                credentials:"include",
                method:"post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body: JSON.stringify(accountMyway)
            }).then(res => {                
                return res.json();
            }).then(res => {
                if(res.content == "success") {
                    alert("저장되었습니다.");
                    getData();
                    setSelected({...accountMyway, accountMyway:""});
                    document.getElementById("delBtn").style.display='none';
                } else {
                    alert("Error");
                }
            });
        } else {
            alert("사용 가능 확인 필수");
        }
    }

    const deleteAccountMyway = () => {
        console.log(accountMyway);

        fetch("http://localhost:9090/bank/deleteAccountMyway", {
            credentials:"include",
            method:"post",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body: JSON.stringify(accountMyway)
        }).then(res => {
            return res.json();
        }).then(res => {
            if(res.content == "success") {
                alert("삭제되었습니다.");
                document.getElementById("accountMyway").value="";
                getData();
                setSelected({...accountMyway, accountMyway:""});
                document.getElementById("delBtn").style.display='none';
            } else {
                alert("Error");
            }
        });
    };

    const Loading = () => {
        return <option>Loading...</option>
    }

    return (
        <MainStyle>
            <SideMenu/>
            <ContentStyle>
                <TitleStyle>내맘대로 계좌번호</TitleStyle>
                <table style={tableStyle}>
            <tbody>
                <TheadStyle>
                    <td style={theadStyle}>계좌 선택</td>
                    <td style={tdStyle}>
                        <SelectStyle name="accountNo" id="accountNo" onChange={accountChange}>
                            <option value="-">계좌를 선택해주세요.</option>
                            {loading ? <Loading/> : accounts.map(({accountNo, typeId, accountMiddle, accountLast, accountMyway}) => {
                                return (
                                    <option key={accountNo} value={accountMyway+"/"+typeId+"/"+accountMiddle+"/"+accountLast}>
                                        {typeId} - {accountMiddle} - {accountLast}
                                    </option>
                                )
                            })}
                        </SelectStyle>
                    </td>
                </TheadStyle>
                <TheadStyle>
                    <td style={theadStyle}>설정중인 계좌번호</td>
                    <td style={tdStyle}>
                        550 - {selectedMyway.accountMyway} <DeleteButtonStyle id="delBtn" type="button" onClick={deleteAccountMyway} value="삭제"/>
                    </td>
                </TheadStyle>
                <TheadStyle>
                    <td style={theadStyle}>설정할 계좌번호</td>
                    <td style={tdStyle}>
                        550 - <TextInput type="text" name="accountMyway" id="accountMyway" onChange={numberChange} />
                        <CheckButtonStyle type="button" onClick={checkAccountMyway} value="사용가능확인"/>
                    </td>
                </TheadStyle>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td style={tfootStyle}>
                        <SaveButtonStyle type="button" onClick={setAccountMyway} value="저장"/>
                    </td>
                </tr>
            </tfoot>
            </table>
            </ContentStyle>
        </MainStyle>
    )
}

export default AccountMyway;