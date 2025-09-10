import { useAppContext } from "../../AppContext";

interface DisplayProps {
	buffer: string | null;
}

export default function Display({ buffer }: DisplayProps) {
	const { state } = useAppContext();

	return (
		<div class="display grid grid-rows-[1fr_auto] w-full border-2 h-[9lh] mb-2 font-mono text-right">
			<div className="stack bg-cyan-200 flex flex-col-reverse overflow-auto">
				{state.map((line, index) => (
					<div
						className="grid grid-cols-[2rem_1fr] pr-2"
						key={`${index}-${line}`}
					>
						<div className="">{buffer ? index + 1 : index}:</div>
						<div class="stack-item">{line}</div>
					</div>
				))}
			</div>
			{buffer && (
				<div className="buffer grid grid-cols-[2rem_1fr] pr-2 bg-amber-200">
					<div>{buffer ? "0:" : null}</div>
					<div className="buffer-item">{buffer}</div>
				</div>
			)}
		</div>
	);
}
