import "./app.css";
import { useState } from "preact/hooks";
import { AppContextProvider } from "./AppContext";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import { ShiftContextProvider } from "./ShiftContext";

export type Buffer = string | null;

export function App() {
	const [buffer, setBuffer] = useState<Buffer>(null);

	return (
		<div className="grid min-h-dvh place-content-center">
			<div className="w-screen max-w-sm p-4 border-2 border-black">
				<AppContextProvider>
					<Display buffer={buffer} />
					<ShiftContextProvider>
						<Keypad buffer={buffer} setBuffer={setBuffer} />
					</ShiftContextProvider>
				</AppContextProvider>
			</div>
		</div>
	);
}
