import React, { useState } from "react";
import styled from "styled-components";

function CountAllUser() {
  const [count, setCount] = useState(null);

  const getUserCount = async () => {
    try {
      await fetch("http://localhost:9090/bank/countUser")
        .then((response) => response.json())
        .then((data) => {
          setCount(JSON.stringify(data));
        });
    } catch (e) {
      console.log(e);
    }
  };
  getUserCount();
  const printCount =
    count !== null
      ? count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : "Loading...";

  return (
    <>
      <label htmlFor="countUser">총 회원수</label>
      <span id="countUser">{printCount}</span>
    </>
  );
}

const StyledCountAllUser = styled.p`
  display: flex;
  justify-content: bottom;
  align-items: baseline;
  > * {
    display: block;
  }
  > label {
    font-weight: 600;
    padding-right: 20px;
  }
  > #countUser {
    color: #ffd74b;
    font-size: 36px;
  }
`;

const MasterIndex = () => {
  return (
    <div>
      <StyledCountAllUser>
        <CountAllUser />
      </StyledCountAllUser>
    </div>
  );
};

export default MasterIndex;
