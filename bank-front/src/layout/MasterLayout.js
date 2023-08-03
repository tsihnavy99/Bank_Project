import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MasterHeader from "../components/MasterHeader";
import MasterLnb from "../components/MasterLnb";
const LayoutWrap = styled.div`
  padding: 50px;
`;
const Contents = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
`;
const OutletStyle = styled.div`
  padding: 0 50px;
  flex-grow: 1;
`;
const MasterLnbWrap = styled(MasterLnb)`
    max-width: fit-content;
    height: 100%;
    border: 1px solid #000000
`;
function OutletWrap() {
  return (
    <OutletStyle>
      <Outlet />
    </OutletStyle>
  );
}

const MasterLayout = () => {
  return (
    <div>
      <LayoutWrap>
        <MasterHeader />
        <Contents>
          <MasterLnbWrap />
          <OutletWrap />
        </Contents>
      </LayoutWrap>
    </div>
  );
};

export default MasterLayout;
