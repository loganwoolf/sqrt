import { useShiftContext } from "../../../ShiftContext";
import Key from ".";

export function ShiftKey() {
	const { setShiftActive } = useShiftContext();

	return (
		<Key
			mainAction={{
				label: "Shift",
				onClick: () => setShiftActive((prev) => !prev),
			}}
			buttonType={"shift"}
		/>
	);
}
