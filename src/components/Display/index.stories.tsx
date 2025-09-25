import type { Meta, StoryObj } from "@storybook/preact-vite";
import { AppContext, ShiftContext } from "../../lib/storybook/decorators";
import Display from ".";

const meta = {
	component: Display,
	decorators: [ShiftContext, AppContext],
	args: {
		history: [["789", "456", "123"]],
		buffer: "437378",
	},
} satisfies Meta<typeof Display>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {} satisfies Story;
