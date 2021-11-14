import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: ${(props) => (props.isActive ? "#FFFF" : "#002FA8")};
  width: 100%;
  font-family: Comfortaa;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  padding: 10px;
  height: 60px;
  margin-bottom: 10px;
  background: linear-gradient(
    315deg,
    transparent 10px,
    ${(props) => (props.isActive ? "#9D6DEB" : "#FFFFFF")} 10px
  );
`;

const SidebarItem = ({ content, isActive, onClickItem }) => {
  return (
    <Container
      onClick={() => {
        onClickItem(content);
      }}
      isActive={isActive}
    >
      {content}
    </Container>
  );
};

export default SidebarItem;
