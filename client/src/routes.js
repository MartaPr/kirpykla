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
import AddGalleryItem from './components/User/Admin/AddGalleryItem';
import GalleryPage from './components/Home/GalleryPage';
import EditProductForm from './components/User/Admin/EditProductForm';
import ContactInfo from './components/User/Admin/ContactInfo';
import AddSliderItem from './components/User/Admin/AddSliderItem';

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
          path="/admin/pagrindinis-puslapis"
          exact
          component={Auth(AddSliderItem, true)}
        />
        <Route
          path="/admin/paslaugos"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/paslaugos/redaguoti-paslauga/:id"
          exact
          component={Auth(EditProductForm, true)}
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
          path="/admin/kontaktai"
          exact
          component={Auth(ContactInfo, true)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
