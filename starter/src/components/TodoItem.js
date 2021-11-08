import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';
//import { toggleComplete, deleteTodo } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	const handleComleteClick = () => {
		dispatch(
			toggleCompleteAsync({ id: id, title: title, completed: !completed })
			//toggleComplete({ id: id, completed: !completed })
		);
	};

	const handleDeleteTodo = () => {
		//dispatch( deleteTodo({ id: id }) );
		dispatch( deleteTodoAsync({ id: id }) );
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input 
						type='checkbox' 
						className='mr-3' 
						checked={completed}
						onChange={handleComleteClick}
						></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={handleDeleteTodo}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;

{/* <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
<div className='d-flex justify-content-between'>
	<span className='d-flex align-items-center'>
		<input type='checkbox' className='mr-3' checked={completed}></input>
		{title}
	</span>
	<button className='btn btn-danger'>Delete</button>
</div>
</li> */}
