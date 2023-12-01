<template>
	<UButton variant="ghost" color="gray" class="mb-1 w-full">
		<template #leading v-if="item.label == 'Label'">
			<UButton
				variant="ghost"
				color="gray"
				class="h-5 w-5 transform p-0 opacity-50 transition-transform duration-200 hover:opacity-100"
				:class="[isExpanded && 'rotate-90']"
				square
				icon="i-heroicons-chevron-right-20-solid"
				@click="handleExpand"
			/>
		</template>
		<span class="truncate">{{ x.name }}</span>
		<template #trailing>
			<div class="ms-auto flex gap-1">
				<UDropdown
					:items="actions({ type: item.label, item: x })"
					:popper="{ placement: 'bottom' }"
				>
					<UButton
						variant="ghost"
						color="gray"
						class="h-5 w-5 p-0 opacity-50 hover:opacity-100"
						square
						icon="i-heroicons-ellipsis-horizontal-20-solid"
					/>
				</UDropdown>
			</div>
		</template>
	</UButton>
	<UVerticalNavigation
		v-if="isExpanded && item.label == 'Label'"
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

<script setup>
const isExpanded = ref(false);
const handleExpand = () => {
	isExpanded.value = !isExpanded.value;
};
const props = defineProps({
	item: Object,
	x: Object,
});

const emit = defineEmits(["openModal"]);
const actions = ({ type, item }) => {
	return [
		[
			{
				label: "Edit",
				icon: "i-heroicons-pencil-square-20-solid",
				click: () => emit("openModal", type, "update", item),
			},
			{
				label: "Duplicate",
				icon: "i-heroicons-document-duplicate-20-solid",
				click: () => {
					const { id, ...duplicatedItem } = item;
					emit("openModal", type, "create", duplicatedItem);
				},
			},
		],
		[
			{
				label: "Delete",
				icon: "i-heroicons-trash-20-solid",
				click: () => emit("openModal", type, "delete", item),
			},
		],
	];
};

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
