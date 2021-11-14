import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  .ant-upload-select-picture {
    width: 100% !important;
  }
  .ant-dropdown-menu{
    background: #ffffff !important;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    height: 46px;
    padding: 7px 11px;
    border-radius: 14px;
}
.ant-upload-list{
  display:none;
}
`;

export default GlobalStyles;
