import { cn } from "../../lib/utils";
import { useShiftContext } from "../../ShiftContext";

export default function Statusline() {
	const { shiftActive } = useShiftContext();

	const statusItems = [
		{
			display: "SHIFT",
			status: shiftActive,
		},
	];

	return (
		<div className="space-x-1 bg-cyan-200 px-2">
			{statusItems.map(({ status, display }) => (
				<span className={cn({ "opacity-30": !status })}>{display}</span>
			))}
		</div>
	);
}
