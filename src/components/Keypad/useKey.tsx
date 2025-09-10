import type { Dispatch, StateUpdater } from "preact/hooks";
import { useAppContext } from "../../AppContext";
import type { Buffer } from "../../app";
import type { Operator } from "../../lib/operations";

export function useKey({
	buffer,
	setBuffer,
}: {
	buffer: Buffer;
	setBuffer: Dispatch<StateUpdater<Buffer>>;
}) {
	const { dispatch } = useAppContext();

	function operate(operator: Operator) {
		dispatch({ type: "operate", payload: { buffer, operator } });
		setBuffer(null);
	}

	return {
		number: (number: string) =>
			setBuffer((prev) => (prev ? prev + number : number)),
		decimal: () => {
			if (buffer?.includes(".")) return;

			setBuffer((prev) => (prev === null ? "0." : `${prev}.`));
		},
		negative: () => {
			if (!buffer) {
				return dispatch({
					type: "operate",
					payload: { buffer: "-1", operator: "multiply" },
				});
			}

			setBuffer((prev) =>
				prev?.startsWith("-")
					? prev.slice(1)
					: prev === null
						? "-"
						: `-${prev}`,
			);
		},
		enter: () => {
			if (buffer?.length) {
				if (buffer === "-") return dispatch({ type: "new", payload: "-0" });

				dispatch({ type: "new", payload: buffer });
				return setBuffer(null);
			}

			dispatch({ type: "pick", payload: 0 });
		},
		exponent: () => operate("exponentiate"),
		sqrt: () => operate("sqrt"),
		square: () => operate("square"),
		nroot: () => operate("nroot"),
		npow: () => operate("npow"),
		sin: () => operate("sin"),
		cos: () => operate("cos"),
		tan: () => operate("tan"),
		asin: () => operate("asin"),
		acos: () => operate("acos"),
		atan: () => operate("atan"),
		clear: () => {
			if (buffer)
				return setBuffer((prev) =>
					prev ? prev.slice(0, prev.length - 1) : null,
				);

			dispatch({ type: "drop" });
		},
		multiply: () => operate("multiply"),
		divide: () => operate("divide"),
		plus: () => operate("add"),
		minus: () => operate("subtract"),
	};
}
