import type { Meta, StoryObj } from "@storybook/preact-vite";
import type { ComponentProps } from "preact";
import type { Stack } from "../../AppContext";
import { AppContext } from "../../lib/storybook/decorators";
import Display from ".";

type StoryArgs = ComponentProps<typeof Display> & {
	stack?: Stack;
};

const meta = {
	component: Display,
	decorators: [AppContext],
	args: {
		stack: ["789", "456", "123"],
		buffer: "437378",
	},
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {};
