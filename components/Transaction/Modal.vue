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
				<label for="transaction_file"
					><p>Upload your file here.</p></label
				>
				<input
					type="file"
					id="image_uploads"
					name="image_uploads"
					class="file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
					@change="storeFile"
				/>
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
						:options="account.list.map((x) => x.name)"
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
						:options="category()"
					/>
				</UFormGroup>
				<UFormGroup label="Name" name="name" size="md">
					<UInput
						ref="name"
						v-model="state.name"
						placeholder="Name"
						@input="locateNameInput"
					>
					</UInput>
					<UContextMenu
						class="w-full"
						v-model="hasSearchResult"
						:virtualElement="virtualElement"
					>
						<UCommandPalette
							:searchable="false"
							:groups="[
								{ key: 'searchResult', commands: searchResult },
							]"
							@update:model-value="onSelect"
						/>
					</UContextMenu>
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
	"update:isDuplicating",
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

const expense = useExpenseStore();
const income = useIncomeStore();
const account = useAccountStore();

const category = () => {
	switch (state.value.type) {
		case "Income":
			return income.list.map((x) => x.name);
		case "Expense":
			return expense.list.map((x) => x.name);
		case "Transfer":
			return account.list.map((x) => x.name);
	}
};

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
import { useAccountStore } from "~/stores/account";
import { useExpenseStore } from "~/stores/expense";
import { useIncomeStore } from "~/stores/income";
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
			console.log(
				"🚀 ~ file: Modal.vue:255 ~ watch ~ selectedItem.value:",
				selectedItem.value,
			);
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
	state.value.category = null;
};

const name = ref(null);

const virtualElement = ref({ getBoundingClientRect: () => ({}) });
const searchResult = computed(() => {
	if (!state.value.name) {
		return [];
	}

	const exactMatch = transaction.list.filter(
		(x) => String(x.name).toLowerCase() === state.value.name.toLowerCase(),
	);

	if (exactMatch.length >= 1) {
		return [];
	}

	return transaction.list
		.filter((x) =>
			String(x.name)
				.toLowerCase()
				.includes(state.value.name.toLowerCase()),
		)
		.map((z) => {
			return { id: z.id, label: z.name };
		});
});

const hasSearchResult = computed(() => searchResult.value.length > 0);

const locateNameInput = () => {
	const placeholder = name.value.input;
	const top = placeholder.getBoundingClientRect().bottom;
	const left = placeholder.getBoundingClientRect().left;

	virtualElement.value.getBoundingClientRect = () => ({
		height: 0,
		width: 0,
		top,
		left,
	});
};

const onSelect = (option) => {
	state.value.name = option.label;
};

import { useTransactionStore } from "~/stores/transaction";
const transaction = useTransactionStore();

const handleSubmit = (e) => {
	if (selectedItem.value) {
		transaction.updateItem(selectedItem.value.id, state.value);
		console.log(
			"🚀 ~ file: Modal.vue:338 ~ handleSubmit ~ state.value:",
			state.value,
		);
		handleClose();
	} else {
		transaction.createItem(state.value);
		console.log(
			"🚀 ~ file: Modal.vue:342 ~ handleSubmit ~ state.value:",
			state.value,
		);
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
