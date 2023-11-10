<template>
	<UCard class="w-[256px] overflow-y-auto">
		<UButton
			class="mb-1 h-10 w-full"
			variant="soft"
			label="Main"
			icon="i-heroicons-home"
			to="/app"
		/>
		<UAccordion :items="items" multiple defaultOpen>
			<template #default="{ item, open }">
				<UButton variant="soft" class="mb-1">
					<template #leading>
						<Icon :name="item.icon" class="h-5 w-5" />
					</template>
					<span class="truncate">{{ item.label }}</span>
					<template #trailing>
						<div class="ms-auto flex gap-1">
							<UButton
								variant="ghost"
								class="h-7 w-7 transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
								square
								icon="i-heroicons-chevron-right-20-solid"
							/>
						</div>
					</template>
				</UButton>
			</template>
			<template #item="{ item }">
				<UButton
					class="mb-1 w-full"
					variant="ghost"
					:label="`Create ${item.label}`"
					@click="handleOpenModal(item.label, 'create')"
				>
					<template #trailing>
						<div class="ms-auto flex">
							<UButton
								variant="ghost"
								class="h-5 w-5 p-0"
								square
								icon="i-heroicons-plus-small-20-solid"
							/>
						</div>
					</template>
				</UButton>
				<template v-for="x of selectedStore(item.label)?.list">
					<UButton variant="ghost" color="gray" class="mb-1 w-full">
						<span class="truncate">{{ x.name }}</span>
						<template #trailing>
							<div class="ms-auto flex gap-1">
								<UDropdown
									:items="
										actions({ type: item.label, item: x })
									"
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
				</template>
			</template>
		</UAccordion>
		<AccountModal
			v-if="selectedType == 'Account'"
			:isOpen="isOpen"
			:selectedType="selectedType"
			:selectedItem="selectedItem"
			:selectedAction="selectedAction"
			@close="handleCloseModal"
		/>
		<ExpenseModal
			v-if="selectedType == 'Expense'"
			:isOpen="isOpen"
			:selectedType="selectedType"
			:selectedItem="selectedItem"
			:selectedAction="selectedAction"
			@close="handleCloseModal"
		/>
		<IncomeModal
			v-if="selectedType == 'Income'"
			:isOpen="isOpen"
			:selectedType="selectedType"
			:selectedItem="selectedItem"
			:selectedAction="selectedAction"
			@close="handleCloseModal"
		/>
	</UCard>
</template>

<script setup>
import { useExpenseStore } from "~/stores/expense";
const expense = useExpenseStore();
import { useIncomeStore } from "~/stores/income";
const income = useIncomeStore();
import { useAccountStore } from "~/stores/account";
const account = useAccountStore();
const selectedStore = (type) => {
	switch (type) {
		case "Expense":
			return expense;
		case "Income":
			return income;
		case "Account":
			return account;
	}
};
const isOpen = ref();
const selectedType = ref();
const selectedAction = ref();
const selectedItem = ref();
const handleOpenModal = (type, action, item) => {
	isOpen.value = true;
	selectedType.value = type;
	selectedAction.value = action;
	if (item) {
		selectedItem.value = item;
	}
	console.log(selectedType.value, selectedAction.value, selectedItem.value);
};
const handleCloseModal = () => {
	isOpen.value = false;
	selectedType.value = undefined;
	selectedAction.value = undefined;
	selectedItem.value = undefined;
	console.log(selectedType.value, selectedAction.value, selectedItem.value);
};

const items = [
	{
		label: "Income",
		icon: "uil:money-withdraw",
	},
	{
		label: "Expense",
		icon: "uil:money-insert",
	},
	{
		label: "Account",
		icon: "uil:wallet",
	},
];

const actions = ({ type, item }) => {
	return [
		[
			{
				label: "Edit",
				icon: "i-heroicons-pencil-square-20-solid",
				click: () => handleOpenModal(type, "update", item),
			},
			{
				label: "Duplicate",
				icon: "i-heroicons-document-duplicate-20-solid",
				click: () => {
					const { id, ...duplicatedItem } = item;
					handleOpenModal(type, "create", duplicatedItem);
				},
			},
		],
		[
			{
				label: "Delete",
				icon: "i-heroicons-trash-20-solid",
				click: () => handleOpenModal(type, "delete", item),
			},
		],
	];
};
</script>
