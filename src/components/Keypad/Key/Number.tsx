import type { Buffer } from "../../../app";
import type { ShiftState } from "..";
import Key from ".";

export function Digit({
	number,
	onClick,
	onShiftClick,
	shiftActive,
}: {
	number: number;
	onClick: () => Buffer;
	onShiftClick: () => Buffer;
	shiftActive: ShiftState;
}) {
	const numString = number.toString();

	return (
		<Key
			key={numString}
			params={{
				main: {
					label: numString,
					onClick: () => handleNumberClick(numString),
				},
			}}
			shiftActive={shiftActive}
		/>
	);
}
