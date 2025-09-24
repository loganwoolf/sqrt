import Decimal from "decimal.js";

export type Constant = keyof typeof CONSTANTS;

export const CONSTANTS = {
	pi: Decimal.acos(-1),
	"m/ft": Decimal(0.3048),
} as const;
