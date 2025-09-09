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

	function handleNumberClick(number: string) {
		setBuffer((prev) => (prev ? prev + number : number));
	}

	function handleDecimalClick() {
		if (buffer?.includes(".")) return;
		setBuffer((prev) => (prev === null ? "0." : `${prev}.`));
	}

	function handleNegativeClick() {
		if (!buffer) {
			dispatch({
				type: "operate",
				payload: { buffer: "-1", operator: "multiply" },
			});

			return;
		}

		setBuffer((prev) =>
			prev?.startsWith("-") ? prev.slice(1) : prev === null ? "-" : `-${prev}`,
		);
	}

	function handleEnterClick() {
		if (buffer?.length) {
			if (buffer === "-") return dispatch({ type: "new", payload: "-0" });
			dispatch({ type: "new", payload: buffer });
			setBuffer(null);

			return;
		}

		dispatch({ type: "pick", payload: 0 });
	}

	function handleExponentClick() {
		operate("exponentiate");
	}

	function handleSqrtClick() {
		operate("sqrt");
	}

	function handleSquareClick() {
		operate("square");
	}

	function handleClearClick() {
		if (buffer) {
			return setBuffer((prev) =>
				prev ? prev.slice(0, prev.length - 1) : null,
			);
		}

		dispatch({ type: "drop" });
	}

	function handleMultiplyClick() {
		operate("multiply");
	}

	function handleDivideClick() {
		operate("divide");
	}

	function handlePlusClick() {
		operate("add");
	}

	function handleMinusClick() {
		operate("subtract");
	}

	/* not returned */
	function operate(operator: Operator) {
		dispatch({ type: "operate", payload: { buffer, operator } });
		setBuffer(null);
	}

	return {
		handleNumberClick,
		handleDecimalClick,
		handleNegativeClick,
		handleEnterClick,
		handleExponentClick,
		handleSqrtClick,
		handleSquareClick,
		handleClearClick,
		handleMultiplyClick,
		handleDivideClick,
		handlePlusClick,
		handleMinusClick,
	};
}
