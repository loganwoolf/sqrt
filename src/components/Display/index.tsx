import { useAppContext } from "../../AppContext";
import Statusline from "./Statusline";

interface DisplayProps {
	buffer: string | null;
}

export default function Display({ buffer }: DisplayProps) {
	const { state } = useAppContext();

	return (
		<div class="display mb-2 grid w-full grid-rows-[1fr_auto] border-2 bg-cyan-200 font-mono">
			<div className="mx-2">
				<Statusline />
			</div>
			<div className="stack flex flex-col-reverse overflow-auto text-right">
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
				<div className="buffer grid grid-cols-[2rem_1fr] bg-amber-200 pr-2 text-right">
					<div>{buffer ? "0:" : null}</div>
					<div className="buffer-item">{buffer}</div>
				</div>
			)}
		</div>
	);
}
