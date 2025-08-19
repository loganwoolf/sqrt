import type { DecoratorFunction } from "storybook/internal/csf";
import { AppContextProvider, type Stack } from "../../AppContext";

export const AppContext: DecoratorFunction = (Story, context) => {
	const initialStack: Stack = context.args.stack || [];

	return (
		<AppContextProvider initialState={initialStack}>
			<Story />
		</AppContextProvider>
	);
};
