import React from "react";
import styled from "styled-components";

import defaultImage from "../../assets/child.svg";

const CardContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-size: ${(props) => (props.isPlus ? "50% 50%" : "80% 70%")};
  background-repeat: no-repeat;
  background-position: center;
  height: 150px;
  border-radius: 20px;
  background-color: #fff;
  padding: 0% 0% 0% 36%;
  @media (min-width: 1000px) {
    height: 140px;
  }
  @media (min-width: 1600px) {
    height: 179px;
  }
`;

const Badge = styled.p`
  margin-bottom: 0px;
  text-align: center;
  border-radius: 13px;
  padding: 4px;
`;

const ChildCard = ({ image, isPlus, onClickChild, childId,item }) => {
  return (
    <CardContainer
      onClick={() => {
        if (onClickChild) {
          if (!isPlus) {
            onClickChild(childId);
          } else {
            onClickChild(true);
          }
        }
      }}
      isPlus={isPlus}
      image={image ? image : defaultImage}
    >
      {!isPlus && (
        <Badge style={{ backgroundColor: "#FFBB0B", color: "#932300" }}>
          LEVEL <span style={{ fontWeight: "bold" }}>{item && item.level && item.level}</span>
        </Badge>
      )}
    </CardContainer>
  );
};

export default ChildCard;
