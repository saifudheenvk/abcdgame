import { Menu } from "antd";
import { setUserDetails } from "../../redux/actions/users";

export const getMenuItem = (history, dispatch) => {
  if (!localStorage.getItem("userCredentials")) {
    return (
      <>
        <Menu.Item
          onClick={() => {
            history.push(`/login/admin`);
          }}
        >
          Admin Login
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push(`/login/parent`);
          }}
        >
          User Login
        </Menu.Item>
      </>
    );
  } else
    return (
      <>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            dispatch(setUserDetails({}));
            history.push(`/home`);
          }}
        >
          Logout
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push(`/dashboard`);
          }}
        >
          Dashboard
        </Menu.Item>
      </>
    );
};
