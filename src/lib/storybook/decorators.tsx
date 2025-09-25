import type { DecoratorFunction } from "storybook/internal/csf";
import { AppContextProvider, type History } from "../../AppContext";
import { ShiftContextProvider, type ShiftState } from "../../ShiftContext";

export const AppContext: DecoratorFunction = (Story, context) => {
	const initialStack: History = context.args.history;

	return (
		<AppContextProvider initialState={initialStack}>
			<Story />
		</AppContextProvider>
	);
};

export const ShiftContext: DecoratorFunction = (Story, context) => {
	const initialState: ShiftState = context.args.shiftState || false;

	return (
		<ShiftContextProvider initialState={initialState}>
			<Story />
		</ShiftContextProvider>
	);
};
