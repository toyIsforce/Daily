import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Works from './Works.jsx';
import EditArea from './EditArea.jsx';

const initialState = {
	works: [],
	edited: undefined
}

const reducer = function (state = initialState, action) {
	switch (action.type) {
		case 'EDIT_TIME':
			return {
				works: state.works,
				edited: action.edited,
				index: action.index
			};
		case 'SAVE_TIME':
			if (action.index > -1) {
				state.works[action.index] = action.edited;
			} else {
				state.works.push(action.edited);
			}
			return {
				works: state.works,
				edited: undefined
			};
		case 'CHANGE_TIME':
			return {
				works: state.works,
				edited: action.edited,
				index: state.index
			};
		case 'REMOVE_TIME':
			let tmp = state.works.slice(0);
			tmp.splice(action.index, 1);
			return {
				works: tmp,
				edited: undefined
			};
		default:
			return state;
	}
};
const store = createStore(reducer);

const Root = () => {
	return (
	<div className="container">
		<Works />
 		<EditArea />
	</div>
	)
}

render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
);
