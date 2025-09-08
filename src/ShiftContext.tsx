import { type ComponentChildren, createContext } from "preact";
import {
	type Dispatch,
	type StateUpdater,
	useContext,
	useState,
} from "preact/hooks";

export type ShiftState = boolean;

const ShiftContext = createContext<
	| {
			shiftActive: ShiftState;
			setShiftActive: Dispatch<StateUpdater<ShiftState>>;
	  }
	| undefined
>(undefined);

export function ShiftContextProvider({
	children,
	initialState = false,
}: {
	children: ComponentChildren;
	initialState?: ShiftState;
}) {
	const [shiftActive, setShiftActive] = useState<ShiftState>(initialState);

	return (
		<ShiftContext.Provider value={{ shiftActive, setShiftActive }}>
			{children}
		</ShiftContext.Provider>
	);
}

export function useShiftContext() {
	const context = useContext(ShiftContext);
	if (context === undefined) {
		throw new Error(
			"useShiftContext must be used within a ShiftContextProvider",
		);
	}
	return context;
}
