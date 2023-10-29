<template>
	<UModal v-model="item.isAddItemOpen">
		<UCard class="flex flex-1 flex-col">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6">Add Item</h3>
					<UButton
						color="gray"
						variant="ghost"
						square
						icon="i-heroicons-x-mark-20-solid"
						@click="item.toggleAddItem"
					/>
				</div>
			</template>
			<UForm
				class="space-y-6"
				:schema="schema"
				:state="state"
				@submit="addItem"
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
					:label="
						state.transaction === 'Transfer' ? 'From' : 'Account'
					"
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
					:label="
						state.transaction === 'Transfer' ? 'To' : 'Category'
					"
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
				<UFormGroup label="Description" name="description" size="md">
					<UInput
						ref="description"
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
				<UButton block type="submit" size="md" label="Add Item" />
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup>
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
const toast = useToast();
const supabase = useSupabaseClient();

import Joi from "joi";
const schema = Joi.object({
	transaction: Joi.string().required(),
	account: Joi.string().required(),
	category: Joi.string().required(),
	description: Joi.string().required(),
	amount: Joi.number().required(),
	date: Joi.date().required(),
});

const selected = ref(1);
const state = ref({
	transaction: items[selected.value].label,
	account: "Wade Cooper",
	category: "Wade Cooper",
	description: "Wade Cooper",
	amount: 123,
	date: new Date(),
});

const label = computed(
	() => useDateFormat(state.value.date, "DD/MM/YYYY (ddd)").value,
);

const handleChange = (index) => {
	state.value.transaction = items[index].label;
};

const description = ref(null);

import { useItemStore } from "~/stores/item";
const item = useItemStore();

const addItem = () => {
	item.addItem({
		...state.value,
		date: state.value.date.toISOString(),
	});
	toast.add({ title: "Added new item!" });
	console.log(state.value);
	state.value = {
		...state.value,
		description: undefined,
		amount: undefined,
	};
	description.value.input.focus();
};

watch(
	() => {
		item.isAddItemOpen;
	},
	() => {
		selected.value = 1;
		state.value = {
			transaction: items[selected.value].label,
			account: "Wade Cooper",
			category: "Wade Cooper",
			description: "Wade Cooper",
			amount: 123,
			date: new Date(),
		};
	},
	{ deep: true },
);
</script>
