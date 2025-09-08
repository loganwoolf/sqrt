import { useAppContext } from "../../AppContext";

interface DisplayProps {
	buffer: string | null;
}

export default function Display({ buffer }: DisplayProps) {
	const { state } = useAppContext();

	return (
		<div class="display grid grid-rows-[1fr_auto] w-full border-2 min-h-32 mb-2">
			<div className="stack bg-cyan-200 flex flex-col-reverse font-mono leading-none">
				{state.slice(0, buffer ? 7 : 8).map((line, index) => (
					<div class="stack-item" key={`${index}-${line}`}>
						{line}
					</div>
				))}
			</div>
			{buffer && <div className="buffer bg-amber-200">{buffer}</div>}
		</div>
	);
}
