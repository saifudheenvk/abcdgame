import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import SidebarItem from "./SidebarItem";
import DashboardItems from "./DashboardItems";
import { useHistory, useParams } from "react-router-dom";
import rewards from '../../assets/rewards.svg';

const POINTS = 10;

const DashboardPageLayout = styled(Row)`
  margin-top: 28px;
  height: auto;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  && {
    min-height: calc(100vh - 280px);
  }
`;

const DashboardContent = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarContainer = styled(Col)`
display: flex;
flex-direction: column;
// justify-content: center;
align-items: center;
`;

const Rewards = styled.img`
height:220px;
width:100%;
@media (min-width: 1000px) {
  height: 180px;
}
@media (min-width: 1600px) {
  height: 220px;
}
`;

const RewardsContainer = styled(Row)`
margin-top:auto;
position:relative;
// margin-bottom:-13%;
// margin-top:38%;
`;

const RewardPoints = styled.div`
// height:50%;
height:50px;
width:50px;
border-radius:50%;
background: #00DFF3;
color: white;
display: flex;
justify-content: center;
align-items: center;
font-size: 25px;
position: absolute;
top: 29%;
left: 54%;
`;



const Dashboard = ({ content, correntItem, ...props }) => {
  const [dashboardItems, setdashboardItems] = useState([]);
  const [rewardPoints, setRewardPoints] = useState();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const userType = history.location.pathname.split("/")[2];
    setdashboardItems(DashboardItems(params)[userType]);
  }, []);
  const onClickItem = (content) => {
    const dashboardItem = dashboardItems.find((item) => item.title === content);
    if (dashboardItem) {
      history.push(dashboardItem.path);
    }
  };
  const setRewards = (points) => {
    setRewardPoints(points);
  }
  return (
    <DashboardPageLayout>
      <SidebarContainer span={5}>
        <Row>
          {dashboardItems.map((item) => (
            <SidebarItem
              onClickItem={onClickItem}
              content={item.title}
              isActive={item.title === correntItem}
            />
          ))}
        </Row>
        <RewardsContainer>
          {history.location.pathname.split("/")[2] === "kids" ?
            <>
              <Rewards src={rewards} />
              <RewardPoints>{rewardPoints && rewardPoints}</RewardPoints>
            </>
            : <></>}
        </RewardsContainer>
      </SidebarContainer>
      <Col span={1} />
      {!props.isParent ?
        <DashboardContent span={18}>{content && React.cloneElement(content, { setRewards: setRewards })}</DashboardContent>
        :
        <DashboardContent span={18}>{content && content}</DashboardContent>
      }
    </DashboardPageLayout>
  );
};

export default Dashboard;
