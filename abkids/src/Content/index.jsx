import React, { useEffect } from "react";
import styled from "styled-components";
import Layout, { Content as AntdContent } from "antd/lib/layout/layout";
import Header from "../components/Header";
import img from "../assets/background.svg";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedPaths from "./ProtectedPaths";
import UserActions from "../actions/Users/UserActions";
import { setUserDetails } from "../redux/actions/users";

const ContainerLayout = styled(Layout)`
  && {
    height: 100vh;
  }
  background-image: url(${(props) => props.url});
  & ::-webkit-scrollbar {
    background-color: #ffff;
    width: 6px;
    height: 6px;
    -webkit-border-radius: 1ex;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: #9d6deb;
    -webkit-border-radius: 1ex;
  }
`;

const Container = styled(AntdContent)`
  padding: 15px 18px;
  min-height: 280px;
  overflow-y: auto;
`;

const Content = () => {
  const user = useSelector((state) => state.userReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const getUser = () => {
    UserActions.getUserDetails().then((response) => {
      if (response.data) {
        console.log(response.data.data);
        dispatch(setUserDetails(response.data.data));
      }
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("userCredentials")) {
      history.push("/home");
    }
    getUser();
  }, []);
  return (
    <ContainerLayout url={img}>
      <Header />
      <Container>
        <Route
          exact
          path="/home"
          component={() => <div style={{ color: "#FFF" }}>Home</div>}
        />

        {ProtectedPaths.map(
          (item) => (
            <Route
              exact
              path={item.url}
              render={() => item.role === user.role && item.component}
            />
          )
        )}
        {user && user.role && (
          <Route
            path="/dashboard"
            exact
            render={() => <Redirect to={`/dashboard/${user.role}`} />}
          />
        )}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </Container>
    </ContainerLayout>
  );
};

export default Content;
