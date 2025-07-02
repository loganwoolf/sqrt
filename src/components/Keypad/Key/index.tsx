import { cn } from "../../../lib/utils";
import type { ShiftState } from "..";

interface KeyAction {
	label: string;
	onClick: () => void;
}

export interface KeyActions {
	main: KeyAction;
	shift?: KeyAction;
	classes?: string;
}

type ButtonType =
	| "clear"
	| "memory"
	| "number"
	| "shift"
	| "small"
	| "stack"
	| "wide";

interface KeyProps {
	params: KeyActions;
	shiftActive: ShiftState;
	buttonType: ButtonType | ButtonType[];
}

export default function Key({ params, shiftActive, buttonType }: KeyProps) {
	return (
		<div className={cn("key", params.classes)}>
			{params.shift?.label && <span className="">{params.shift.label}</span>}
			<button
				type="button"
				className={cn(
					"p-2 w-full",
					Array.isArray(buttonType) ? buttonType.join(" ") : buttonType,
				)}
				onClick={!shiftActive ? params.main.onClick : params.shift?.onClick}
			>
				{params.main.label}
			</button>
		</div>
	);
}
