import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Landing from './components/Layout/Landing'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import checkAuthToken from './utils/checkAuthToken'

import Dashboard from './components/dashboard/Dashboard'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import PrivateRoute from './components/common/PrivateRoute'
import './App.css'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

checkAuthToken(store)
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-experience" component={AddExperience} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-education" component={AddEducation} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
