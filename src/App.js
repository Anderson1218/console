import React from 'react';
import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import Home from './components/TestComponents/Home'
import Counter from './components/TestComponents/Counter'

//This project use css modules 
function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/counter" exact component={Counter}/>
          </Switch>
        </Layout> 
    </div>
  );
}

export default App;
