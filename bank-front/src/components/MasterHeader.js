import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

// ----- style [
const MasterHeaderWrapStyle = styled.div`
  display: flex;
  margin-bottom: 50px;
`;
const StyledLogo = styled(Logo)`
  width: 10%;
`;
const PageNameStyle = styled.div`
  flex-grow: 1;
  height: fit-content;
  align-self: end;

  color: #747474;
  font-weight: 400;
  letter-spacing: -0.04em;
`;
const MasterTopMenuStyle = styled.ul`
  width: fit-content;
  font-weight: 400;
  font-size: 14px;
  color: #747474;
`;
// ] style -------

// ----- view component [
function MasterTopMenu() {
  return (
    <MasterTopMenuStyle>
      <li>
        <a href="/">메인페이지</a>
      </li>
    </MasterTopMenuStyle>
  );
}
function PageName() {
  return (
    <PageNameStyle>
      <Link to="/master">관리자 페이지</Link>
    </PageNameStyle>
  );
}
// ----- ] view component

const MasterHeader = () => {
  return (
    <div>
      <MasterHeaderWrapStyle className="MasterHeaderWrap">
        <StyledLogo />
        <PageName />
        <MasterTopMenu />
      </MasterHeaderWrapStyle>
    </div>
  );
};

export default MasterHeader;
