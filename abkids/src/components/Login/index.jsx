import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, message } from "antd";
import LoginForm from "./LoginForm";
import { useHistory, useParams, Link } from "react-router-dom";
import ApiCalls from "../../actions/Login/LoginActions";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/actions/users";

const Container = styled(Card)`
  border-radius: 25px;

  //remove after confirmation
  flex: 1;
`;

const Highlighted = styled.span`
  color: #ffff;
  font-weight: bold;
`;

const Title = styled.p`
  font-weight: bold;
  font-family: Comfortaa;
  color: #fff;
  margin-bottom: 30px;
  font-size: 36px;
`;

//remove after confirmation
const Mock = styled.div`
  margin: 100px;
  display: flex;
`;
//remove after confirmation
const Extra = styled.div`
  flex: 1;
`;

const RoutingText = styled.p`
  color: #fff;
  text-align: center;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userType } = useParams();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    setLoading(true);
    const payload = { ...values, role: userType };
    if (window.location.href.includes("login"))
      ApiCalls.authenticateUser(payload)
        .then((response) => {
          console.log(response.data);
          if (response.data && response.data.data) {
            localStorage.setItem("userCredentials", response.data.data.token);
            dispatch(setUserDetails(response.data.data.user));
            history.push("/dashboard");
          } else {
            message.error("Couldn't login");
          }
        })
        .catch((error) => {
          message.error(error.response.data.data.message);
        });
    else
      ApiCalls.createNewUser(payload)
        .then((response) => {
          if (response.data.data) {
            localStorage.setItem("userCredentials", response.data.data.token);
            dispatch(setUserDetails(response.data.data.user));
            history.push("/dashboard");
          } else {
            message.error("Couldn't Sign in");
          }
        })
        .catch((error) => {
          message.error(error.response.data.data.message);
        });
    setLoading(false);
  };

  const onFinishFailed = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    if (localStorage.getItem("userCredentials")) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <Mock>
      <Extra />
      <Container>
        <Title>
          Sign {window.location.href.includes("login") ? "In" : "Up"}
        </Title>
        <LoginForm
          loading={loading}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
        />
        {window.location.href.includes("login") ? (
          <RoutingText>
            Not a member yet?{" "}
            <Link to={`/signup/${userType}`}>
              <Highlighted>Sign Up</Highlighted>
            </Link>
          </RoutingText>
        ) : (
          <RoutingText>
            Already a member?{" "}
            <Link to={`/login/${userType}`}>
              <Highlighted>Sign in</Highlighted>
            </Link>
          </RoutingText>
        )}
      </Container>
      <Extra />
    </Mock>
  );
};

export default Login;
