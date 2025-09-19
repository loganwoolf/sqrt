import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ShiftContext } from "../../lib/storybook/decorators";
import Statusline from "./Statusline";

const meta = {
	component: Statusline,
	decorators: ShiftContext,
	args: {
		shiftState: false,
	},
} satisfies Meta<typeof Statusline>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {} satisfies Story;
