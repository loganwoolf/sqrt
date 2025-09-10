import Decimal from "decimal.js";
import type { Stack } from "../AppContext";

export type Operator =
	| "add"
	| "subtract"
	| "multiply"
	| "divide"
	| "exponentiate"
	| "sqrt"
	| "square"
	| "nroot"
	| "npow"
	| "sin"
	| "cos"
	| "tan"
	| "asin"
	| "acos"
	| "atan";

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
		case "sqrt": {
			const [a, ...rest] = stack;
			const sqrt = new Decimal(a).sqrt().toString();
			return [sqrt, ...rest];
		}
		case "square": {
			const [a, ...rest] = stack;
			const square = new Decimal(a).pow(2).toString();
			return [square, ...rest];
		}
		case "nroot": {
			const [b, a, ...rest] = stack;
			const n = new Decimal(a).pow(new Decimal(1).div(b)).toString();
			return [n, ...rest];
		}
		case "npow": {
			const [b, a, ...rest] = stack;
			const n = new Decimal(a).pow(b).toString();
			return [n, ...rest];
		}
		case "sin": {
			const [a, ...rest] = stack;
			const sin = Decimal.sin(
				new Decimal(a).mul(Decimal.acos(-1)).div(180),
			).toString();
			return [sin, ...rest];
		}
		case "cos": {
			const [a, ...rest] = stack;
			const cos = Decimal.cos(
				new Decimal(a).mul(Decimal.acos(-1)).div(180),
			).toString();
			return [cos, ...rest];
		}
		case "tan": {
			const [a, ...rest] = stack;
			const tan = Decimal.tan(
				new Decimal(a).mul(Decimal.acos(-1)).div(180),
			).toString();
			return [tan, ...rest];
		}
		case "asin": {
			const [a, ...rest] = stack;
			const sin = Decimal(a).asin().mul(180).div(Decimal.acos(-1)).toString();
			return [sin, ...rest];
		}
		case "acos": {
			const [a, ...rest] = stack;
			const cos = Decimal(a).acos().mul(180).div(Decimal.acos(-1)).toString();
			return [cos, ...rest];
		}
		case "atan": {
			const [a, ...rest] = stack;
			const tan = Decimal(a).atan().mul(180).div(Decimal.acos(-1)).toString();
			return [tan, ...rest];
		}
		default:
			return stack;
	}
}
