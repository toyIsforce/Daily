import React from 'react';
import { connect } from 'react-redux';

let EditArea = ({ edited, index, save, change }) => {
	let startTime, endTime, restTime, btnSave;
	if (edited) {
		startTime = <input name="start" type="text" value={edited.start} onChange={(event) => change({start: event.target.value, end: edited.end, rest: edited.rest})} />;
		endTime = <input name="end" type="text" value={edited.end} onChange={(event) => change({start: edited.start, end: event.target.value, rest: edited.rest})} />;
		restTime = <input name="rest" type="text" value={edited.rest} onChange={(event) => change({start: edited.start, end: edited.end, rest: event.target.value})} />;
		btnSave = <input className="save-time" type="button" value="保存" onClick={() => save(index, edited)} />;
		return (
			<div id="inputArea">
				<ul>
					<li>
						<span>開始時間</span>
						<span>{startTime}</span>
					</li>
					<li>
						<span>終了時間</span>
						<span>{endTime}</span>
					</li>
					<li>
						<span>休憩時間</span>
						<span>{restTime}</span>
					</li>
				</ul>
				{btnSave}
			</div>
		);
	} else {
		return null;
	}
};

export default connect(
	state => {
		return {
			edited: state.edited,
			index: state.index
		};
	},
	dispatch => {
		return {
			save: (index, edited) => {
				dispatch({
					type: 'SAVE_TIME',
					edited: edited,
					index: index
				});
			},
			change: (edited) => {
				dispatch({
					type: 'CHANGE_TIME',
					edited: edited
				});
			}
		};
	}
)(EditArea);