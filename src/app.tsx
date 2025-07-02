import "./app.css";
import { useState } from "preact/hooks";
import { AppContextProvider } from "./AppContext";
import Display from "./components/Display";
import Keypad from "./components/Keypad";

export type Buffer = string | null;

export function App() {
	const [buffer, setBuffer] = useState<Buffer>(null);

	return (
		<div className="grid place-content-center">
			<div className="w-screen max-w-sm">
				<AppContextProvider>
					<Display buffer={buffer} />
					<Keypad buffer={buffer} setBuffer={setBuffer} />
				</AppContextProvider>
			</div>
		</div>
	);
}
