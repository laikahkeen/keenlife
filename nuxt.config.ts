// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/ui",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@pinia/nuxt",
		"nuxt-icon",
		"nuxt-headlessui",
		"@nuxtjs/supabase",
		"@vueuse/nuxt",
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
	supabase: {
		redirect: false,
		redirectOptions: {
			login: "/auth",
			callback: "/",
			exclude: [],
		},
	},
	devtools: {
		enabled: false,
	},
});
