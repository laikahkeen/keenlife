// https://nuxt.com/docs/api/configuration/nuxt-config
import colors from 'tailwindcss/colors'
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxt/ui",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"nuxt-icon",
		"nuxt-headlessui",
		// "@nuxtjs/supabase",
	],
	headlessui: { prefix: "H" },
	app: {
		head: {
			title: "Keen Life",
			link: [
				// Favicon
				{ rel: "icon", type: "image/x-icon", href: "/icon.svg" },
				//Inter font
				{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
				{ rel: "preconnect", href: "https://rsms.me/" },
			],
		},
	},
});
