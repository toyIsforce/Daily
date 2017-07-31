import React from 'react';
import { connect } from 'react-redux';

let Works = ({ works, edited, edit, add, remove }) => {
	let workList = [];
	works.map((work, index) => {
		workList.push(
			<li key={index.toString()}>
				<span className="start-time">{work.start}</span>
				<span>～</span>
				<span className="end-time">{work.end}</span>
				<span>休憩</span>
				<span className="rest-time">{work.rest}</span>
				<input className="time-edit" type="button" onClick={() => edit(index, work)} value="変更" />
				<input className="time-remove" type="button" onClick={() => remove(index)} value="削除" />
			</li>
		);
	});
	return (
		<div id="workList">
			<ol>{workList}</ol>
			<input type="button" value="追加" onClick={() => add()} />
		</div>
	);
};

export default connect(
	state => {
		return {
			works: state.works,
			edited: state.edited
		};
	},
	dispatch => {
		return {
			edit: (index, work) => {
				dispatch({
					type: 'EDIT_TIME',
					edited: work,
					index: index
				});
			},
			add: () => {
				dispatch({
					type: 'EDIT_TIME',
					edited: {
						start: "",
						end: "",
						rest: ""
					},
					index: -1
				});
			},
			remove: (index) => {
				dispatch({
					type: 'REMOVE_TIME',
					index: index
				});
			}
		};
	}
)(Works);