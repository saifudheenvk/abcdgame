import React from "react";
import styled from "styled-components";
import { Header as AntdHeader } from "antd/lib/layout/layout";
import { Row, Col, Dropdown, Menu } from "antd";
import Logo from "../../assets/Logo.svg";
import User from "../../assets/user.svg";
import { useHistory } from "react-router-dom";
import { getMenuItem } from "./headerFunctions";
import { useDispatch } from "react-redux";

const Container = styled(AntdHeader)`
  width: 100%;
  display: flex !important;
  align-items: center !important;
  flex-direction: column;
  padding: 0px 10px;
  background: #ffffff !important;
  &.ant-layout-header {
    height: auto;
  }
`;

const HeaderContainer = styled(Row)`
  width: 100%;
  height: 55px;
  &.ant-row {
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 55px;
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 200px;
  cursor: pointer;
`;

const NavbarLogo = styled.img`
  height: 43px;
  margin: auto;
`;
const UserLogo = styled.img`
  height: 43px;
  margin: auto;
  margin-right: 20%;
`;

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const menu = <Menu>{getMenuItem(history,dispatch)}</Menu>;

  return (
    <Container>
      <HeaderContainer>
        <Col span={4}>
          <LogoContainer
            onClick={() => {
              history.push("/");
            }}
          >
            <NavbarLogo src={Logo} />
          </LogoContainer>
        </Col>
        <Col span={17}></Col>
        <Col span={3}>
          <LogoContainer>
            <Dropdown overlay={menu} overlayStyle={{ backgroundColor: "#fff" }}>
              <UserLogo src={User} />
            </Dropdown>
          </LogoContainer>
        </Col>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
