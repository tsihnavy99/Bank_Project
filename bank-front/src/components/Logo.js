import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoStyle = styled.div`
  width: 10%;
  height: 100%;

  h1 {
    font-family: "Manjari" !important;
    font-style: normal;
    font-weight: 700;
    /* font-size: 2.5vw; */
    font-size: 40px;
    line-height: 3vw;
    color: #000000;
  }
`;
const Logo = () => {
  const style = { textDecoration: "none", color: "black" };
  return (
    <div>
      <LogoStyle>
        <Link to="/" style={style}>
          <h1>
            temisone
            <br /> bank
          </h1>
        </Link>
      </LogoStyle>
    </div>
  );
};

export default Logo;
