import React from 'react'
import { Row, Col } from "antd";
import styled from "styled-components";
import MapSidebar from "./MapSidebar"
import MapContent from "./MapContent"

const MapDashboardPageLayout = styled(Row)`
  margin-top: 28px;
  height: calc(100% - 96px);
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
//   && {
//     min-height: calc(100vh - 280px);
//   }
`;

const MapDashboardContent = styled(Col)`
  //   margin-left: 55px;
  display:flex;
  flex-direction:column;
  // justify-content: flex-start;
  // gap:200px;
`;

function Map() {
  return (
    <MapDashboardPageLayout>
      <Col span={2}>
        <MapSidebar />
      </Col>
      <Col span={1} />
      <MapDashboardContent span={21}>
        <MapContent />
      </MapDashboardContent>
    </MapDashboardPageLayout>

  )
}

export default Map
