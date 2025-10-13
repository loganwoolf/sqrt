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
	hotkey?: Hotkey;
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

	function performShiftAction(action: () => void): void {
		action();
		setShiftActive(false);
	}

	function performMainAction(action: () => void): void {
		action();
		if (hotkey !== HOTKEYS.SHIFT) {
			setShiftActive(false);
		}
	}

	return (
		<div className={cn("key grid grid-rows-[1lh_auto]", className)}>
			{shiftAction?.label && <span className="px-1">{shiftAction.label}</span>}
			<button
				type="button"
				className={cn(
					"row-start-2 w-full border-2 p-2 hover:bg-gray-200",
					"[touch-action:manipulation]",
					Array.isArray(buttonType) ? buttonType.join(" ") : buttonType,
				)}
				onClick={(event) => {
					if (shiftActive && shiftAction) {
						performShiftAction(shiftAction.onClick);
					} else {
						performMainAction(mainAction.onClick);
					}
					if (event.target instanceof HTMLButtonElement) event.target.blur();
				}}
				data-hotkey={hotkey}
				tabindex={-1}
			>
				{mainAction.label}
			</button>
		</div>
	);
}
