var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider} = require('react-redux');

var actions = require('actions');
const store = require('configureStore').configure();

import Main from 'Main';
import PollApp from 'PollApp';
import Login from 'Login';
import SignUp from 'SignUp';
import firebase from 'app/firebase/'
import PollVote from 'PollVote';

store.dispatch(actions.resetOptions());
// Load foundation
$(document).foundation();

firebase.auth().onAuthStateChanged((user) => {
	if(user != null) {
		
		store.dispatch(actions.startLogin(user.uid));
		store.dispatch(actions.startAddPolls(user.uid));
		hashHistory.push('/');
		
	}else if(user == null) {
		console.log('auth state changed to logged out');
		store.dispatch(actions.logout());
		hashHistory.push('/');
	}
})

// App css
require('style!css!sass!applicationStyles')


ReactDOM.render(

	<Provider store= {store}>
		<Router history={hashHistory}>
		  	<Route path="/" component={Main}>
		  		<Route path="users/:uid/:pollID" component={PollVote}></Route>
		  		<Route path="signup" component={SignUp}/>
		  		<Route path="login" component={Login}/>
		  		<IndexRoute component={PollApp}/>
			</Route>
	  	</Router>
	</Provider>,
  document.getElementById('app'));

