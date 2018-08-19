import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Landing from './components/Layout/Landing'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import checkAuthToken from './utils/checkAuthToken';

import './App.css';

checkAuthToken(store)
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div className="App">
                <Navbar />
                <Route exact path = "/" component = {Landing} />
                <div className="container">
                  <Route exact path = "/register" component = {Register} />
                  <Route exact path = "/login" component = {Login} />
                </div>
                <Footer />
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
