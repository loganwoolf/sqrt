import type { Dispatch, StateUpdater } from "preact/hooks";
import { useEffect } from "preact/hooks";
import type { Buffer } from "../../app";
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
			hotkey: "s",
		},
	];

	const numberKeys: KeyParams[] = [
		{
			mainAction: { label: "7", onClick: () => handleNumberClick("7") },
			hotkey: "7",
		},
		{
			mainAction: { label: "8", onClick: () => handleNumberClick("8") },
			hotkey: "8",
		},
		{
			mainAction: { label: "9", onClick: () => handleNumberClick("9") },
			hotkey: "9",
		},
		{
			mainAction: {
				label: "4",
				onClick: () => handleNumberClick("4"),
			},
			hotkey: "4",
			className: "row-start-2",
		},
		{
			mainAction: { label: "5", onClick: () => handleNumberClick("5") },
			hotkey: "5",
			className: "row-start-2",
		},
		{
			mainAction: { label: "6", onClick: () => handleNumberClick("6") },
			hotkey: "6",
			className: "row-start-2",
		},
		{
			mainAction: { label: "1", onClick: () => handleNumberClick("1") },
			hotkey: "1",
			className: "row-start-3",
		},
		{
			mainAction: { label: "2", onClick: () => handleNumberClick("2") },
			hotkey: "2",
			className: "row-start-3",
		},
		{
			mainAction: { label: "3", onClick: () => handleNumberClick("3") },
			hotkey: "3",
			className: "row-start-3",
		},
		{
			mainAction: { label: "0", onClick: () => handleNumberClick("0") },
			hotkey: "0",
			className: "row-start-4",
		},
		{
			mainAction: { label: "+/-", onClick: handleNegativeClick },
			hotkey: "n",
			className: "row-start-4",
		},
		{
			mainAction: { label: ".", onClick: handleDecimalClick },
			hotkey: ".",
			className: "row-start-4",
		},
	];

	const operatorKeys: KeyParams[] = [
		{ mainAction: { label: "EXP", onClick: handleExponentClick }, hotkey: "e" },
		{
			mainAction: { label: "C", onClick: handleClearClick },
			hotkey: "Backspace",
		},
		{
			mainAction: { label: "x", onClick: handleMultiplyClick },
			hotkey: "*",
			className: "row-start-2",
		},
		{
			mainAction: { label: "/", onClick: handleDivideClick },
			hotkey: "/",
			className: "row-start-2",
		},
		{
			mainAction: { label: "+", onClick: handlePlusClick },
			hotkey: "+",
			className: "row-start-3",
		},
		{
			mainAction: { label: "-", onClick: handleMinusClick },
			hotkey: "-",
			className: "row-start-3",
		},
		{
			mainAction: { label: "enter", onClick: handleEnterClick },
			hotkey: "Enter",
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
