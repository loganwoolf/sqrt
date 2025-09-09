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
	hotkey: string;
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

	return (
		<div className={cn("key", className)}>
			{shiftAction?.label && <span className="">{shiftAction.label}</span>}
			<button
				type="button"
				className={cn(
					"p-2 w-full border-2 hover:bg-gray-200",
					Array.isArray(buttonType) ? buttonType.join(" ") : buttonType,
				)}
				onClick={
					shiftActive && shiftAction
						? performShiftAction(shiftAction.onClick)
						: mainAction.onClick
				}
				data-hotkey={hotkey}
			>
				{mainAction.label}
			</button>
		</div>
	);
}
