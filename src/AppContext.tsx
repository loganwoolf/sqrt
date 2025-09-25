import { type ComponentChildren, createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";
import type { Buffer } from "./app";
import operate, { type Operator } from "./lib/operations";

export type Stack = string[];
export type History = Stack[];

export type StackAction =
	| { type: "clear" }
	| { type: "drop" }
	| { type: "new"; payload: string }
	| { type: "undo" }
	| { type: "operate"; payload: { buffer: Buffer; operator: Operator } }
	| { type: "pick"; payload: number }
	| { type: "swap"; payload: number };

function ActionReducer(state: History, action: StackAction): History {
	switch (action.type) {
		case "clear":
			return [[], ...state];

		case "drop": {
			const [stack] = state;

			return [stack.slice(1), ...state];
		}

		case "new": {
			const [stack] = state;

			return [[action.payload, ...stack], ...state];
		}

		case "undo": {
			const [, ...history] = state;

			return history || state;
		}

		case "operate": {
			const { buffer, operator } = action.payload;
			const [currentStack] = state;
			const settledStack = buffer ? [buffer, ...currentStack] : currentStack;
			const newStack = operate({ stack: settledStack, operator });

			return [newStack, ...state];
		}

		case "pick": {
			const [stack] = state;

			return [[stack[action.payload], ...stack], ...state];
		}

		case "swap": {
			const [stack] = state;

			if (action.payload < 1) return state;
			if (action.payload >= stack.length) return state;

			const selected = stack[action.payload];
			const before = stack[action.payload - 1];
			const dup = [...stack];
			dup[action.payload] = before;
			dup[action.payload - 1] = selected;

			return [dup, ...state];
		}

		default:
			return state;
	}
}

const AppContext = createContext<
	{ state: History; dispatch: (action: StackAction) => void } | undefined
>(undefined);

export function AppContextProvider({
	children,
	initialState = [[]],
}: {
	children: ComponentChildren;
	initialState?: History;
}) {
	const [state, dispatch] = useReducer(ActionReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}
	return context;
}
