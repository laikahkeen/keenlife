<template>
	<NuxtLayout name="app">
		<UTable :rows="item.list" :columns="columns" v-model="selected">
			<template #empty-state>
				<div
					class="flex flex-col items-center justify-center gap-3 py-6"
				>
					<span class="text-sm italic">No transaction here!</span>
					<UButton
						label="Add transaction"
						@click="item.toggleAddItem"
					/>
				</div>
			</template>
			<template
				#date-header
				:sort="{ field: 'date', direction: 'asc' }"
			/>
			<template #delete-data="{ row }">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-trash-20-solid"
					@click="item.deleteItem(row.id)"
				/>
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
			@click="item.toggleAddItem"
		/>
		<AddItem />
	</NuxtLayout>
</template>

<script setup>
import { useItemStore } from "~/stores/item";
const item = useItemStore();

const selected = ref([]);
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
		key: "transaction",
		label: "Transaction",
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
		key: "delete",
	},
];
</script>
