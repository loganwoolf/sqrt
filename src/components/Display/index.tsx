import { useAppContext } from "../../AppContext";

interface DisplayProps {
	buffer: string | null;
}

export default function Display({ buffer }: DisplayProps) {
	const { state } = useAppContext();

	return (
		<div class="display grid grid-rows-[1fr_auto] w-full border-2 h-[9lh] mb-2 font-mono text-right">
			<div className="stack bg-cyan-200 flex flex-col-reverse">
				{state.slice(0, buffer ? 7 : 8).map((line, index) => (
					<div className="grid grid-cols-[1fr_2rem]" key={`${index}-${line}`}>
						<div class="stack-item">{line}</div>
						<div className="">:{buffer ? index + 1 : index}</div>
					</div>
				))}
			</div>
			{buffer && (
				<div className="grid grid-cols-[1fr_2rem] bg-amber-200">
					<div className="buffer">{buffer}</div>
					<div>{buffer ? ":0" : null}</div>
				</div>
			)}
		</div>
	);
}
