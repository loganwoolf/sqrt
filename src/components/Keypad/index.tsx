import type { Dispatch, StateUpdater } from "preact/hooks";
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
		handleClearClick,
		handleMultiplyClick,
		handleDivideClick,
		handlePlusClick,
		handleMinusClick,
	} = useKey({ buffer, setBuffer });

	const numberKeys: KeyParams[] = [
		{
			mainAction: { label: "7", onClick: () => handleNumberClick("7") },
		},
		{
			mainAction: { label: "8", onClick: () => handleNumberClick("8") },
		},
		{
			mainAction: { label: "9", onClick: () => handleNumberClick("9") },
		},
		{
			mainAction: {
				label: "4",
				onClick: () => handleNumberClick("4"),
			},
			className: "row-start-2",
		},
		{
			mainAction: { label: "5", onClick: () => handleNumberClick("5") },
			className: "row-start-2",
		},
		{
			mainAction: { label: "6", onClick: () => handleNumberClick("6") },
			className: "row-start-2",
		},
		{
			mainAction: { label: "1", onClick: () => handleNumberClick("1") },
			className: "row-start-3",
		},
		{
			mainAction: { label: "2", onClick: () => handleNumberClick("2") },
			className: "row-start-3",
		},
		{
			mainAction: { label: "3", onClick: () => handleNumberClick("3") },
			className: "row-start-3",
		},
		{
			mainAction: { label: "0", onClick: () => handleNumberClick("0") },
			className: "row-start-4",
		},
		{
			mainAction: { label: "+/-", onClick: handleNegativeClick },
			className: "row-start-4",
		},
		{
			mainAction: { label: ".", onClick: handleDecimalClick },
			className: "row-start-4",
		},
	];

	const operatorKeys: KeyParams[] = [
		{ mainAction: { label: "EXP", onClick: handleExponentClick } },
		{ mainAction: { label: "C", onClick: handleClearClick } },
		{
			mainAction: { label: "x", onClick: handleMultiplyClick },
			className: "row-start-2",
		},
		{
			mainAction: { label: "/", onClick: handleDivideClick },
			className: "row-start-2",
		},
		{
			mainAction: { label: "+", onClick: handlePlusClick },
			className: "row-start-3",
		},
		{
			mainAction: { label: "-", onClick: handleMinusClick },
			className: "row-start-3",
		},
		{
			mainAction: { label: "enter", onClick: handleEnterClick },
			className: "row-start-4 col-span-2",
		},
	];

	// const specialKeys: KeyActions[] = [];

	return (
		<>
			<div className="grid grid-cols-6 gap-1 mb-1">
				<ShiftKey />
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
