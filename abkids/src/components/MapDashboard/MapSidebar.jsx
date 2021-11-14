import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import backButton from "../../assets/backButton.svg";
import avatar from "../../assets/kid-avatar.svg";
import dummy from "../../assets/dummy.svg";
import { Row, Col } from 'antd'

const SidebarElement = styled(Row)`
  padding-top: 20px;
  justify-content: center;
`;

const MapSidebar = () => {
  const history = useHistory();
  const onClickBackButton = () => {
    console.log("history>>", history);
    history.goBack();
  };

  const SidebarContainer = styled(Col)`
  height: 80vh;
  overflow:auto;
`;

  return (
    <SidebarContainer>
      <SidebarElement>
        <img src={backButton} alt="back-button" onClick={onClickBackButton}></img>
      </SidebarElement>
      <SidebarElement>
        <img src={avatar} alt="avatar"></img>
      </SidebarElement>
      <SidebarElement>
        <img src={dummy} alt="dummy"></img>
      </SidebarElement>
      <SidebarElement>
        <img src={dummy}  alt="dummy"></img>
      </SidebarElement>
      <SidebarElement>
        <img src={dummy}  alt="dummy"></img>
      </SidebarElement>
      <SidebarElement>
        <img src={dummy}  alt="dummy"></img>
      </SidebarElement>
    </SidebarContainer>
  );
};

export default MapSidebar;
