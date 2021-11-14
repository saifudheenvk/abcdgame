import React, { useRef } from "react";
import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";
import { avatar } from "../../utils/Avatars";
import { Row, Col, Form, Input, Button, Select, Carousel, message } from "antd";
import cancel from "../../assets/cancel.svg";
import defaultImage from "../../assets/profile.svg";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import ChildActions from "../../actions/Child/ChildActions";
const { Option } = Select;

const ModalContainer = styled(Modal)`
  background: transparent;
  width: 60% !important;
  & .ant-modal-body {
    background: transparent;
  }
  & .ant-modal-content {
    box-shadow: none;
    background: transparent;
  }
`;
const Container = styled(Row)`
  background: #fff;
  border-radius: 25px;
  padding: 40px 50px 50px 0px;
`;

const Title = styled.p`
  font-family: Comfortaa;
  font-style: normal;
  font-size: 32px;
`;

const InputBox = styled(Input)`
  background: #efefef;
  border-radius: 14px;
  padding: 12px;
  ::placeholder {
    color: #737373;
  }
`;

const SelectBox = styled(Select)`
  ::placeholder {
    color: #737373;
  }
`;

const CardContainer = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #a7c0ff;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled(Button)`
  background: #825cef;
  width: 100%;
  height: 45px;
  border-radius: 15px;
`;

export const CrossIcon = styled.img`
  width: 50px;
  height: 50px;
`;
const CarouselControlPrev = styled.p`
left: 2rem;
top: 5rem;
position: absolute;
}
`;
const CarouselControlNext = styled.p`
right: 2rem;
top: 5rem;
position: absolute;
}
`;
const CancelButton = styled(Button)`
  background: #ffff;
  width: 100%;
  height: 45px;
  border-radius: 15px;
  color: #825cef;
  &: hover {
    background: #ffff;
    border: 2px solid #825cef;
    color: #825cef;
  }
`;

const CarouselStyle = styled.div`
  display: flex !important;
  justify-content: center;
  height: 170px;
`;
const Carouselimg = styled.img`
  width: 6rem !important;
`;
const CarouselContainer = styled.div`
  position: relative;
`;
const AddKid = ({ id, showModal, setShowModal, getChildren }) => {
  const [form] = Form.useForm();
  const [carouselShow, setCarouselShow] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(defaultImage);

  const onFinish = (values) => {
    ChildActions.addChild(values)
      .then((response) => {
        if (response.data.data) {
          setShowModal(false);
          form.resetFields();
          setProfilePic(defaultImage);
          getChildren();
        }
      })
      .catch((error) => {
        message.error(error.response.data.data.message);
      });
  };
  const onCancel = () => {
    setShowModal(false);
    form.resetFields();
  };
  const displayPicHanlder = (value) => {
    setCarouselShow(!carouselShow);
  };

  const handleProfilePicChange = (e, imageIndex) => {
    setProfilePic(e.target.currentSrc);
    form.setFieldsValue({ image: imageIndex.toString() });
  };
  const carouselRef = useRef();
  return (
    <ModalContainer
      visible={showModal}
      footer={null}
      onCancel={onCancel}
      closeIcon={<CrossIcon src={cancel} />}
    >
      <Form form={form} onFinish={onFinish}>
        <Container gutter={32}>
          <Col span={9}>
            <Form.Item name="image">
              <CardContainer onClick={displayPicHanlder}>
                <Carouselimg src={profilePic} />
                <p>Choose Avatar</p>
              </CardContainer>
            </Form.Item>
            {carouselShow ? (
              <CarouselContainer>
                <Carousel dotPosition="bottom" ref={carouselRef}>
                  {avatar.map((image, index) => (
                    <CarouselStyle>
                      <Carouselimg
                        onClick={(e) => handleProfilePicChange(e, index)}
                        src={image}
                      ></Carouselimg>
                    </CarouselStyle>
                  ))}
                </Carousel>
                <CarouselControlPrev
                  style={{ cursor: "pointer" }}
                  onClick={() => carouselRef.current.prev()}
                >
                  <LeftCircleOutlined />
                </CarouselControlPrev>

                <CarouselControlNext
                  style={{ cursor: "pointer" }}
                  onClick={() => carouselRef.current.next()}
                >
                  <RightCircleOutlined />
                </CarouselControlNext>
              </CarouselContainer>
            ) : (
              ""
            )}
          </Col>
          <Col span={15} style={{ borderLeft: "1px solid #E7E7E7" }}>
            <Title>Add your kid!</Title>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input child name" }]}
            >
              <InputBox type="text" placeholder="Name" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="age"
                  rules={[{ required: true, message: "Please input Age" }]}
                >
                  <InputBox type="number" placeholder="Age" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="grade"
                  rules={[{ required: true, message: "Please select Grade" }]}
                >
                  <SelectBox
                    dropdownStyle={{ backgroundColor: "#efefef" }}
                    placeholder="Select grade"
                  >
                    <Option value="prekg">Pre KG</Option>
                    <Option value="kg">KG</Option>
                    <Option value="1st">First</Option>
                    <Option value="2nd">Second</Option>
                  </SelectBox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item>
                  <CancelButton onClick={onCancel}>Cancel</CancelButton>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item>
                  <SaveButton type="primary" htmlType="submit">
                    Save
                  </SaveButton>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Container>{" "}
      </Form>
    </ModalContainer>
  );
};

export default AddKid;
