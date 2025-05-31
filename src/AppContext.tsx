import { type ComponentChildren, createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";
import operate from "./lib/operations";

export type Stack = string[];
type StackAction =
	| { type: "clear" }
	| { type: "drop" }
	| { type: "new"; payload: string }
	| { type: "operate"; payload: { buffer: string | null; operator: string } }
	| { type: "pick"; payload: number }
	| { type: "swap"; payload: number };

function ActionReducer(state: Stack, action: StackAction): Stack {
	switch (action.type) {
		case "clear":
			return [];
		case "drop":
			return state.slice(1);
		case "new":
			return [action.payload, ...state];
		case "operate": {
			const { buffer, operator } = action.payload;
			const stack = buffer ? [buffer, ...state] : state;
			return operate({ stack, operator });
		}
		case "pick":
			return [state[action.payload], ...state];
		case "swap": {
			if (action.payload < 1) return state;
			const selected = state[action.payload];
			const before = state[action.payload - 1];
			const dup = [...state];
			dup[action.payload] = before;
			dup[action.payload - 1] = selected;
			return dup;
		}
		default:
			return state;
	}
}

const AppContext = createContext<
	{ state: Stack; dispatch: (action: StackAction) => void } | undefined
>(undefined);

export function AppContextProvider({
	children,
	initialState = [],
}: { children: ComponentChildren; initialState?: Stack }) {
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
