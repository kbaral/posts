import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/layout';
import { Home } from './components/home';
import { Loginscreen } from './components/loginScreen';
import { Register } from "./components/register";
import { PostDetails } from "./components/postDetails";
import './components/Home.css'
import './custom.css'
import Admin from './components/admin';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
      <Switch>        
          <Route exact path='/' component={Home} />          
          
          <Route path='/login' component={Loginscreen} />
          <Route path='/register' component={Register} />
          <Route path='/admin/manageposts' component={Admin}/>
          <Route path='/postdetails/:Id' component={PostDetails}/>
          <Route path='*' component={Home} />
       
      </Switch>
       </Layout>
     
    );
}
}
