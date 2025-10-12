import Decimal from "decimal.js";
import type { Stack } from "../AppContext";

export type Operator = keyof typeof operations;
type StackOperation = (stack: Stack) => Stack;

export default function operate({
	stack,
	operator,
}: {
	stack: Stack;
	operator: Operator;
}): Stack {
	return operations[operator](stack);
}

const operations = {
	// BASIC
	add: (stack) => {
		const [b, a, ...rest] = stack;
		const sum = new Decimal(a).add(b).toString();
		return [sum, ...rest];
	},
	subtract: (stack) => {
		const [b, a, ...rest] = stack;
		const difference = new Decimal(a).sub(b).toString();
		return [difference, ...rest];
	},
	multiply: (stack) => {
		const [b, a, ...rest] = stack;
		const product = new Decimal(a).mul(b).toString();
		return [product, ...rest];
	},
	divide: (stack) => {
		const [b, a, ...rest] = stack;
		const quotient = new Decimal(a).div(b).toString();
		return [quotient, ...rest];
	},
	reciprocate: ([x, ...rest]) => {
		const reciprocal = new Decimal(1).div(x).toString();
		return [reciprocal, ...rest];
	},

	// ROOTS AND POWERS
	exponentiate: (stack) => {
		const [b, a, ...rest] = stack;
		const pow = Decimal.pow(10, b);
		const exp = new Decimal(a).mul(pow).toString();
		return [exp, ...rest];
	},
	sqrt: (stack) => {
		const [a, ...rest] = stack;
		const sqrt = new Decimal(a).sqrt().toString();
		return [sqrt, ...rest];
	},
	square: (stack) => {
		const [a, ...rest] = stack;
		const square = new Decimal(a).pow(2).toString();
		return [square, ...rest];
	},
	nroot: (stack) => {
		const [b, a, ...rest] = stack;
		const n = new Decimal(a).pow(new Decimal(1).div(b)).toString();
		return [n, ...rest];
	},
	npow: (stack) => {
		const [b, a, ...rest] = stack;
		const n = new Decimal(a).pow(b).toString();
		return [n, ...rest];
	},

	// TRIG
	sin: (stack) => {
		const [a, ...rest] = stack;
		const sin = Decimal.sin(
			new Decimal(a).mul(Decimal.acos(-1)).div(180),
		).toString();
		return [sin, ...rest];
	},
	cos: (stack) => {
		const [a, ...rest] = stack;
		const cos = Decimal.cos(
			new Decimal(a).mul(Decimal.acos(-1)).div(180),
		).toString();
		return [cos, ...rest];
	},
	tan: (stack) => {
		const [a, ...rest] = stack;
		const tan = Decimal.tan(
			new Decimal(a).mul(Decimal.acos(-1)).div(180),
		).toString();
		return [tan, ...rest];
	},
	asin: (stack) => {
		const [a, ...rest] = stack;
		const sin = Decimal(a).asin().mul(180).div(Decimal.acos(-1)).toString();
		return [sin, ...rest];
	},
	acos: (stack) => {
		const [a, ...rest] = stack;
		const cos = Decimal(a).acos().mul(180).div(Decimal.acos(-1)).toString();
		return [cos, ...rest];
	},
	atan: (stack) => {
		const [a, ...rest] = stack;
		const tan = Decimal(a).atan().mul(180).div(Decimal.acos(-1)).toString();
		return [tan, ...rest];
	},
} as const satisfies Record<string, StackOperation>;
