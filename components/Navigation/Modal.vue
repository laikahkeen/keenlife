<template>
	<UModal v-model="isOpen">
		<UCard class="flex flex-1 flex-col">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6">
						{{
							selectedItem?.id
								? `${selectedAction} ${selectedType} #${selectedItem.id}`
								: `Create New ${selectedType}`
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
				id="labelForm"
				class="space-y-6"
				:schema="schema"
				:state="state"
				@submit="handleSubmit"
			>
				<UFormGroup label="Name" name="name" size="md">
					<UInput v-model="state.name" placeholder="Name"></UInput>
				</UFormGroup>
				<UFormGroup label="Description" name="description" size="md">
					<UInput
						v-model="state.description"
						placeholder="Description"
					>
					</UInput>
				</UFormGroup>
				<div class="flex justify-center gap-4">
					<UButton
						class="block flex-1"
						size="md"
						label="Cancel"
						@click="handleClose"
					/>
					<UButton
						class="block flex-1"
						type="submit"
						size="md"
						label="Confirm"
					/>
				</div>
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup>
const props = defineProps({
	store: Object,
	isOpen: Boolean,
	selectedType: String,
	selectedItem: Object,
	selectedAction: String,
});

const emit = defineEmits(["close"]);

const { store, selectedType, selectedItem, selectedAction } = toRefs(props);

const isOpen = computed({
	get: () => props.isOpen,
	set: () => emit("close"),
});

const handleClose = () => {
	state.value = {
		name: undefined,
		description: undefined,
	};
	isOpen.value = false;
};

import Joi from "joi";
const schema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	id: Joi.number(),
});

const state = ref({
	name: undefined,
	description: undefined,
});

watch(selectedItem, () => {
	if (selectedItem.value) {
		state.value = { ...selectedItem.value };
	} else {
		state.value = {
			name: "Wade Cooper",
			description: "Wade Cooper",
		};
	}
});

const handleSubmit = () => {
	if (selectedAction.value === "create") {
		store.value.createItem(state.value);
	} else if (selectedAction.value === "update") {
		store.value.updateItem(selectedItem.value.id, state.value);
	} else if (selectedAction.value === "delete") {
		store.value.deleteItem(selectedItem.value.id);
	}
	handleClose();
};
</script>
