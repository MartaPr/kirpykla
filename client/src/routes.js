import React from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Layout from './Hoc/Layout';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import Userdashboard from './components/User';
import Auth from './Hoc/Auth';
import AddProduct from './components/User/Admin/AddProducts';
import PriceList from './components/Home/PriceList';
// import Calendar from './components/User/Admin/Calendar'
import AddGalleryItem from './components/User/Admin/AddGalleryItem';
import GalleryPage from './components/Home/GalleryPage';
import EditProductForm from './components/User/Admin/EditProductForm';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/vartotojas/informacija"
          exact
          component={Auth(Userdashboard, true)}
        />
        <Route
          path="/admin/paslaugos"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/sukurti-galerija"
          exact
          component={Auth(AddGalleryItem, true)}
        />

        <Route path="/registruotis" exact component={Auth(Register, false)} />
        <Route
          path="/prisijungti"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/kainynas" exact component={Auth(PriceList, null)} />
        <Route
          path="/darbu-galerija"
          exact
          component={Auth(GalleryPage, null)}
        />
        <Route
          path="/admin/paslaugos/redaguoti-paslauga/:id"
          exact
          component={Auth(EditProductForm, true)}
        />

        {/* <Route path="/kalendorius" exact component={Auth(Calendar,null)}/> */}
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
