import { useAppContext } from "../../AppContext";
import type { Buffer } from "../../app";
import Statusline from "./Statusline";

export default function Display({ buffer }: { buffer: Buffer }) {
	const { state: stack } = useAppContext();

	return (
		<div class="display mb-2 grid w-full grid-rows-[1fr_auto] border-2 bg-cyan-200 font-mono">
			<div className="mx-2">
				<Statusline />
			</div>
			<div className="stack flex flex-col-reverse overflow-auto text-right [scrollbar-gutter:stable] [scrollbar-width:thin]">
				{stack.map((line, index) => (
					<div
						className="grid grid-cols-[2rem_1fr] pr-2"
						key={`${index}-${line}`}
					>
						<div className="">{index}:</div>
						<div class="stack-item">{line}</div>
					</div>
				))}
			</div>
			{buffer && (
				<div className="buffer grid grid-cols-[2rem_1fr] overflow-auto bg-amber-200 pr-2 text-right [scrollbar-gutter:stable] [scrollbar-width:thin]">
					<div>{">>"}</div>
					<div className="buffer-item">{buffer}</div>
				</div>
			)}
		</div>
	);
}
