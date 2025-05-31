import { useState } from "preact/hooks";
import { useAppContext } from "../../AppContext";

export default function Display() {
	const { state, dispatch } = useAppContext();
	const [buffer, setBuffer] = useState("");

	return (
		<div class="display grid grid-rows-[1fr_auto] w-md h-96 border-2">
			<div className="stack flex flex-column-reverse leading-none">
				{state.map((level, index) => (
					<div class="stack-item" key={`${index}-${level}`}>
						{level}
					</div>
				))}
			</div>
			<input
				type="text"
				class="bg-amber-50"
				value={buffer}
				onChange={(e) => setBuffer(e.currentTarget.value)}
				onInput={dispatch({ type: "new", payload: buffer })}
				className="buffer"
			/>
		</div>
	);
}
