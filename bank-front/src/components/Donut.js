import React, { useEffect, useState } from "react";
import styled from "styled-components";


const Box = styled.div`
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
const Donut = ()=>{
    const [inout,setInout] = useState(0.25);
    const [deposit,setDeposit] = useState(0.25);
    const [saving,setSaving] = useState(0.25);
    const [ensurance,setEnsurance] = useState(0.25);
    useEffect(()=>{
        fetch("http://localhost:9090/bank/myGoods").then(res=>res.json()).then(
            res=>{
                setInout(res.inout);
                setDeposit(res.deposit);
                setSaving(res.saving);
                setEnsurance(res.ensurance);

            }
        );
    })
    const Circle = ()=>{
        return<div>
        <div style={{ width: '10vw', height: '10vw' }}>
          <svg viewBox="0 0 250 250">
            <circle 
                cx="110"
                cy="110" 
                r="90" 
                fill="none" 
                stroke="beige" 
                strokeWidth="40" 
                strokeDasharray={[2*Math.PI*90*0.25,2*Math.PI*90*0.75]}
                strokeDashoffset={0}/>
            <circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              stroke="green"
              strokeWidth="40"
              strokeDasharray={[2*Math.PI*90*0.25,2*Math.PI*90*0.75]}
                strokeDashoffset={2*Math.PI*90*0.25}
            />
             <circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              stroke="yellow"
              strokeWidth="40"
              strokeDasharray={[2*Math.PI*90*0.25,2*Math.PI*90*0.75]}
                strokeDashoffset={2*Math.PI*90*0.5}
            /> <circle
            cx="110"
            cy="110"
            r="90"
            fill="none"
            stroke="red"
            strokeWidth="40"
            strokeDasharray={[2*Math.PI*90*0.25,2*Math.PI*90*0.75]}
            strokeDashoffset={2*Math.PI*90*0.75}
          />
          </svg>
        </div>
      </div>;
    }
    return(
        <Box><Circle></Circle>
        
        </Box>
    );
}
export default Donut;