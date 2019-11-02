import React from "react";
import UserLayout from "../../Hoc/User";
import MyButton from '../utils/Button'

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <div className="user-info-panel">
        <div className="user-info">
         <span>{ user.userdata.email }</span>
        </div>
        <MyButton
          type="default"
          title="Keisti"
          linkTo="/user/user_profile"
        />
      </div>
      <div className="user-info-panel">
        <h1>Apsilankymų istorija</h1>
        <div className="user-product-block-wrapper">istorija</div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
