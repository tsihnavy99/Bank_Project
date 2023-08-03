import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const GoodsBlockStyle = styled.div`
    position: absolute;
width: 30vw;
height: 15vh;
left: 35vw;
top: 15vh;
padding: 2vw;
font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 1.5rem;
background: #FFD74B;
border-radius: 2rem;
`;

const Goods = () => {
    
    const [goods, setGoods] = useState([{"gName":"","gInterest":"","gPeriod":"","gMPay":"","gAge":"","gType":""}]);
    
    const [slidePx, setSlidePx] = useState(50);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect ( () => { 
        fetch("http://localhost:9090/bank/goods").then(res => res.json()).then(res => {
            
            
            setGoods(res);
            }
        );
       
    }, []);
   
    
    
    const GoodsUlStyle = ({good})=>{
        return <ul style={{listStyle:"none",position:"absolute",left:slidePx+"%",top:"50%",transform:"translate(-50%,-50%)"}}>
            <li>
                {good.gName}
            </li>
            {good.gInterest!=0?
                <li>연 {good.gInterest}%</li>
            :null}
            {good.gPeriod!=0?
                <li>최대 {good.gPeriod}개월</li>
            :null}
            {good.gMPay!=0?
                <li>월납 {good.gMPay}원</li>
            :null}
            {good.gAge!=0?
                <li>만 {good.gAge}세부터 지급</li>
            :null}
            {good.gMaturity!=0?
                <li>만기 {good.gMaturity}년</li>
            :null}
        </ul>
    }
    setInterval(() => {
        
        slidePx<30? setSlidePx(slidePx=>70): setSlidePx(slidePx=>slidePx-10);
        
     
    }, 3000);
    return (
        <div>
            <GoodsBlockStyle>
                나에게 딱 맞는<br></br>
                금융상품을 찾아보세요
            </GoodsBlockStyle>
            <GoodsUlStyle good={goods[index]}></GoodsUlStyle>
           
        </div>
    );
};

export default Goods;