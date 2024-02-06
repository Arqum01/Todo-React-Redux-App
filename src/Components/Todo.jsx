import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, updateTodo, deleteTodo } from "../features/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen, faTrashCan, faRedo } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
	const [text, setText] = useState("");
	const [editingTodoId, setEditingTodoId] = useState(null);
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setText(e.target.value);
	};

	const handleAddTodo = () => {
		if (text) {
			dispatch(addTodo(text));
			setText("");
			setEditingTodoId(null);
		}
	};

	const handleToggleComplete = (id) => {
		dispatch(toggleComplete(id));
	};

	const handleUpdateTodo = () => {
		if (text && editingTodoId !== null) {
			dispatch(updateTodo({ id: editingTodoId, newText: text }));
			setEditingTodoId(null);
			setText("");
		}
	};

	const handleDeleteTodo = (id) => {
		dispatch(deleteTodo(id));
	};

	const handleEditTodo = (id, currentText) => {
		setEditingTodoId(id);
		setText(currentText);
	};

	return (
		<div className="container App">
			<br />
			<br />
			<h2 style={{ color: "white" }}> Add your todo here</h2>
			<br />
			<br />
			<div className="row">
				<div className="col">
					<input type="text" value={text} onChange={handleInputChange} className="form-control form-control-lg" />
				</div>
				<div className="col-auto">
					<button
						onClick={editingTodoId !== null ? handleUpdateTodo : handleAddTodo}
						className="btn btn-lg btn-success"
					>
						{editingTodoId !== null ? "Update Todo" : "Add Todo"}
					</button>
				</div>
			</div>
			<br />
			{todos.map((todo, index) => (
				<ul className="col taskBg" key={todo.id}>
					<li className="list-item" style={{ listStyle: "none" }}>
						<div className={todo.completed ? "done" : ""}>
							<span className="taskNumber">{index + 1}</span>
							<span className="taskText">{todo.text}</span>
						</div>
						<div className="iconsWrap">
							{todo.completed ? (
								<>
									<span title="Redo Task" onClick={() => handleToggleComplete(todo.id)}>
										<FontAwesomeIcon icon={faRedo} />
									</span>
									<span title="Completed" style={{ color: "yellow" }}>
										<FontAwesomeIcon icon={faCircleCheck} />
									</span>
								</>
							) : (
								<>
									<span title="Click to Complete" onClick={() => handleToggleComplete(todo.id)}>
										<FontAwesomeIcon icon={faCircleCheck} />
									</span>
									<span title="Edit Task" onClick={() => handleEditTodo(todo.id, todo.text)}>
										<FontAwesomeIcon icon={faPen} />
									</span>
								</>
							)}
							<span title="Delete" onClick={() => handleDeleteTodo(todo.id)}>
								<FontAwesomeIcon icon={faTrashCan} />
							</span>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
};

export default Todo;
