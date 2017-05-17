import * as redux from 'redux';
import thunk from 'redux-thunk';

import {optionsReducer, pollsReducer, authReducer, completedReducer, votesReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		options: optionsReducer,
		polls: pollsReducer,
		auth: authReducer,
		completed: completedReducer,
		vote: votesReducer
		
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f

		));

	return store;
}