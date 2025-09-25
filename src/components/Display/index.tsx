import { useAppContext } from "../../AppContext";
import type { Buffer } from "../../app";
import Statusline from "./Statusline";

export default function Display({ buffer }: { buffer: Buffer }) {
	const {
		state: [stack],
	} = useAppContext();

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
						<div>{stackRowName(index)}:</div>
						{/* @ts-expect-error format actually does accept a string */}
						<div class="stack-item">{formatter.format(line)}</div>
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

const formatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 8,
	maximumSignificantDigits: 16,
	// @ts-expect-error roundingPriority is valid key https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
	roundingPriority: "lessPrecision",
	trailingZeroDisplay: "stripIfInteger",
});

function stackRowName(index: number): string {
	switch (index) {
		case 0:
			return "X";
		case 1:
			return "Y";
		case 2:
			return "Z";
		case 3:
			return "T";
		default:
			return (index + 1).toString();
	}
}
