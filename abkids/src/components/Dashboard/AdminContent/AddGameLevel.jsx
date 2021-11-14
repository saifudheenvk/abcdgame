import React, { useState } from "react";
import styled from "styled-components";
import cancel from "../../../assets/cancel.svg";
import { CrossIcon } from "../AddKid";
import { Input, Form, Button, Upload, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { UploadOutlined } from "@ant-design/icons";
import GameActions from "../../../actions/Games/GameActions";
import { useParams } from "react-router-dom";

export const Container = styled.div`
  background: #fff;
  border-radius: 25px;
  padding: 30px;
`;

const InputBox = styled(Input)`
  background: #efefef;
  border-radius: 14px;
  padding: 9px;
  ::placeholder {
    color: #737373;
  }
`;

export const ModalContainer = styled(Modal)`
  background: transparent;
  width: 50% !important;
  & .ant-modal-body {
    background: transparent;
  }
  & .ant-modal-content {
    box-shadow: none;
    background: transparent;
  }
`;

const Title = styled.p`
  font-family: Comfortaa;
  font-style: normal;
  text-align: center;
  font-size: 32px;
`;

const AddButton = styled(Button)`
  font-weight: bold;
  position: absolute;
  right: 0;
`;

const AddGameLevel = ({
  showModal,
  setShowModal,
  gameValues,
  nextLevel,
  fetchGameData,
}) => {
  const [form] = Form.useForm();
  const { gameId } = useParams();
  const [uploadedFields, setUploadedFields] = useState([]);

  const onFinish = (values) => {
    let gameValues = { ...values };
    if (values.image) {
      gameValues = { ...values, image: values.image.file };
    }
    const payload = { gameValues, gameId, level: nextLevel };
    GameActions.addGameData(payload)
      .then((response) => {
        if (response.data.data) {
          message.success("Added Game level");
          fetchGameData();
          setShowModal(false);
          setUploadedFields([]);
          form.resetFields();
        } else {
          message.error("Couldn't add new level");
        }
      })
      .catch((error) => {
        message.error("Couldn't add new level");
      });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e[0];
    }
    return e && e.fileList[0];
  };

  const beforeUpload = (file, fileList) => {
    return false;
  };

  return (
    <ModalContainer
      visible={showModal}
      onCancel={() => {
        setShowModal(false);
        setUploadedFields([]);
        form.resetFields();
      }}
      footer={null}
      closeIcon={<CrossIcon src={cancel} />}
    >
      <Container gutter={32}>
        <Title>Add New Level</Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {gameValues &&
            gameValues
              .filter((gameValue) => gameValue.fieldType !== "image")
              .map((gameValue) => (
                <Form.Item
                  label={
                    gameValue.fieldName.charAt(0).toUpperCase() +
                    gameValue.fieldName
                      .substring(1)
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                  }
                  name={gameValue.fieldName}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${gameValue.fieldName}`,
                    },
                  ]}
                >
                  <InputBox
                    placeholder={gameValue.fieldName}
                    type={gameValue.fieldType.toLowerCase()}
                  />
                </Form.Item>
              ))}
          {gameValues &&
            gameValues
              .filter((gameValue) => gameValue.fieldType === "image")
              .map((gameValue) => (
                <Form.Item
                  key={gameValue.fieldName}
                  label={
                    gameValue.fieldName.charAt(0).toUpperCase() +
                    gameValue.fieldName
                      .substring(1)
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                  }
                  name={gameValue.fieldName}
                  valuePropName="file"
                  required
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    disabled={uploadedFields.includes(gameValue.fieldName)}
                    name="file"
                    onChange={(info) => {
                      setUploadedFields((prev) => [
                        ...prev,
                        gameValue.fieldName,
                      ]);
                      console.log(info.file);
                    }}
                    accept="image/*"
                    multiple={false}
                  >
                    <Button
                      style={{
                        cursor: uploadedFields.includes(gameValue.fieldName)
                          ? "not-allowed"
                          : "",
                      }}
                      icon={<UploadOutlined />}
                    >
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              ))}
          <Form.Item>
            <AddButton type="primary" htmlType="submit">
              Add
            </AddButton>
          </Form.Item>
        </Form>
      </Container>
    </ModalContainer>
  );
};

export default AddGameLevel;
