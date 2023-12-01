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
							<UIcon
								variant="ghost"
								class="h-7 w-7 transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
								square
								name="i-heroicons-chevron-right-20-solid"
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
							<UIcon
								variant="ghost"
								class="h-5 w-5 p-0"
								square
								name="i-heroicons-plus-small-20-solid"
							/>
						</div>
					</template>
				</UButton>
				<NavigationItem
					v-for="x of selectedStore(item.label)?.list"
					:item="item"
					:x="x"
					@openModal="handleOpenModal"
				></NavigationItem>
			</template>
		</UAccordion>
		<NavigationModal
			:store="selectedStore(selectedType)"
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
import { useLabelStore } from "~/stores/label";
const label = useLabelStore();
const selectedStore = (type) => {
	switch (type) {
		case "Expense":
			return expense;
		case "Income":
			return income;
		case "Account":
			return account;
		case "Label":
			return label;
	}
};
const isOpen = ref();
const selectedType = ref();
const selectedAction = ref();
const selectedItem = ref();

const handleOpenModal = (type, action, item) => {
	console.log(
		"🚀 ~ file: Card.vue:110 ~ handleOpenModal ~ type, action, item:",
		type,
		action,
		item,
	);
	isOpen.value = true;
	selectedType.value = type;
	selectedAction.value = action;
	if (item) {
		selectedItem.value = item;
	}
};
const handleCloseModal = () => {
	isOpen.value = false;
	selectedType.value = undefined;
	selectedAction.value = undefined;
	selectedItem.value = undefined;
};

const items = [
	{
		label: "Account",
		icon: "uil:wallet",
	},
	{
		label: "Income",
		icon: "uil:money-withdraw",
	},
	{
		label: "Expense",
		icon: "uil:money-insert",
	},
	{
		label: "Label",
		icon: "uil:label-alt",
	},
];
</script>
