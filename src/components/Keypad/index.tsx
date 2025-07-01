import { useState, type Dispatch, type StateUpdater } from "preact/hooks";
import Key, { type KeyActions } from "./Key";
import { useAppContext } from "../../AppContext";
import type { Buffer } from "../../app";

interface KeypadProps {
	buffer: Buffer;
	setBuffer: Dispatch<StateUpdater<Buffer>>;
}

export type ShiftState = boolean;

export default function Keypad({ buffer, setBuffer }: KeypadProps) {
	const { dispatch } = useAppContext();

	const [shiftActive, setShiftActive] = useState<ShiftState>(false);

	// useEffect(() => {
	// 	const numberKeys = ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	// 	const operatorKeys = ["+", "-", "*", "/"];

	// 	window.addEventListener("keydown", (e: KeyboardEvent) => {
	// 		if (e.key === "Enter") {
	// 			if (!buffer) return dispatch({ type: "pick", payload: 0 });
	// 			dispatch({ type: "new", payload: buffer });
	// 			setBuffer(null);
	// 		}
	// 		if (numberKeys.includes(e.key)) {
	// 			setBuffer((prev) => (prev ? prev + e.key : e.key));
	// 		}
	// 	});
	// }, [buffer, setBuffer, dispatch]);

	function handleNumberClick(number: string) {
		setBuffer((prev) => (prev ? prev + number : number));
	}

	function handleDecimalClick() {
		if (buffer?.includes(".")) return;
		setBuffer((prev) => (prev === null ? "0." : `${prev}.`));
	}

	function handleNegativeClick() {
		setBuffer((prev) =>
			prev?.startsWith("-") ? prev.slice(1) : prev === null ? "-" : `-${prev}`,
		);
	}

	function handleEnterClick() {
		if (buffer?.length) {
			if (buffer === "-") return dispatch({ type: "new", payload: "-0" });
			dispatch({ type: "new", payload: buffer });
		}
	}

	function handleExponentClick() { 
		
	}

	function handleClearClick() { 

	}

	function handleMultiplyClick() { 

	}

	function handleDivideClick() { 

	}

	function handlePlusClick() { 

	}

	function handleMinusClick() { 

	}

	const numberKeys: KeyActions[] = [
		{ main: { label: "7", onClick: () => handleNumberClick("7") } },
		{ main: { label: "8", onClick: () => handleNumberClick("8") } },
		{ main: { label: "9", onClick: () => handleNumberClick("9") } },
		{ main: { label: "4", onClick: () => handleNumberClick("4") }, classes: "row-start-2" },
		{ main: { label: "5", onClick: () => handleNumberClick("5") }, classes: "row-start-2" },
		{ main: { label: "6", onClick: () => handleNumberClick("6") }, classes: "row-start-2" },
		{ main: { label: "1", onClick: () => handleNumberClick("1") }, classes: "row-start-3" },
		{ main: { label: "2", onClick: () => handleNumberClick("2") }, classes: "row-start-3" },
		{ main: { label: "3", onClick: () => handleNumberClick("3") }, classes: "row-start-3" },
		{ main: { label: "0", onClick: () => handleNumberClick("0") }, classes: "row-start-4" },
		{ main: { label: "+/-", onClick: handleNegativeClick }, classes: "row-start-4" },
		{ main: { label: ".", onClick: handleDecimalClick }, classes: "row-start-4" },
	];

	const operatorKeys: KeyActions[] = [
		{ main: { label: "EXP", onClick: handleExponentClick } },
		{ main: { label: "C", onClick: handleClearClick } },
		{ main: { label: "x", onClick: handleMultiplyClick }, classes: "row-start-2" },
		{ main: { label: "/", onClick: handleDivideClick }, classes: "row-start-2" },
		{ main: { label: "+", onClick: handlePlusClick }, classes: "row-start-3" },
		{ main: { label: "-", onClick: handleMinusClick }, classes: "row-start-3" },
		{ main: { label: "enter", onClick: handleEnterClick }, classes: "row-start-4 col-span-2" },
	];

	return (
		<div className="grid grid-cols-5">
			{numberKeys.map((params) => (
				<Key
					key={params.main.label}
					params={params}
					shiftActive={shiftActive}
					buttonType={"number"}
				/>
			))}
			{operatorKeys.map((params) => (
				<Key
					key={params.main.label}
					params={params}
					shiftActive={shiftActive}
					buttonType={"number"}
				/>
			))}
		</div>
	);
}
