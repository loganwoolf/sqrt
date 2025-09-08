import Decimal from "decimal.js";
import type { Stack } from "../AppContext";

export type Operator =
	| "add"
	| "subtract"
	| "multiply"
	| "divide"
	| "exponentiate";

export default function operate({
	stack,
	operator,
}: {
	stack: Stack;
	operator: Operator;
}): Stack {
	switch (operator) {
		case "add": {
			const [b, a, ...rest] = stack;
			const sum = new Decimal(a).add(b).toString();
			return [sum, ...rest];
		}
		case "subtract": {
			const [b, a, ...rest] = stack;
			const difference = new Decimal(a).sub(b).toString();
			return [difference, ...rest];
		}
		case "multiply": {
			const [b, a, ...rest] = stack;
			const product = new Decimal(a).mul(b).toString();
			return [product, ...rest];
		}
		case "divide": {
			const [b, a, ...rest] = stack;
			const quotient = new Decimal(a).div(b).toString();
			return [quotient, ...rest];
		}
		case "exponentiate": {
			const [b, a, ...rest] = stack;
			const pow = Decimal.pow(10, b);
			const exp = new Decimal(a).mul(pow).toString();
			return [exp, ...rest];
		}
		default:
			return stack;
	}
}
