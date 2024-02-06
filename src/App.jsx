import { Provider } from "react-redux";
import "./App.css";
import Todo from "./Components/Todo";
import store from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<Provider store={store}>
				<Todo />
			</Provider>
		</>
	);
}

export default App;
