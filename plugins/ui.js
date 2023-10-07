import { hexToRgb } from "../utils";
import colors from "#tailwind-config/theme/colors";

export default defineNuxtPlugin({
	enforce: "post",
	setup() {
		const appConfig = useAppConfig();

		const root = computed(() => {
			const primary = colors[appConfig.ui.primary];
			const gray = colors[appConfig.ui.gray];

			return `:root {
		    ${Object.entries(primary || colors.purple)
				.map(
					([key, value]) =>
						`--color-primary-${key}: ${hexToRgb(value)};`,
				)
				.join("\n")}
				--color-primary-DEFAULT: var(--color-primary-500);

		    ${Object.entries(gray || colors.stone)
				.map(
					([key, value]) =>
						`--color-gray-${key}: ${hexToRgb(value)};`,
				)
				.join("\n")}
				}

				.dark {
					--color-primary-DEFAULT: var(--color-primary-400);
				}`;
		});

		if (process.client) {
			watch(root, () => {
				window.localStorage.setItem("nuxt-ui-root", root.value);
			});

			appConfig.ui.primary =
				window.localStorage.getItem("nuxt-ui-primary") ||
				appConfig.ui.primary;
			appConfig.ui.gray =
				window.localStorage.getItem("nuxt-ui-gray") ||
				appConfig.ui.gray;
		}

		if (process.server) {
			useHead({
				script: [
					{
						innerHTML: `
			    if (localStorage.getItem('nuxt-ui-root')) {
			      document.querySelector('style#nuxt-ui-colors').innerHTML = localStorage.getItem('nuxt-ui-root')
			    }`.replace(/\s+/g, " "),
						type: "text/javascript",
						tagPriority: -1,
					},
				],
				style: [
					{
						innerHTML: `:root {
							--color-white: 255 255 255;
							--color-black: 0 0 0;
						}`,
						id: "nuxt-ui-colors-2",
						tagPriority: -3,
					},
				],
			});
		}
	},
});
