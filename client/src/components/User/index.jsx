import React from 'react';
import UserLayout from '../../Hoc/User';
import MyButton from '../utils/Button';

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <div className="user-info-panel">
        <h2 className="email-heading">El. pašto adresas:</h2>
        <div className="user-info-panel user-info-panel__user-email">
          {user.userdata.email}
        </div>
        <MyButton type="default" title="Keisti" linkTo="/user/user_profile" />
      </div>
      <div className="user-info-panel">
        <h2>Apsilankymų istorija</h2>
        <div className="user-product-block-wrapper">istorija</div>
        {/* TODO: listas */}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
