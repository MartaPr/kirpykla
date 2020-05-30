import React from 'react';
import Home from './components/SiteView/Home';
import { Switch, Route } from 'react-router-dom';
import Layout from './Hoc/Layout';
import RegisterLogin from './components/Login';
import Register from './components/Login/Register';
// import Userdashboard from './components/User';
import Auth from './Hoc/Auth';
import AddProduct from './components/User/Admin/Products/AddProducts';
import PriceList from './components/SiteView/PriceList';
import AddGalleryItem from './components/User/Admin/Gallery/AddGalleryItem';
import GalleryPage from './components/SiteView/GalleryPage';
import EditProductForm from './components/User/Admin/Products/EditProductForm';
import ContactInfo from './components/User/Admin/Contacts/ContactInfo';
import AddSliderItem from './components/User/Admin/Slider/AddSliderItem';
import ContactsPage from './components/SiteView/ContactsPage';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        {/* <Route
          path="/admin/informacija"
          exact
          component={Auth(Userdashboard, true)}
        /> */}
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
        <Route
          path="/admin/kontaktai"
          exact
          component={Auth(ContactInfo, true)}
        />
        <Route path="/registruotis" exact component={Auth(Register, false)} />
        <Route path="/admin" exact component={Auth(RegisterLogin, false)} />
        <Route path="/kainynas" exact component={Auth(PriceList, null)} />
        <Route
          path="/darbu-galerija"
          exact
          component={Auth(GalleryPage, null)}
        />
        <Route path="/kontaktai" exact component={Auth(ContactsPage, null)} />

        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
