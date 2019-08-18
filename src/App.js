import React from 'react';
import './App.css';
//import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
// import Counter from './containers/TestComponents/Counter'


//This project use css modules 
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/shop" component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
