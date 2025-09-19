import "./app.css";
import { useState } from "preact/hooks";
import { AppContextProvider } from "./AppContext";
import Display from "./components/Display";
import Footer from "./components/Footer";
import Keypad from "./components/Keypad";
import { ShiftContextProvider } from "./ShiftContext";

export type Buffer = string | null;

export function App() {
	const [buffer, setBuffer] = useState<Buffer>(null);

	return (
		<div className="grid min-h-dvh place-content-center">
			<div className="calculator grid h-dvh max-h-[36rem] w-screen max-w-sm grid-rows-[minmax(0,1fr)_auto_auto] border-2 border-black p-4 pb-2">
				<AppContextProvider>
					<ShiftContextProvider>
						<Display buffer={buffer} />
						<Keypad buffer={buffer} setBuffer={setBuffer} />
					</ShiftContextProvider>
				</AppContextProvider>
				<Footer />
			</div>
		</div>
	);
}
