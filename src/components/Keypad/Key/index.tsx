import { HOTKEYS, type Hotkey } from "../../../lib/hotkeys";
import { cn } from "../../../lib/utils";
import { useShiftContext } from "../../../ShiftContext";

interface KeyAction {
	label: string;
	onClick: () => void;
}

type ButtonType =
	| "clear"
	| "memory"
	| "number"
	| "shift"
	| "small"
	| "stack"
	| "wide";

export interface KeyParams {
	mainAction: KeyAction;
	shiftAction?: KeyAction;
	className?: string;
	buttonType?: ButtonType | ButtonType[];
	hotkey: Hotkey;
}

interface KeyProps extends KeyParams {
	buttonType: ButtonType | ButtonType[];
}

export default function Key({
	mainAction,
	shiftAction,
	buttonType,
	className,
	hotkey,
}: KeyProps) {
	const { shiftActive, setShiftActive } = useShiftContext();

	function performShiftAction(action: () => void): () => void {
		return () => {
			action();
			setShiftActive(false);
		};
	}

	function performMainAction(action: () => void): () => void {
		return () => {
			action();
			if (hotkey !== HOTKEYS.SHIFT) {
				setShiftActive(false);
			}
		};
	}

	return (
		<div className={cn("key grid grid-rows-[1lh_auto]", className)}>
			{shiftAction?.label && <span className="">{shiftAction.label}</span>}
			<button
				type="button"
				className={cn(
					"p-2 w-full border-2 hover:bg-gray-200 row-start-2",
					Array.isArray(buttonType) ? buttonType.join(" ") : buttonType,
				)}
				onClick={
					shiftActive && shiftAction
						? performShiftAction(shiftAction.onClick)
						: performMainAction(mainAction.onClick)
				}
				data-hotkey={hotkey}
			>
				{mainAction.label}
			</button>
		</div>
	);
}
