import scrollbar from "tailwind-scrollbar";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: [],
	theme: {
		extend: {
			container: {
				center: true,
			},
			fontFamily: {
				sans: [
					"DM Sans",
					"DM Sans fallback",
					...defaultTheme.fontFamily.sans,
				],
			},
			colors: {
				border: "rgb(var(--border))",
				background: "rgb(var(--background))",
				foreground: "rgb(var(--foreground))",
			},
		},
	},
	plugins: [scrollbar({ nocompatible: true })],
};
