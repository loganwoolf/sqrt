import { cn } from "../../../lib/utils";
import { useShiftContext } from "../../../ShiftContext";
import Key from ".";

export function ShiftKey() {
	const { shiftActive, setShiftActive } = useShiftContext();

	return (
		<Key
			mainAction={{
				label: "Shift",
				onClick: () => setShiftActive((prev) => !prev),
			}}
			buttonType={"shift"}
			hotkey="Shift"
			className={cn({ "[&>button]:bg-amber-600": shiftActive })}
		/>
	);
}
