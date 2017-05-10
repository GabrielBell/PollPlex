var moment = require('moment');

export var profileReducer = (state= {}, action) => {
	switch(action.type){
		case 'SET_NAME':
			return {
				name: action.name
			};
		case 'CLEAR_NAME':
			return {};
		default:
			return state;
	}
}

export var authReducer = (state = {}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				uid: action.uid,
			};
		case 'LOGOUT':
			return {};

		default:
			return state;
	}
}

export var optionsReducer = (state = [], action) => {
	switch(action.type){
		case 'ADD_OPTIONS':
			return [
				...state,
				...action.options
			];
		case 'ADD_OPTION':
			
			return [
				...state,
				action.option
			]
		case 'UPDATE_OPTION':
			return state.map((option) => {
				if(option.id === action.id){
					return Object.assign({}, option, {
						text: action.text
					});
				}
				return option;
				
				
			})
		default:
			return state;
	}
};


export var pollsReducer = (state = [], action) => {
	switch(action.type){
		case 'ADD_POLL':
			return [
				...state,
				action.poll
			];
		default:
			return state;
	}
};