<template>
	<aside
		class="scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md overflow-y-auto p-2"
	>
		<div class="relative">
			<HDisclosure v-slot="{ open }" :default-open="true">
				<HDisclosureButton class="flex w-full justify-between py-2">
					<span>test</span>
					<Icon
						name="mi:chevron-right"
						class="h-6 w-6"
						:class="open ? 'rotate-90 transform' : ''"
					/>
				</HDisclosureButton>
				<HDisclosurePanel class="pl-2">
					<UVerticalNavigation
						:links="links"
						:ui="{
							wrapper:
								'border-s border-gray-200 dark:border-gray-800 space-y-2',
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
				</HDisclosurePanel>
			</HDisclosure>
		</div>
	</aside>
</template>

<script setup>
const links = [
	{
		label: "Introduction",
		to: "/",
	},
	{
		label: "Installation",
		to: "/test",
	},
	{
		label: "Theming",
		to: "/getting-started/theming",
	},
	{
		label: "Shortcuts",
		to: "/getting-started/shortcuts",
	},
	{
		label: "Examples",
		to: "/getting-started/examples",
	},
	{
		label: "Roadmap",
		to: "/getting-started/roadmap",
	},
];
</script>
