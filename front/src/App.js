import React, { Component } from 'react';
import './index.css';
import './App.css';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import Login from './components/Login';
import  LandingPage from './components/landingPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';


class App extends Component {
    
  render() {
    return (
      <Provider store={store}>
     <Router>
      <div>
        <Route exact path="/" component={LandingPage}/>
      <Route path="/CreateNote" component={CreateNote}/>
     
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
 