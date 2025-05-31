import "./app.css";
import { AppContextProvider } from "./AppContext";
import Display from "./components/Display";

export function App() {
	return (
		<AppContextProvider>
			<Display />
		</AppContextProvider>
	);
}
