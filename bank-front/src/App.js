import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Security from "./pages/Security";
import Donut from "./components/Donut";
import DSecurity from "./pages/DSecurity";
import AfterLogin from "./pages/AfterLogin";
import Login from "./pages/Login";
import Goods from "./pages/Goods";
import AccountList from "./pages/AccountList";
import TransactionDetail from "./pages/TransactionDetail";
import AccountAutoList from "./pages/AccountAutoList";
import AccountAutoAdd from "./pages/AccountAutoAdd";
import AccountAutoUpdate from "./pages/AccountAutoUpdate";
import AccountMyway from "./pages/AccountMyway";
import AccountTransfer from "./pages/AccountTransfer";
import BeforeLogin from "./pages/BeforeLogin";
import AccountInsert from "./pages/AccountInsert";
import MasterIndex from "./pages/master/MasterIndex";
import MainLayout from "./layout/MainLayout";
import MasterLayout from "./layout/MasterLayout";
import GlobalStyle from "./styleComponent/GlobalStyle";
import RouteChangeTracker from "./components/RouteChangeTracker";

function App() {
  RouteChangeTracker();
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/donut" element={<Donut />}></Route>
          <Route path="/" element={<AfterLogin />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/security" element={<Security />}></Route>
          <Route path="/dsecurity" element={<DSecurity />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/goods" element={<Goods />}></Route>
          <Route path="/accountList" element={<AccountList />}/>
          <Route path="/transactionDetail" element={<TransactionDetail/>}/>
          <Route path="/accountAutoList" element={<AccountAutoList />}></Route>
          <Route path="/accountAutoAdd" element={<AccountAutoAdd />}></Route>
          <Route
            path="/accountAutoUpdate"
            element={<AccountAutoUpdate />}
          ></Route>
          <Route path="/accountMyway" element={<AccountMyway />}></Route>
          <Route path="/accountTransfer" element={<AccountTransfer/>}/>
          <Route path="/before" element={<BeforeLogin />}></Route>
          <Route path="/accountInsert" element={<AccountInsert />}></Route>
        </Route>
        <Route element={<MasterLayout />}>
          <Route path="/master" element={<MasterIndex />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
