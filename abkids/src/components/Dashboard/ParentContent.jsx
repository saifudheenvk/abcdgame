import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ChildCard from "./ChildCard";
import addChild from "../../assets/addchild.svg";
import AddKid from "./AddKid";
import { useSelector } from "react-redux";
import ChildActions from "../../actions/Child/ChildActions";
import { message, Col, Row } from "antd";
import { avatar } from "../../utils/Avatars";

const StyledCol = styled(Col)`
  //   margin-bottom: 32px;
`;

const ParentContent = () => {
  const user = useSelector((state) => state.userReducer);
  const history = useHistory();
  const [children, setChildren] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getChildren = () => {
    //integrate api to get children
    ChildActions.getChildren()
      .then((response) => {
        console.log("Response?? : ", response.data, response.data.data);
        if (response.data && response.data.data) {
          console.log("Childs : ", response.data.data);
          setChildren(response.data.data);
        } else {
          message.error("Couldn't fetch child data");
        }
      })
      .catch(() => {
        message.error("Unable to fetch child data");
      });
  };

  useEffect(() => {
    getChildren();
  }, []);

  const onClickChild = (childId) => {
    history.push(`/dashboard/kids/${childId}`);
  };
  return (
    <Row gutter={[32, 16]}>
      <AddKid
        showModal={showModal}
        setShowModal={setShowModal}
        id={user._id}
        getChildren={getChildren}
      />

      {children &&
        children.map((child) => (
          <StyledCol xl={4} lg={5} xxl={4} sm={12} xs={12} md={6}>
            <ChildCard
              image={child.image && avatar[child.image]}
              onClickChild={onClickChild}
              childId={child._id}
              isPlus={false}
              item={child}
            />
          </StyledCol>
        ))}

      <StyledCol xl={4} lg={5} xxl={4} sm={12} xs={12} md={6}>
        <ChildCard onClickChild={setShowModal} image={addChild} isPlus={true} />
      </StyledCol>
    </Row>
  );
};

export default ParentContent;
