import type { Dispatch, StateUpdater } from "preact/hooks";
import { useEffect } from "preact/hooks";
import type { Buffer } from "../../app";
import { HOTKEYS } from "../../lib/hotkeys";
import Key, { type KeyParams } from "./Key";
import { ShiftKey } from "./Key/ShiftKey";
import { useKey } from "./useKey";

interface KeypadProps {
	buffer: Buffer;
	setBuffer: Dispatch<StateUpdater<Buffer>>;
}

export default function Keypad({ buffer, setBuffer }: KeypadProps) {
	const {
		handleNumberClick,
		handleDecimalClick,
		handleNegativeClick,
		handleEnterClick,
		handleExponentClick,
		handleSqrtClick,
		handleSquareClick,
		handleClearClick,
		handleMultiplyClick,
		handleDivideClick,
		handlePlusClick,
		handleMinusClick,
	} = useKey({ buffer, setBuffer });

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.repeat) return;
			const selector = `button[data-hotkey="${event.key}"]`;
			const button = document.querySelector(selector);
			if (!(button instanceof HTMLButtonElement)) return;

			button.click();
		};
		window.addEventListener("keydown", handleKeyDown);
		// return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const specialKeys: KeyParams[] = [
		{
			mainAction: {
				label: "sqrt",
				onClick: handleSqrtClick,
			},
			shiftAction: {
				label: "x^2",
				onClick: handleSquareClick,
			},
			hotkey: HOTKEYS.SQRT,
		},
	];

	const numberKeys: KeyParams[] = [
		{
			mainAction: { label: "7", onClick: () => handleNumberClick("7") },
			hotkey: HOTKEYS.NUM_7,
		},
		{
			mainAction: { label: "8", onClick: () => handleNumberClick("8") },
			hotkey: HOTKEYS.NUM_8,
		},
		{
			mainAction: { label: "9", onClick: () => handleNumberClick("9") },
			hotkey: HOTKEYS.NUM_9,
		},
		{
			mainAction: {
				label: "4",
				onClick: () => handleNumberClick("4"),
			},
			hotkey: HOTKEYS.NUM_4,
			className: "row-start-2",
		},
		{
			mainAction: { label: "5", onClick: () => handleNumberClick("5") },
			hotkey: HOTKEYS.NUM_5,
			className: "row-start-2",
		},
		{
			mainAction: { label: "6", onClick: () => handleNumberClick("6") },
			hotkey: HOTKEYS.NUM_6,
			className: "row-start-2",
		},
		{
			mainAction: { label: "1", onClick: () => handleNumberClick("1") },
			hotkey: HOTKEYS.NUM_1,
			className: "row-start-3",
		},
		{
			mainAction: { label: "2", onClick: () => handleNumberClick("2") },
			hotkey: HOTKEYS.NUM_2,
			className: "row-start-3",
		},
		{
			mainAction: { label: "3", onClick: () => handleNumberClick("3") },
			hotkey: HOTKEYS.NUM_3,
			className: "row-start-3",
		},
		{
			mainAction: { label: "0", onClick: () => handleNumberClick("0") },
			hotkey: HOTKEYS.NUM_0,
			className: "row-start-4",
		},
		{
			mainAction: { label: "+/-", onClick: handleNegativeClick },
			hotkey: HOTKEYS.NEGATE,
			className: "row-start-4",
		},
		{
			mainAction: { label: ".", onClick: handleDecimalClick },
			hotkey: HOTKEYS.DECIMAL,
			className: "row-start-4",
		},
	];

	const operatorKeys: KeyParams[] = [
		{
			mainAction: { label: "EXP", onClick: handleExponentClick },
			hotkey: HOTKEYS.EXPONENTIATE,
		},
		{
			mainAction: { label: "C", onClick: handleClearClick },
			hotkey: HOTKEYS.BACKSPACE,
		},
		{
			mainAction: { label: "x", onClick: handleMultiplyClick },
			hotkey: HOTKEYS.MULTIPLY,
			className: "row-start-2",
		},
		{
			mainAction: { label: "/", onClick: handleDivideClick },
			hotkey: HOTKEYS.DIVIDE,
			className: "row-start-2",
		},
		{
			mainAction: { label: "+", onClick: handlePlusClick },
			hotkey: HOTKEYS.ADD,
			className: "row-start-3",
		},
		{
			mainAction: { label: "-", onClick: handleMinusClick },
			hotkey: HOTKEYS.SUBTRACT,
			className: "row-start-3",
		},
		{
			mainAction: { label: "enter", onClick: handleEnterClick },
			hotkey: HOTKEYS.ENTER,
			className: "row-start-4 col-span-2",
		},
	];

	return (
		<>
			<div className="grid grid-cols-6 gap-1 mb-1">
				<ShiftKey />
				{specialKeys.map((params) => (
					<Key key={params.mainAction.label} {...params} buttonType={"small"} />
				))}
			</div>
			<div className="grid grid-cols-5 gap-1">
				{numberKeys.map((params) => (
					<Key
						key={params.mainAction.label}
						{...params}
						buttonType={"number"}
					/>
				))}
				{operatorKeys.map((params) => (
					<Key
						key={params.mainAction.label}
						{...params}
						buttonType={"number"}
					/>
				))}
			</div>
		</>
	);
}
