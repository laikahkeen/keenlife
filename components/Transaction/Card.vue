<template>
	<UCard class="overflow-y-auto">
		<UTable :rows="transaction.list" :columns="columns" v-model="selected">
			<template #empty-state>
				<div
					class="flex flex-col items-center justify-center gap-3 py-6"
				>
					<span class="text-sm italic">No transaction here!</span>
					<UButton
						label="Add transaction"
						@click="handleItemModalOpen()"
					/>
				</div>
			</template>
			<template
				#date-header
				:sort="{ field: 'date', direction: 'asc' }"
			/>
			<template #action-header>
				<UDropdown :items="groupActions(selected)">
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-ellipsis-horizontal-20-solid"
						:disabled="selected.length === 0"
					/>
				</UDropdown>
			</template>
			<template #action-data="{ row }">
				<UDropdown :items="actions(row)">
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-ellipsis-horizontal-20-solid"
					/>
				</UDropdown>
			</template>
			<template #date-data="{ row }">
				<span
					:class="[
						selected.find((x) => x.id === row.id) &&
							'text-primary-500 dark:text-primary-400',
					]"
					>{{
						useDateFormat(row.date, "DD/MM/YYYY (ddd)").value
					}}</span
				>
			</template>
		</UTable>
		<UButton
			class="fixed bottom-4 left-1/2 -translate-x-1/2"
			icon="i-heroicons-plus-20-solid"
			variant="solid"
			square
			aria-label="Add"
			@click="handleItemModalOpen()"
		/>
		<TransactionModal
			v-model:isOpen="isItemModelOpen"
			v-model:selectedItem="selectedItem"
			v-model:isDuplicating="isDuplicating"
			v-model:deleteItem="selectedDeleteItem"
		/>
		<TransactionModalDelete v-model:deleteItem="selectedDeleteItem" />
	</UCard>
</template>

<script setup>
import { useTransactionStore } from "~/stores/transaction";
const transaction = useTransactionStore();

const columns = [
	{
		key: "id",
		label: "ID",
		sortable: true,
	},
	{
		key: "date",
		label: "Date",
		sortable: true,
	},
	{
		key: "category",
		label: "Category",
		sortable: true,
	},
	{
		key: "type",
		label: "Type",
		sortable: true,
	},
	{
		key: "account",
		label: "Account",
		sortable: true,
	},
	{
		key: "description",
		label: "Description",
		sortable: true,
	},
	{
		key: "amount",
		label: "Amount",
		sortable: true,
	},
	{
		key: "action",
	},
];
const selected = ref([]);

const isItemModelOpen = ref(false);
const selectedItem = ref(null);
const isDuplicating = ref(false);
const handleItemModalOpen = (item) => {
	isItemModelOpen.value = true;
	if (item) {
		selectedItem.value = item;
	}
};
watch(isItemModelOpen, () => {
	if (!isItemModelOpen.value) {
		selectedItem.value = null;
	}
});

const selectedDeleteItem = ref([]);
watch(selectedDeleteItem, () => {
	if (selectedDeleteItem.value.length == 0) {
		selected.value = selected.value.filter((x) =>
			transaction.list.includes(x),
		);
	}
});

const actions = (row) => [
	[
		{
			label: "Edit",
			icon: "i-heroicons-pencil-square-20-solid",
			click: () => handleItemModalOpen(row),
		},
		{
			label: "Duplicate",
			icon: "i-heroicons-document-duplicate-20-solid",
			click: () => {
				handleItemModalOpen(row);
				isDuplicating.value = true;
			},
		},
	],
	[
		{
			label: "Delete",
			icon: "i-heroicons-trash-20-solid",
			click: () => (selectedDeleteItem.value = [row]),
		},
	],
];
const groupActions = (selected) => [
	[
		{
			label: "Delete All Selected",
			icon: "i-heroicons-trash-20-solid",
			click: () => (selectedDeleteItem.value = selected),
		},
	],
];
</script>
