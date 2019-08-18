import React from 'react';
import './App.css';
//import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component'


//This project use css modules 
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/shop" component={ShopPage}/>
        <Route path="/signin" component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );
}

export default App;
