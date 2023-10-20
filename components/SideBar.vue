<template>
	<aside class="h-[calc(100vh-64px)] overflow-y-auto p-2">
		<UAccordion :items="items" multiple>
			<template #item>
				<UVerticalNavigation
					:links="links"
					:ui="{
						wrapper: 'border-s border-border space-y-2',
						base: 'group block border-s -ms-px lg:leading-6 before:hidden',
						padding: 'p-0 ps-4',
						rounded: '',
						font: '',
						ring: '',
						active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
						inactive:
							'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
					}"
				/>
			</template>
		</UAccordion>
	</aside>
</template>

<script setup>
const items = [
	{
		label: "Getting Started",
		icon: "i-heroicons-information-circle",
		defaultOpen: true,
	},
	{
		label: "Getting Started",
		icon: "i-heroicons-information-circle",
		defaultOpen: true,
	},
	{
		label: "Getting Started",
		icon: "i-heroicons-information-circle",
		defaultOpen: true,
	},
	{
		label: "Installation",
		icon: "i-heroicons-arrow-down-tray",
	},
	{
		label: "Theming",
		icon: "i-heroicons-eye-dropper",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
	},
];
const links = [
	{
		label: "Introduction",
		to: "/",
	},
	{
		label: "Installation",
		to: "/",
	},
	{
		label: "Theming",
		to: "/",
	},
	{
		label: "Shortcuts",
		to: "/",
	},
	{
		label: "Examples",
		to: "/",
	},
	{
		label: "Roadmap",
		to: "/",
	},
];
</script>
