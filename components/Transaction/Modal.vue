<template>
	<UModal v-model="isOpen" :prevent-close="deleteItem.length > 0">
		<UCard class="flex flex-1 flex-col">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6">
						{{
							selectedItem
								? `Transaction #${selectedItem.id}`
								: "Create New Transaction"
						}}
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						square
						icon="i-heroicons-x-mark-20-solid"
						@click="handleClose"
					/>
				</div>
			</template>
			<UForm
				id="transactionForm"
				class="space-y-6"
				:schema="schema"
				:state="state"
				@submit="handleSubmit"
			>
				<UPopover :popper="{ placement: 'bottom-start' }">
					<UButton
						icon="i-heroicons-calendar-days-20-solid"
						:label="label"
					></UButton>
					<template #panel="{ close }">
						<DatePicker v-model="state.date" @close="close" />
					</template>
				</UPopover>
				<UTabs
					:items="items"
					v-model="selected"
					@change="handleChange"
				/>
				<UFormGroup
					:label="state.type === 'Transfer' ? 'From' : 'Account'"
					name="from"
					size="md"
				>
					<USelectMenu
						searchable
						searchable-placeholder="Search an account..."
						v-model="state.account"
						placeholder="Select an account"
						:options="options"
					/>
				</UFormGroup>
				<UFormGroup
					:label="state.type === 'Transfer' ? 'To' : 'Category'"
					name="category"
					size="md"
				>
					<USelectMenu
						searchable
						searchable-placeholder="Search a category..."
						v-model="state.category"
						placeholder="Select a category"
						:options="options"
					/>
				</UFormGroup>
				<UFormGroup label="Name" name="name" size="md">
					<UInput ref="name" v-model="state.name" placeholder="Name">
					</UInput>
				</UFormGroup>
				<UFormGroup label="Description" name="description" size="md">
					<UInput
						v-model="state.description"
						placeholder="Description"
					>
					</UInput>
				</UFormGroup>
				<UFormGroup label="Amount" name="amount" size="md">
					<UInput
						v-model="state.amount"
						@change="
							() => {
								state.amount = state.amount
									? Number(state.amount).toFixed(2)
									: state.amount;
							}
						"
						type="number"
						step="0.01"
						placeholder="0.00"
					>
					</UInput>
				</UFormGroup>
				<div class="flex justify-center gap-4">
					<UButton
						v-if="selectedItem"
						class="block flex-1"
						size="md"
						label="Delete"
						@click="handleDelete"
					/>
					<UButton
						v-if="selectedItem"
						class="block flex-1"
						size="md"
						label="Duplicate"
						@click="handleDuplicate"
					/>
					<UButton
						v-if="!selectedItem"
						class="block flex-1"
						size="md"
						label="Continue"
						type="submit"
						id="continue"
					/>
					<UButton
						class="block flex-1"
						type="submit"
						size="md"
						label="Save"
						id="save"
					/>
				</div>
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup>
const props = defineProps({
	isOpen: Boolean,
	selectedItem: Object,
	isDuplicating: Boolean,
	deleteItem: Object,
});

const emit = defineEmits([
	"update:isOpen",
	"update:selectedItem",
	"update:deleteItem",
]);

const isOpen = computed({
	get: () => props.isOpen,
	set: (value) => emit("update:isOpen", value),
});

const selectedItem = computed({
	get: () => props.selectedItem,
	set: (value) => emit("update:selectedItem", value),
});

const isDuplicating = computed({
	get: () => props.isDuplicating,
	set: (value) => emit("update:isDuplicating", value),
});

const deleteItem = computed({
	get: () => props.deleteItem,
	set: (value) => emit("update:deleteItem", value),
});

const handleClose = () => {
	isOpen.value = false;
};
const handleDelete = () => {
	deleteItem.value = [selectedItem.value];
};
const handleDuplicate = () => {
	selectedItem.value = null;
};
const options = [
	"Wade Cooper",
	"Arlene Mccoy",
	"Devon Webb",
	"Tom Cook",
	"Tanya Fox",
	"Hellen Schmidt",
	"Caroline Schultz",
	"Mason Heaney",
	"Claudie Smitham",
	"Emil Schaefer",
	"Expense",
	"Income",
	"Transfer",
];
const items = [
	{
		label: "Income",
	},
	{
		label: "Expense",
	},
	{
		label: "Transfer",
	},
];

import Joi from "joi";
const schema = Joi.object({
	type: Joi.string().required(),
	account: Joi.string().required(),
	category: Joi.string().required(),
	name: Joi.string().required(),
	description: Joi.string().required(),
	amount: Joi.number().required(),
	date: Joi.date().iso().required(),
	createdAt: Joi.date().iso(),
	updatedAt: Joi.date().iso(),
	id: Joi.number(),
});

const selected = ref(1);
const state = ref({
	type: undefined,
	account: undefined,
	category: undefined,
	name: undefined,
	description: undefined,
	amount: undefined,
	date: undefined,
});

watch(isOpen, () => {
	if (isOpen.value) {
		if (selectedItem.value) {
			state.value = { ...selectedItem.value };
			selected.value = items.findIndex(
				(x) => x.label === selectedItem.value.type,
			);
			if (isDuplicating.value) {
				handleDuplicate();
				isDuplicating.value = !isDuplicating.value;
			}
		} else {
			selected.value = 1;
			state.value = {
				type: items[selected.value].label,
				account: "Wade Cooper",
				category: "Wade Cooper",
				name: "test",
				description: "Wade Cooper",
				amount: "123.00",
				date: new Date().toISOString(),
			};
		}
	}
});

const label = computed(
	() => useDateFormat(state.value.date, "DD/MM/YYYY (ddd)").value,
);

const handleChange = (index) => {
	state.value.type = items[index].label;
};

const name = ref(null);

import { useTransactionStore } from "~/stores/transaction";
const transaction = useTransactionStore();

const handleSubmit = (e) => {
	if (selectedItem.value) {
		transaction.updateItem(selectedItem.value.id, state.value);
		handleClose();
	} else {
		transaction.createItem(state.value);
		if (e.submitter.id == "save") {
			handleClose();
		} else {
			state.value = {
				...state.value,
				name: undefined,
				description: undefined,
				amount: undefined,
			};
			name.value.input.focus();
		}
	}
};
</script>
