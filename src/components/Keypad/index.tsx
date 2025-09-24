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
	const handle = useKey({ buffer, setBuffer });

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.repeat) return;

			const selector = `button[data-hotkey="${event.key}"]`;
			const button = document.querySelector(selector);
			if (!(button instanceof HTMLButtonElement)) return;

			button.click();
		};
		window.addEventListener("keydown", handleKeyDown);
	}, []);

	const specialKeys: KeyParams[] = [
		{
			mainAction: {
				label: "sqrt",
				onClick: handle.sqrt,
			},
			shiftAction: {
				label: "x^2",
				onClick: handle.square,
			},
			hotkey: HOTKEYS.SQRT,
		},
		{
			mainAction: {
				label: "y^x",
				onClick: handle.npow,
			},
			shiftAction: {
				label: "x rt",
				onClick: handle.nroot,
			},
			hotkey: HOTKEYS.SQRT,
		},
		{
			mainAction: {
				label: "sin",
				onClick: handle.sin,
			},
			shiftAction: {
				label: "asin",
				onClick: handle.asin,
			},
		},
		{
			mainAction: {
				label: "cos",
				onClick: handle.cos,
			},
			shiftAction: {
				label: "acos",
				onClick: handle.acos,
			},
		},
		{
			mainAction: {
				label: "tan",
				onClick: handle.tan,
			},
			shiftAction: {
				label: "atan",
				onClick: handle.atan,
			},
		},
	];

	const stackKeys: KeyParams[] = [
		// {
		// 	mainAction: { label: "swap", onClick: handle.swap },
		// },
	];

	const numberKeys: KeyParams[] = [
		{
			mainAction: { label: "7", onClick: () => handle.number("7") },
			hotkey: HOTKEYS.NUM_7,
		},
		{
			mainAction: { label: "8", onClick: () => handle.number("8") },
			hotkey: HOTKEYS.NUM_8,
		},
		{
			mainAction: { label: "9", onClick: () => handle.number("9") },
			hotkey: HOTKEYS.NUM_9,
		},
		{
			mainAction: { label: "4", onClick: () => handle.number("4") },
			hotkey: HOTKEYS.NUM_4,
			className: "row-start-2",
		},
		{
			mainAction: { label: "5", onClick: () => handle.number("5") },
			hotkey: HOTKEYS.NUM_5,
			className: "row-start-2",
		},
		{
			mainAction: { label: "6", onClick: () => handle.number("6") },
			hotkey: HOTKEYS.NUM_6,
			className: "row-start-2",
		},
		{
			mainAction: { label: "1", onClick: () => handle.number("1") },
			hotkey: HOTKEYS.NUM_1,
			className: "row-start-3",
		},
		{
			mainAction: { label: "2", onClick: () => handle.number("2") },
			hotkey: HOTKEYS.NUM_2,
			className: "row-start-3",
		},
		{
			mainAction: { label: "3", onClick: () => handle.number("3") },
			shiftAction: { label: "pi", onClick: handle.pi },
			hotkey: HOTKEYS.NUM_3,
			className: "row-start-3",
		},
		{
			mainAction: { label: "0", onClick: () => handle.number("0") },
			hotkey: HOTKEYS.NUM_0,
			className: "row-start-4",
		},
		{
			mainAction: { label: "+/-", onClick: handle.negative },
			hotkey: HOTKEYS.NEGATE,
			className: "row-start-4",
		},
		{
			mainAction: { label: ".", onClick: handle.decimal },
			hotkey: HOTKEYS.DECIMAL,
			className: "row-start-4",
		},
	];

	const operatorKeys: KeyParams[] = [
		{
			mainAction: { label: "EXP", onClick: handle.exponent },
			hotkey: HOTKEYS.EXPONENTIATE,
		},
		{
			mainAction: { label: "C", onClick: handle.clear },
			hotkey: HOTKEYS.BACKSPACE,
		},
		{
			mainAction: { label: "x", onClick: handle.multiply },
			hotkey: HOTKEYS.MULTIPLY,
			className: "row-start-2",
		},
		{
			mainAction: { label: "/", onClick: handle.divide },
			hotkey: HOTKEYS.DIVIDE,
			className: "row-start-2",
		},
		{
			mainAction: { label: "+", onClick: handle.plus },
			hotkey: HOTKEYS.ADD,
			className: "row-start-3",
		},
		{
			mainAction: { label: "-", onClick: handle.minus },
			hotkey: HOTKEYS.SUBTRACT,
			className: "row-start-3",
		},
		{
			mainAction: { label: "enter", onClick: handle.enter },
			hotkey: HOTKEYS.ENTER,
			className: "row-start-4 col-span-2",
		},
	];

	return (
		<>
			<div className="mb-1 grid grid-cols-6 gap-1">
				<ShiftKey />
				{specialKeys.map((params) => (
					<Key key={params.mainAction.label} {...params} buttonType={"small"} />
				))}
				{stackKeys.map((params) => (
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
