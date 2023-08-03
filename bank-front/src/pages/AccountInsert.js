import React,{useState } from "react";
import styled from "styled-components";
import './AccountInsert.css';

const InsertBox = styled.form`
position: absolute;
width: 80.1250vw;
height: 75.2778vh;
left: 10.5694vw;
top: 20.3472vh;
background: #FFF5E5;
`;

const InsertBox2 = styled.div`
position: absolute;
width: 75vw;
height: 65.0972vh;
left: 2.3667vw;
top: 5.4722vh;
background: #FFFFFF;
`;

function InputBox(){

    const [account,setAccount] = useState({});
    const changePw = (e) => {
        setAccount({
          ...account, [e.target.name]: e.target.value });
      };

      const [isAllChecked, setAllChecked] = useState(false);
      const [checkedState, setCheckedState] = useState(new Array(5).fill(false));
  
      
      
      const handleAllCheck = () => {
          setAllChecked((prev) => !prev);
          let array = new Array(5).fill(!isAllChecked);
          setCheckedState(array);
          console.log(array); 
        };
        
        const handleMonoCheck = (position: number) => {
          const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
          );
          setCheckedState(updatedCheckedState);
          const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
            if (currentState === true) {
              return sum + 1;
            }
            return sum;
          }, 0);
          setAllChecked(checkedLength === updatedCheckedState.length);
        };

    function confirm(){   
        if(isAllChecked===false){
            alert('약관체크 해주세요');
        }else{
            fetch("http://localhost:9090/bank/accountInsert", {
                credentials:"include",
               method: "post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
               },
               body: JSON.stringify(account)
            }).then(res => {
                return res.json();
            });
        };
      
        console.log(account) ;

    }

    return <>
        <div>
            <input className="productName2" type='hidden'name="typeId" value='110'/>
            <span className="productName1">상품이름</span>
            <span className="productName2">value</span>
        </div>
        <div>
            <span className="ProductPw1">신규 비밀번호</span>
            <input className="ProductPw2" type='text'name="accountPw" onChange={changePw}/>
        </div>
        <div className="conditionBox">
            <p><input type='checkBox' checked={isAllChecked} onChange={() => handleAllCheck()}/>전체동의</p>
            <p><input type='checkBox' checked={checkedState[0]} onChange={() => handleMonoCheck(0)}/>예금 거래 기본약관(필수)</p>
            <p><input type='checkBox' checked={checkedState[1]} onChange={() => handleMonoCheck(1)}/>불법, 탈법 차명거래 금지 설명 확인서(필수)</p>
            <p><input type='checkBox' checked={checkedState[2]} onChange={() => handleMonoCheck(2)}/>상품설명서(필수)</p>
            <p><input type='checkBox' checked={checkedState[3]} onChange={() => handleMonoCheck(3)}/>예금자 보호법 실명확인(필수)</p>
            <p><input type='checkBox' checked={checkedState[4]} onChange={() => handleMonoCheck(4)}/>개인정보 수집 및 이용 설명 확인(필수)</p>
        </div>
        <div className="BtnBox">
            <input type='button' value='확인' className="submitBtn" onClick={confirm}/>
            <input type='reset' value='취소' className="resetBtn"/>
        </div>
    </>

}

// function ProductPwBox(){
//     return <>
//         <div>
//             <span className="ProductPw1">신규 비밀번호</span>
//             <input className="ProductPw2" type='number'name="accountPw"/>
//         </div>
//     </>
// }

// function ConditionCheck(){
//     const [isAllChecked, setAllChecked] = useState(false);
//     const [checkedState, setCheckedState] = useState(new Array(5).fill(false));

//     console.log(isAllChecked);
    
//     const handleAllCheck = () => {
//         setAllChecked((prev) => !prev);
//         let array = new Array(5).fill(!isAllChecked);
//         setCheckedState(array);
//         console.log(array); 
//       };
      
//       const handleMonoCheck = (position: number) => {
//         const updatedCheckedState = checkedState.map((item, index) =>
//           index === position ? !item : item
//         );
//         setCheckedState(updatedCheckedState);
//         const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
//           if (currentState === true) {
//             return sum + 1;
//           }
//           return sum;
//         }, 0);
//         setAllChecked(checkedLength === updatedCheckedState.length);
//       };

//     return <>
//         <div className="conditionBox">
//             <p><input type='checkBox' checked={isAllChecked} onChange={() => handleAllCheck()}/>전체동의</p>
//             <p><input type='checkBox' checked={checkedState[0]} onChange={() => handleMonoCheck(0)}/>예금 거래 기본약관(필수)</p>
//             <p><input type='checkBox' checked={checkedState[1]} onChange={() => handleMonoCheck(1)}/>불법, 탈법 차명거래 금지 설명 확인서(필수)</p>
//             <p><input type='checkBox' checked={checkedState[2]} onChange={() => handleMonoCheck(2)}/>상품설명서(필수)</p>
//             <p><input type='checkBox' checked={checkedState[3]} onChange={() => handleMonoCheck(3)}/>예금자 보호법 실명확인(필수)</p>
//             <p><input type='checkBox' checked={checkedState[4]} onChange={() => handleMonoCheck(4)}/>개인정보 수집 및 이용 설명 확인(필수)</p>
//         </div>
//           </>
// }

// function SubmitBtn(){
 
      
//     function confirm(){    
//         fetch("http://localhost:9090/bank/accountInsert", {
//             credentials:"include",
//             method: "post",
//             headers:{
//                 "Content-Type":"application/json;charset=utf-8"
//             },
//             body: JSON.stringify({
//                 'accountPw':'accountPw'.value
//             })
//         }).then(res => {
//             return res.json();
//         });
//     }

//     return <div className="BtnBox">
//             <input type='button' value='확인' className="submitBtn" onClick={confirm}/>
//             <input type='reset' value='취소' className="resetBtn"/>
//            </div>
// }


function AccountInsert(){
    return <div>
                <InsertBox >
                    <InsertBox2>
                        <InputBox/>
                        {/* <ProductPwBox/> */}
                        {/* <ConditionCheck/> */}
                        {/* <SubmitBtn/> */}
                    </InsertBox2>
                </InsertBox>


            </div>
}

export default AccountInsert;