export const HOTKEYS = {
	// Numbers
	NUM_0: "0",
	NUM_1: "1",
	NUM_2: "2",
	NUM_3: "3",
	NUM_4: "4",
	NUM_5: "5",
	NUM_6: "6",
	NUM_7: "7",
	NUM_8: "8",
	NUM_9: "9",

	// Operators
	MULTIPLY: "*",
	DIVIDE: "/",
	ADD: "+",
	SUBTRACT: "-",
	ENTER: "Enter",
	BACKSPACE: "Backspace",

	// Special keys
	DECIMAL: ".",
	SHIFT: "Shift",

	// Functional keys
	EXPONENTIATE: "e",
	SQRT: "s",
	NEGATE: "n",
} as const;

export type Hotkey = (typeof HOTKEYS)[keyof typeof HOTKEYS];

export function hotkeyLabel(hotkey: Hotkey): string {
	switch (hotkey) {
		case HOTKEYS.BACKSPACE:
			return "bksp";
		default:
			return hotkey;
	}
}
