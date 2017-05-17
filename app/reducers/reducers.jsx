

export var authReducer = (state = {}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				uid: action.uid,
				name: action.name
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
		case 'SET_POLLS':
			return [
				
				...action.polls
			]
		case 'LOGOUT':
			return [];
		default:
			return state;
	}
};

export var votesReducer = (state = {}, action) => {
	switch(action.type){
		case 'FETCH_VOTE':
			return {
				question: action.vote,
				answer: -1,
				finished: false
			};
		case 'INCREMENT_VOTE':
			return {
				answer: action.id,
				finished: true,
				question: {
					...state.question,
					options: action.update
				}
			}
		case 'UPDATE_VOTE_OPTION':
			return {
				...state,
				answer: action.id
			}	
			
		default:
			return state;
	}
};

export var completedReducer = (state = {navState: 'new', id: -1, uid: -1}, action) => {
	switch(action.type){
		case 'TOGGLE_COMPLETED':
			return {
				navState: action.nav,
				id: action.id,
				uid: action.uid
			}
		default:
			return state;
	}
};