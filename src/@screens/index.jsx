import React from "react";
import styled from "styled-components";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TeamMembers from "@screens/TeamMembers";
import SignUp from "@screens/Authentication/SignUp";
import LoginPage from "@screens/Authentication/Login";
import { history } from "@helpers/history";
// import { alertActions } from '../_actions';
import { PrivateRoute } from "@components/PrivateRoute/PrivateRoute";
import HomePage from "./HomePage";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.default.primary};
  z-index: -1;
  display: flex;
  flex-direction: column;
`;

export const AppShell = () => {
  return (
    <Wrapper>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/members" component={TeamMembers} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/signUp" component={SignUp} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Wrapper>
  );
};

export default AppShell;
